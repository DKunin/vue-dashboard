(function(root) {
    let template = `
        <div class="flex-container">
            <section class="flex-section">
                <tasksList v-visibilityUpdate :tasks="[]" :hideMaster="state.hideMaster" :boardId="state.boardId"/>
            </section>
            <section class="flex-section">
                <stashList v-visibilityUpdate :user="state.stashUserName" :hideWips="state.hideWips" />
                <tasksListReport :tasks="state.techDept"/>
            </section>
            <section class="flex-section">
                <planList v-visibilityUpdate />
                <pocketList />
            </section>
        </div>
    `;

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
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
