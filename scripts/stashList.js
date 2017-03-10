(function(root) {
    function mineWeight(bool) {
        return bool ? 1 : 0;
    }

    function sorted(list) {
        return list.sort((a, b) => {
            return a.title.indexOf('WIP') -
                b.title.indexOf('WIP') +
                (mineWeight(b.mine) - mineWeight(a.mine));
        });
    }

    const template = `
        <dashCard :updateData="updateData" :hideTime="true">
            <div v-if="list === null && !loading">No data</div>
            <div v-if="loading" class="loader"></div>
            <article
                :class="articleClass(request)"
                v-for="request in list">
                <div class="pv1">
                    <a class="link black fw7" :href='request.links.self[0].href' target="_blank">{{processTitle(request.title)}}</a>
                    <span class="fr">
                        {{request.properties.commentCount}}
                        <i v-if="request.properties.commentCount" class="fa fa-comment-o" aria-hidden="true"></i>
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
        </dashCard>
    `;

    root.stashList = {
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
                    return properties.mergeResult.outcome.trim() ===
                        'CONFLICTED';
                }
                return false;
            },
            filteredRequests: function(list) {
                return list.reduce(
                    (newArray, singleItem) => {
                        if (this.hideWips && singleItem.title.includes('WIP')) {
                            return newArray;
                        }
                        return newArray.concat(singleItem);
                    },
                    []
                );
            },
            updateData: function() {
                if (!this.user) {
                    return setTimeout(this.updateData, 500);
                }

                this.loading = true;
                this.list = [];

                this.$http
                    .get(
                        root.LOCAL_DOCKER_IP +
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
        mounted: function() {
            const self = this;
            this.updateData();
            let lastUpdate = Date.now();

            document.addEventListener(
                'visibilitychange',
                function stashVisibilityUpdate() {
                    const timeSinceLastUpdate = Math.abs(
                        lastUpdate - Date.now()
                    ) /
                        1000;
                    if (timeSinceLastUpdate > 120) {
                        self.updateData();
                        lastUpdate = Date.now();
                    }
                }
            );
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
