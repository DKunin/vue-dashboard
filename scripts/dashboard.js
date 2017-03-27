(function(root) {
    const KANBAN = root.KANBAN_MAIN;
    let template = `
        <div class="flex-container">
            <section class="flex-section">
                <tasksList v-visibilityUpdate :tasks="[]" :hideMaster="state.hideMaster" search="http://192.168.99.100:4747/api/search?jql=assignee%20=%20currentUser()%20AND%20resolution%20=%20Unresolved%20order%20by%20updated%20DESC"/>
                <tasksList v-visibilityUpdate :tasks="[]" :hideMaster="state.hideMaster" :search="kanban + '?boardId=' + state.boardId + '&jql=assignee%20=%20currentUser()'"/>
            </section>
            <section class="flex-section">
                <stashList v-visibilityUpdate :user="state.stashUserName" :hideWips="state.hideWips" />
                <tasksListReport :tasks="state.techDept"/>
            </section>
            <section class="flex-section">
                <planList v-visibilityUpdate />
                <pocketList half />
                
            </section>
        </div>
    `;
    //<rescueTime v-visibilityUpdate hideTime half />
    fetch('./dashboard.html').then(result => result.text()).then(result => {
        template = result;
    });

    root.dashboard = {
        template,
        props: {
            state: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                kanban: KANBAN
            };
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
