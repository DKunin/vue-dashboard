(function(root) {
    root['tasksList'] = {
        props: {
            tasks: { type: Array, default: [] },
            clickBranch: { type: Function, default: () => {} }
        },
        methods: {
            articleClass: function(name) {
                return [
                    'dt w-100 bb b--black-05 pb2 mt2',
                    {
                        'o-30': name.toLowerCase().indexOf('review') !== -1 ||
                            name.toLowerCase().indexOf('master') !== -1
                    }
                ];
            }
        },
        template: `
          <div>
            <div v-if="tasks === null">No data</div>
            <div v-if="tasks">
                <div v-if="!tasks.length" class="loader">Loader</div>
                <article :class="articleClass(issue.fields.status.name)" v-for="issue in tasks" >
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
          </div>
      `
    };
})(this);
