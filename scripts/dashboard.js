(function(root) {
    const template = `
        <div>
            <section class="fl w-100 w-50-ns pl3 min-vh-75">
                <tasksList :tasks="filteredTasks" :clickBranch="openBranch"/>
            </section>
            <section class="fl w-100 w-50-ns pl3 min-vh-75">
                <stashList :requests="filteredRequests" />
            </section>
        </div>
    `;

    root['dashboard'] = {
        template,
        props: {
            items: {
                type: Array,
                default: [ { name: 'one' }, { name: 'two' } ]
            }
        },
        data: () =>
            ({ tasks: [], requests: [], hideWips: false, hideMaster: false }),
        computed: {
            filteredRequests: function() {
                return this.requests.reduce(
                    (newArray, singleItem) => {
                        if (this.hideWips && singleItem.title.includes('WIP')) {
                            return newArray;
                        }
                        return newArray.concat(singleItem);
                    },
                    []
                );
            },
            filteredTasks: function() {
                if (!this.tasks)
                    return null;
                return this.tasks.reduce(
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
        methods: {
            // updateTasks: function(boardId) {
            //     Promise
            //         .all([
            //             makeRequest(
            //                 KANBAN_MAIN +
            //                     `?boardId=${boardId}&jql=assignee%20=%20currentUser()`
            //             )
            //         ])
            //         .then((tasks, secondTasks) => {
            //             const concatinated = tasks.reduce(
            //                 function(newArray, singleItem) {
            //                     return newArray.concat(singleItem);
            //                 },
            //                 []
            //             );
            //             this.$set(this, 'tasks', concatinated);
            //         });
            // },
            // updateStash: function(stashUserName) {
            //     makeRequest(PRS + '?username=' + stashUserName)
            //         .then(data => {
            //             console.log(data);
            //             this.$set(this, 'requests', data);
            //         });
            // }
            openBranch: function(branch) {
                console.log(branch);
            }
        },
        mounted: function() {
            const { stashUserName, boardId, hideMaster, hideWips } = JSON.parse(
                localStorage.getItem('settings')
            ) ||
                {
                    stashUserName: '',
                    boardId: '',
                    hideMaster: false,
                    hideWips: false
                };

            this.$set(this, 'hideMaster', hideMaster);
            this.$set(this, 'hideWips', hideWips);
            // this.updateTasks(boardId);
            // this.updateStash(stashUserName);
            // document.addEventListener(
            //     'visibilitychange',
            //     () => {
            //         this.updateTasks(boardId);
            //         this.updateStash(stashUserName);
            //     },
            //     false
            // );
        }
    };
})(this);
