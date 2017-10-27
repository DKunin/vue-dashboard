const template = `
        <dashCard :updateData="updateData" :hideTime="true" :loading="loading">
            <div v-if="!list.length && !loading" class="tc v-mid pa5 o-30">No data</div>
            <article class="w-100 bb b--black-05 pb2 mt2 github-issue" v-if="list" v-for="issue in list" :key="issue.id">
                <img class="github-avatar" :src="issue.assignee.avatar_url" alt="" />
                <div class="pl2">
                    <div class="github-issue-info">
                        <a class="github-issue-link link black" target="_blank" :href="issue.html_url">{{ issue.title }}
                            <div><small>{{issue.repository.name}}</small></div>
                        </a>

                        <svg class="github-issue-comments" v-if="issue.comments" height="24" version="1.2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1H9.171L9 16.171V16H6c-.542 0-1-.458-1-1V8c0-.542.458-1 1-1h12m0-2H6C4.35 5 3 6.35 3 8v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3z"/>
                            <text
                                x="50%"
                                y="60%"
                                text-anchor="middle"
                                font-family="Helvetica"
                                font-size="9">
                                {{issue.comments}}
                            </text>
                        </svg>
                    </div>
                    <div v-for="label in issue.labels" :class="'label ' + label.name" :style="'background-color: #' + label.color">
                        {{label.name}}
                    </div>
                </div>
            </article>
            <div v-if="loading" class="loader">Loader</div>
        </dashCard>
    `;

const githubIssues = {
    props: {
        search: { type: String, default: '' },
        uniqueName: { type: String, default: 'githubIssues' }
    },
    data() {
        return {
            list:
                JSON.parse(
                    localStorage.getItem(this.uniqueName || 'githubIssues')
                ) || [],
            loading: false
        };
    },
    computed: {
        query() {
            if (
                this.search &&
                !this.search.includes('undefined') &&
                !this.search.match(/token=$/)
            ) {
                return this.search;
            }
            return null;
        }
    },
    methods: {
        updateData() {
            if (!this.query) {
                return setTimeout(this.updateData, 500);
            }

            this.loading = true;

            this.$http.get(this.query).then(
                response => {
                    this.loading = false;
                    this.list = response.body;
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
export default githubIssues;
