(function(root) {
    const template = `
        <div>
            <section class="fl w-100 w-33-ns min-vh-75 pr3">
                <tasksList :tasks="filteredTasks" :clickBranch="openBranch"/>
            </section>
            <section class="fl w-100 w-33-ns min-vh-75">
                <stashList :requests="filteredRequests" />
            </section>
            <section class="fl w-100 w-33-ns min-vh-75">
                <planList/>
                <processList/>
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
                        if (this.state.hideWips && singleItem.title.includes('WIP')) {
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
