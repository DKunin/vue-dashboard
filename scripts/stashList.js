(function(root) {
    function mineWeight(bool) {
        return bool ? 1 : 0;
    }

    function sorted(list) {
        return list.sort((a, b) => {
            return (
                a.title.indexOf('WIP') -
                b.title.indexOf('WIP') +
                (mineWeight(b.mine) - mineWeight(a.mine))
            );
        });
    }

    const template = `
        <dashCard :updateData="updateData" :hideTime="true" :loading="loading">
            <div class="tc dark-red pt6" v-if="user === ''">No username</div>
            <div v-if="!list.length && !loading" class="fw1 tc v-mid pa5 o-30">
                no data
            </div>
            <article
                :class="articleClass(request)"
                v-for="request in list">
                <div class="pv1">
                    <a class="link black fw4" rel="noopener" :href='request.links.self[0].href' target="_blank">{{processTitle(request.title)}}</a>
                    <span class="fr">
                        <svg v-if="request.properties.commentCount" height="24" version="1.2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1H9.171L9 16.171V16H6c-.542 0-1-.458-1-1V8c0-.542.458-1 1-1h12m0-2H6C4.35 5 3 6.35 3 8v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3z"/>
                            <text
                                x="50%"
                                y="60%"
                                text-anchor="middle"
                                font-family="Helvetica"
                                font-size="9">
                                {{request.properties.commentCount}}
                            </text>
                        </svg>
                    </span>
                </div>
                <div>
                    <span
                        v-for="reviewer in request.reviewers"
                        v-bind:class="[{ 
                            'stash-list-reviewer-green': reviewer.approved,
                            'black': !reviewer.approved 
                        }, 'dib tc mb1 mr1 v-mid fw2']" :title="reviewer.user.name">{{reviewer.user.slug}}</span>
                </div>
            </article>
            <div v-if="loading" class="loader"></div>
        </dashCard>
    `;

    root.stashList = {
        name: 'stashList',
        props: {
            user: {
                type: String,
                default: ''
            },
            hideWips: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            list: [],
            loading: false
        }),
        methods: {
            articleClass: function(request) {
                return [
                    'stash-list-item pv1 ph2 mv2 v-mid bb b--black-05',
                    {
                        'o-30': request.title.indexOf('WIP') !== -1,
                        'bg-white': request.mine,
                        'stash-list-item-green': !this.isConflicted(
                            request.properties
                        ),
                        'stash-list-item-red': this.isConflicted(
                            request.properties
                        ),
                        'stash-list-item-yellow': this.doesNeedWork(
                            request.reviewers
                        )
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
                    return (
                        properties.mergeResult.outcome.trim() === 'CONFLICTED'
                    );
                }
                return false;
            },
            filteredRequests: function(list) {
                return list.reduce((newArray, singleItem) => {
                    if (this.hideWips && singleItem.title.includes('WIP')) {
                        return newArray;
                    }
                    return newArray.concat(singleItem);
                }, []);
            },
            updateData: function(silent) {
                if (!this.user) {
                    return setTimeout(this.updateData, 500);
                }
                this.loading = true;

                if (!silent) {
                    this.list = [];
                }

                this.$http
                    .get(
                        this.$localDockerIp +
                            ':4848/api/prs?username=' +
                            this.user
                    )
                    .then(
                        response => {
                            this.loading = false;
                            this.list = sorted(
                                this.filteredRequests(response.body)
                            );
                        },
                        () => {
                            this.loading = false;
                            this.list = [];
                        }
                    );
            }
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
