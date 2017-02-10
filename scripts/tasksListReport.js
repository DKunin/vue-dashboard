(function(root) {
    root['tasksListReport'] = {
        props: {
            tasks: { type: Array, default: [] }
        },
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
            onlySolved: function(issues){
              return issues.filter(singleItem => {
                return (
                  (singleItem.fields.status.name === 'Resolved' || singleItem.fields.status.name === 'Closed') &&
                  !singleItem.fields.labels.includes('techdebt-fe-reported')
                );
              });
            }
        },
        template: (
            `
          <div class="dash-panel">
            <div v-if="tasks === null">No data</div>
            <div v-if="tasks">
                <div v-if="!tasks.length" class="loader">Loader</div>
                <article :class="articleClass(issue.fields.status.name)" v-for="issue in onlySolved(tasks)" >
                  - {{issue.fields.summary}} 
                    <a
                      class="link black hover-bg-silver"
                      tabindex="0"
                      :href='"https://jr.avito.ru/browse/" + issue.key'
                      target='_blank'>[https://jr.avito.ru/browse/{{issue.key}}]</a>
                </article>
            </div>
          </div>
      `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
