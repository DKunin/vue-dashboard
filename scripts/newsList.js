(function(root) {
    const template = `
        <dashCard :updateData="updateData" :hideTime="true" :loading="loading">
            <div v-if="!list.length && !loading" class="tc v-mid pa5 o-30">No data</div>
            <div v-if="list">
                <article :class="articleClass()" v-for="item in list" >
                    <img class="news-article-image" :src="item.urlToImage ? item.urlToImage : 'http://placehold.it/72x50'" alt="" />
                    <a
                      class="link black news-article-link pl2"
                      :href="item.url"
                      target='_blank'>{{item.title}}
                    </a>
                </article>
            </div>
            <div v-if="loading" class="loader">Loader</div>
        </dashCard>
    `;

    root.newsList = {
        props: {
            search: { type: String, default: '' },
            clickBranch: {
                type: Function,
                default: branchNumber => {
                    console.log(branchNumber);
                }
            }
        },
        data: () => ({
            list: [],
            loading: false
        }),
        computed: {
            query() {
                if (this.search && !this.search.match(/apiKey=$/)) {
                    return this.search;
                }
                return null;
            }
        },
        methods: {
            articleClass: function(name) {
                return [
                    'dt w-100 bb b--black-05 pb2 mt2 news-article'
                ];
            },
            updateData: function(silent) {
                if (!this.query) {
                    return setTimeout(this.updateData, 500);
                }

                this.loading = true;
                if (!silent) {
                    this.list = [];
                }

                this.$http.get(this.query).then(response => {
                    this.loading = false;
                    this.list = response.body.articles;
                }, () => {
                    this.loading = false;
                    this.list = [];
                });
            }
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
