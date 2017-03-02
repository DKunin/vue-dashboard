(function(root) {
    function mineWeight(bool) {
        return bool ? 1 : 0;
    }

    root['stashList'] = {
        props: { requests: { type: Array, default: [] } },
        methods: {
            articleClass: function(request) {
                return [
                    'stash-list-item pv1 ph2 mv2 v-mid bb b--black-05',
                    {
                        'o-30': request.title.indexOf('WIP') !== -1,
                        'bg-white': request.mine,
                        'stash-list-item-green': !this.isConflicted(request.properties),
                        'stash-list-item-red': this.isConflicted(request.properties),
                        'stash-list-item-yellow': this.doesNeedWork(request.reviewers)
                        // 'bg-light-gray': !request.mine
                    }
                ];
            },
            processTitle: function(title) {
                const withoutNumber = title.replace(/^\w{4}-\d+\W/, '');
                if (withoutNumber.length < 40) {
                    return withoutNumber;
                }
                return withoutNumber;
            },
            doesNeedWork: function(reviewers) {
                return reviewers.some(({ status }) => status === 'NEEDS_WORK');
            },
            isConflicted: function(properties) {
                if (properties.mergeResult) {
                    return properties.mergeResult.outcome.trim() === 'CONFLICTED';
                }
                return false;
            },
            sorted: function(list) {
                return list.sort((a, b) => {
                    return a.title.indexOf('WIP') -
                        b.title.indexOf('WIP') +
                        (mineWeight(b.mine) - mineWeight(a.mine));
                });
            }
        },
        template: (
            `
            <div class="dash-panel">
                <div v-if="!requests.length" class="loader">Loader</div>
                <article
                    :class="articleClass(request)"
                    v-for="request in sorted(requests)">
                    <div class="pv1">
                        <a class="link black fw7" :href='request.links.self[0].href' target="_blank">{{processTitle(request.title)}}</a>
                        <span class="fr">
                            {{request.properties.commentCount}}
                            <i class="fa fa-comment-o" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div>
                        <span
                            v-for="reviewer in request.reviewers"
                            v-bind:class="[{ 
                                'stash-list-reviewer-green': reviewer.approved,
                                'black': !reviewer.approved 
                            }, 'dib tc mb1 mr1 v-mid']" :title="reviewer.user.name">{{reviewer.user.slug}}</span>
                    </div>
                </article>
            </div>
      `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
