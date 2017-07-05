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
                            'stash-list-reviewer-self': reviewer.user.name === user
                        }, 'dib tc mb1 mr1 v-mid fw2']" :title="reviewer.user.name">
                            {{reviewer.user.slug}}
                    </span>
                    <button
                        class="approve-button"
                        v-for="reviewer in request.reviewers"
                        @click={approve(request)} 
                        type="button"
                        v-if="reviewer.user.name === user && !reviewer.approved">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15"><path d="M468.907 214.604c-11.423 0-20.682 9.26-20.682 20.682v20.831c-.031 54.338-21.221 105.412-59.666 143.812-38.417 38.372-89.467 59.5-143.761 59.5h-.12C132.506 459.365 41.3 368.056 41.364 255.883c.031-54.337 21.221-105.411 59.667-143.813 38.417-38.372 89.468-59.5 143.761-59.5h.12c28.672.016 56.49 5.942 82.68 17.611 10.436 4.65 22.659-.041 27.309-10.474 4.648-10.433-.04-22.659-10.474-27.309-31.516-14.043-64.989-21.173-99.492-21.192h-.144c-65.329 0-126.767 25.428-172.993 71.6C25.536 129.014.038 190.473 0 255.861c-.037 65.386 25.389 126.874 71.599 173.136 46.21 46.262 107.668 71.76 173.055 71.798h.144c65.329 0 126.767-25.427 172.993-71.6 46.262-46.209 71.76-107.668 71.798-173.066v-20.842c0-11.423-9.259-20.683-20.682-20.683z" fill="#c2c2c2"/><path d="M505.942 39.803c-8.077-8.076-21.172-8.076-29.249 0L244.794 271.701l-52.609-52.609c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.077-8.077 21.172 0 29.249l67.234 67.234a20.616 20.616 0 0 0 14.625 6.058 20.618 20.618 0 0 0 14.625-6.058L505.942 69.052c8.077-8.077 8.077-21.172 0-29.249z" fill="#c2c2c2"/></svg>
                    </button>
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
            approve(obj) {
                if (!window.confirm('Approve?')) {
                    return;
                }
                const repo = obj.fromRef.repository.name;
                const pullReqId = obj.id;
                const project = obj.fromRef.repository.project.key;

                this.$http
                    .post(
                        `${this.$localDockerIp}:4848/api/approve?project=${project}&repo=${repo}&pullRequestId=${pullReqId}`
                    )
                    .then(
                        () => {
                            this.updateData(true);
                        },
                        () => {
                            this.loading = false;
                            this.list = [];
                        }
                    );
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
