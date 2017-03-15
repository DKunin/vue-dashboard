(function(root) {
    const template = `
        <dashCard :updateData="updateData" :nopadding="true">
            <div v-if="!onlySolved(list).length && !loading" class="tc v-mid pa5 o-30">
                No data
            </div>
            <div v-if="list">
                <div v-if="loading" class="loader">Loader</div>
                <article :class="articleClass(issue.fields.status.name + issue.fields.resolution.name)" v-for="issue in onlySolved(list)" >
                  - {{issue.fields.summary}} 
                    <a
                      class="link black hover-bg-silver"
                      tabindex="0"
                      :href='"https://jr.avito.ru/browse/" + issue.key'
                      target='_blank'>[https://jr.avito.ru/browse/{{issue.key}}]</a>
                </article>
            </div>
        </dashCard>
    `;

    root.tasksListReport = {
        data: () => ({
            list: [],
            loading: false
        }),
        methods: {
            articleClass: function(name) {
                let lowerName = name.toLowerCase();
                return [
                    'dt w-100 bb b--black-05 pb2 mt2',
                    'jira-task-item',
                    {
                        'jira-task-item-fixed': lowerName.indexOf('fixed') !== -1,
                        'o-30': (
                            lowerName.indexOf('review') !== -1 ||
                            lowerName.indexOf('master') !== -1
                        )
                    }
                ];
            },
            onlySolved: function(issues) {
                return issues.filter(singleItem => {
                    return (singleItem.fields.status.name === 'Resolved' ||
                        singleItem.fields.status.name === 'Closed') &&
                        !singleItem.fields.labels.includes(
                            'techdebt-fe-reported'
                        );
                });
            },
            updateData: function() {
                this.loading = true;
                this.$http
                    .get(
                        root.LOCAL_DOCKER_IP +
                            ':4747/api/search' +
                            '?jql=labels = techdebt-fe AND updated >= startOfWeek() ORDER BY updated DESC'
                    )
                    .then(
                        response => {
                            this.loading = false;
                            this.list = response.body;
                        },
                        () => {
                            this.loading = false;
                        }
                    );
            }
        },
        mounted: function() {
            this.updateData();
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
