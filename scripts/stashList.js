(function(root) {
    root['stashList'] = {
        props: { requests: { type: Array, default: [] } },
        methods: {
            articleClass: function(request) {
                return [
                    'pa1 mv2 ba b--black-10 v-mid',
                    {
                        'o-30': request.title.indexOf('WIP') !== -1,
                        'bg-white': request.mine,
                        'bg-light-gray': !request.mine
                    }
                ];
            },
            processTitle: function(title) {
                const withoutNumber = title.replace(/^\w{4}-\d+\W/, '');
                if (withoutNumber.length < 40) {
                    return withoutNumber;
                }
                return withoutNumber.slice(0, 40) + '...';
            },
            doesNeedWork: function(reviewers) {
                return reviewers.some(({ status }) => status === 'NEEDS_WORK');
            },
            isConflicted: function(properties) {
                if (properties.mergeResult) {
                    return properties.mergeResult.outcome === 'CONFLICTED';
                }
                return false;

            }
        },
        template: `
            <div>
                <div v-if="!requests.length" class="loader">Loader</div>
                <article
                    :class="articleClass(request)"
                    v-for="request in requests">
                    <div class="pv1">
                        <div v-bind:class="['bg-dark-red v-mid', 
                        { 
                            'bg-dark-green': isConflicted(request.properties),
                            'bg-light-yellow': doesNeedWork(request.reviewers)
                        }, 'dib br3 pa2 ']"> </div>
                            <a class="link black" :href='request.links.self[0].href' target="_blank">{{processTitle(request.title)}}...</a>
                    </div>
                    <div>
                        <div
                            v-for="reviewer in request.reviewers"
                            v-bind:class="[{ 'bg-dark-green white': reviewer.approved, 'black': !reviewer.approved }, 'dib br3 pa1 tc mb1 v-mid']" title="{{reviewer.user.name}}">{{reviewer.user.slug}}</div>
                    </div>
                </article>
            </div>
      `
    };
})(this || (typeof window !== 'undefined' ? window : global));
