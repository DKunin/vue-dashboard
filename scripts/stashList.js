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
            <singlePr v-for="request in list" :request="request" :user="user" :updateData="updateData" />
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
