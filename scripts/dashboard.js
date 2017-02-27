(function(root) {
    const template = `
        <div class="flex-container">
            <section class="flex-section">
                <tasksList :tasks="filteredTasks" :clickBranch="openBranch"/>
            </section>
            <section class="flex-section">
                <stashList :requests="filteredRequests" />
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
        computed: {
            filteredRequests: function() {
                return this.state.requests.reduce(
                    (newArray, singleItem) => {
                        if (
                            this.state.hideWips &&
                                singleItem.title.includes('WIP')
                        ) {
                            return newArray;
                        }
                        return newArray.concat(singleItem);
                    },
                    []
                );
            },
            filteredTasks: function() {
                return this.state.tasks.reduce(
                    (newArray, singleItem) => {
                        if (
                            this.state.hideMaster &&
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
        methods: {
            openBranch: function(branch) {
                console.log(branch);
            }
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
