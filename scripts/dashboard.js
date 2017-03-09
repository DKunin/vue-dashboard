(function(root) {
    const template = `
        <div class="flex-container">
            <section class="flex-section">
                <tasksList :tasks="[]" :clickBranch="openBranch" :hideMaster="state.hideMaster" :boardId="state.boardId"/>
            </section>
            <section class="flex-section">
                <stashList :user="state.stashUserName" :hideWips="state.hideWips" />
                <tasksListReport :tasks="state.techDept"/>
            </section>
            <section class="flex-section">
                <planList />
                <pocketList />
            </section>
        </div>
    `;

    root['dashboard'] = {
        template,
        props: {
            state: {
                type: Object,
                default: {}
            }
        },
        computed: {},
        methods: {
            openBranch: function(branch) {
                console.log(branch);
            }
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
