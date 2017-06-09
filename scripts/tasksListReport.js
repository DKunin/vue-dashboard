(function(root) {

    function selectText(element) {
        var text = document.querySelector(element);
        var selection = document.getSelection();
        var range = document.createRange();
        range.selectNode(text);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
    }

    const template = `
        <dashCard :updateData="updateData" nopadding hideTime>
            <span :class="'refresh-button copy-button ' + (copyStatus ? 'copy-button_copied' : '')" @click.prevent="copy">
                <svg class="to-copy-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <rect x="9" y="2" width="13" height="13" rx="2" ry="2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path d="M9 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
                <svg class="copied-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="23 3 12 14 9 11"/>
                </svg>

            </span>
            <div v-if="!list.length && !loading" class="fw1 tc v-mid pa5 o-30">
                no data
            </div>
            <div v-if="list" class="search-list">
                <article :class="articleClass(issue.fields.status.name + issue.fields.resolution.name)" v-for="issue in list" >
                  - {{issue.fields.summary}} 
                    <a
                      class="link black hover-bg-silver"
                      tabindex="0"
                      :href='"https://jr.avito.ru/browse/" + issue.key'
                      target='_blank'>[{{issue.fields.creator.displayName}}, https://jr.avito.ru/browse/{{issue.key}}]</a>
                </article>
            </div>
            <div v-if="loading" class="loader">Loader</div>
        </dashCard>
    `;

    root.tasksListReport = {
        data: () => ({
            list: [],
            loading: false,
            copyStatus: false
        }),
        methods: {
            articleClass: function(name) {
                let lowerName = name.toLowerCase();
                return [
                    'dt w-100 bb b--black-05 pb2 mt2',
                    'jira-task-item',
                    {
                        'jira-task-item-fixed': lowerName.indexOf('fixed') !==
                            -1,
                        'o-30': lowerName.indexOf('review') !== -1 ||
                            lowerName.indexOf('master') !== -1
                    }
                ];
            },
            updateData: function() {
                this.loading = true;
                this.$http
                    .get(
                        this.$localDockerIp +
                            ':4747/api/search' +
                            '?jql=labels = techdebt-fe AND updated >=startOfDay()  AND (assignee in (ichizh, aaromanov, sutkin, rkhafiyatullin, dkunin, kvkryarov, svdmitrievskiy, tvkorosteleva) OR reporter in (ichizh, aaromanov, sutkin, rkhafiyatullin, dkunin, kvkryarov, svdmitrievskiy, tvkorosteleva)) and labels not in (techdebt-fe-reported) and status in (Resolved, Closed) ORDER BY status DESC, updated DESC'
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
            },
            copy: function() {
                selectText('.search-list');
                this.copyStatus = true;
                setTimeout(() => {
                    this.copyStatus = false;
                }, 3000);
            }
        },
        mounted: function() {
            this.updateData();
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
