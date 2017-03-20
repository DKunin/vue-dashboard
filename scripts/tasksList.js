(function(root) {
    const template = `
        <dashCard :updateData="updateData" :hideTime="true" :loading="loading">
            <div v-if="!list.length && !loading" class="tc v-mid pa5 o-30">No data</div>
            <div v-if="list">
                <article :class="articleClass(issue.fields.status.name)" v-for="issue in list" >
                    <img class="fr mw1 dib" :src="issue.fields.issuetype.iconUrl" >
                    <img class="fr mw1 dib" :src="issue.fields.priority.iconUrl" >
                    <a
                      class="link black hover-bg-silver"
                      tabindex="0"
                      :href='"https://jr.avito.ru/browse/" + issue.key'
                      target='_blank'>{{issue.key}}: {{issue.fields.summary}}
                    </a>
                    <div>
                      <small>{{issue.fields.status.name}}</small>
                    </div>
                    <div>
                      <a
                        v-on:click="clickBranch(issue.fields.customfield_10010)"
                        class="link black hover-bg-silver" >{{issue.fields.customfield_10010}}
                      </a>
                    </div>
                    <div class="dn">
                      {{issue.fields.description}}
                    </div>
                </article>
            </div>
            <div v-if="loading" class="loader">Loader</div>
        </dashCard>
    `;

    root.tasksList = {
        props: {
            tasks: { type: Array, default: [] },
            boardId: { type: Number, default: 0 },
            hideMaster: { type: Boolean, default: false },
            clickBranch: { type: Function, default: () => {} }
        },
        data: () => ({
            list: [],
            loading: false
        }),
        methods: {
            articleClass: function(name) {
                return [
                    'dt w-100 bb b--black-05 pb2 mt2',
                    {
                        'o-30': (
                            name.toLowerCase().indexOf('review') !== -1 ||
                                name.toLowerCase().indexOf('master') !== -1
                        )
                    }
                ];
            },
            updateData: function(silent) {
                if (!this.boardId) {
                    return setTimeout(this.updateData, 500);
                }

                this.loading = true;
                if (!silent) {
                    this.list = [];
                }

                this.$http
                    .get(
                        root.KANBAN_MAIN +
                            `?boardId=${this.boardId}&jql=assignee%20=%20currentUser()`
                    )
                    .then(
                        response => {
                            this.loading = false;
                            this.list = this.filteredTasks(response.body);
                        },
                        () => {
                            this.loading = false;
                            this.list = [];
                        }
                    );
            },
            filteredTasks: function(list) {
                return list.reduce(
                    (newArray, singleItem) => {
                        if (
                            this.hideMaster &&
                                singleItem.fields.status.name === 'In Master'
                        ) {
                            return newArray;
                        }
                        return newArray.concat(singleItem);
                    },
                    []
                );
            }
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
