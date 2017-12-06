const template = `
    <dashCard :search="search" :updateData="updateData" :hideTime="true" :loading="loading" :customClass="customClass">
        <div v-if="!list.length && !loading" class="tc v-mid pa5 o-30">No data</div>
        <div v-if="displayName">{{uniqueName}}</div>
        <div v-if="displayName">
            <progress :value="donePercent()" max="100">{{donePercent()}} %</progress>
        </div>
        <article v-if="list" :class="articleClass(issue.fields.status.name)" v-for="issue in list" >
            <div class="fr mw1 dib">
                <focusIcon :size="20" :state="issue.focused" :uniqueKey="issue.key" :handleChange="processFocusUpdate"/>
            </div>
            <img alt="issue-type" class="fr mw1 dib" :src="issue.fields.issuetype.iconUrl" >
            <img alt="priority" class="fr mw1 dib" :src="issue.fields.priority ? issue.fields.priority.iconUrl : ''" >
            <a
              class="link black hover-bg-silver"
              :href='"https://jr.avito.ru/browse/" + issue.key'
              target='_blank'>{{issue.key}}: {{issue.fields.summary}}
            </a>
            <div>
                <small :class="'db pv1 pull-request-ticket-status-' + issue.fields.status.name.toLowerCase().replace().replace(/ /g,'-')" >
                    {{issue.fields.status.name}}
                </small>
            </div>
              <a
                v-on:click="clickBranch(issue.fields.customfield_10010)"
                class="link black hover-bg-silver db" >{{issue.fields.customfield_10010}}
              </a>
            <div class="dn">
              {{issue.fields.description}}
            </div>
        </article>
        <div v-if="loading" class="loader">Loader</div>
    </dashCard>
`;

const tasksList = {
    props: {
        search: { type: String, default: '' },
        customClass: { type: String, default: 'panel' },
        uniqueName: { type: String, default: 'tasks' },
        displayName: { type: Boolean, default: false },
        panel: { type: String, default: '' },
        clickBranch: {
            type: Function,
            default: branchNumber => {
                // eslint-disable-next-line
                console.log(branchNumber);
            }
        }
    },
    data() {
        return {
            list:
                JSON.parse(localStorage.getItem(this.uniqueName || 'tasks')) ||
                [],
            loading: false
        };
    },
    computed: {
        query() {
            if (this.search && !this.search.includes('undefined')) {
                return this.search;
            }
            return null;
        }
    },
    methods: {
        computeDone(list) {
            return list.filter(singleIssue => {
                return ['Resolved', 'Closed'].includes(
                    singleIssue.fields.status.name
                );
            }).length;
        },
        donePercent() {
            const number = this.computeDone(this.list) * 100 / this.list.length;
            return Number.isNaN(number) ? 0 : Math.ceil(number);
        },
        processFocusUpdate(key) {
            this.list = this.list
                .map(singleItem => {
                    if (singleItem.key === key) {
                        singleItem.focused = !singleItem.focused;
                    }

                    return singleItem;
                })
                .sort(
                    (a, b) => (a.focused === b.focused ? 0 : a.focused ? -1 : 1)
                );
            localStorage.setItem(this.uniqueName, JSON.stringify(this.list));
        },
        articleClass(name) {
            return [
                'w-100 bb b--black-05 pb2 mt2',
                {
                    'o-30':
                        name.toLowerCase().indexOf('review') !== -1 ||
                        name.toLowerCase().indexOf('master') !== -1
                }
            ];
        },
        updateData() {
            if (!this.query) {
                return setTimeout(this.updateData, 500);
            }

            this.loading = true;

            this.$http.get(this.query).then(
                response => {
                    this.loading = false;
                    this.list = response.body
                        .map(singleItem => {
                            const found = this.list.find(
                                singleKey => singleKey.key === singleItem.key
                            );
                            if (found) {
                                singleItem.focused = found.focused;
                            }
                            return singleItem;
                        })
                        .sort(
                            (a, b) =>
                                a.focused === b.focused ? 0 : a.focused ? -1 : 1
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

export default tasksList;
