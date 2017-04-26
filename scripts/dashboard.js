(function(root) {
    root.dashboard = {
        props: {
            state: {
                type: Object,
                default: {}
            }
        },
        render(createElement) {
            return createElement(
                'div',
                {
                    class: {
                        'flex-container': true
                    }
                },
                [
                    createElement(
                        'section',
                        {
                            class: {
                                'flex-section': true
                            }
                        },
                        [
                            createElement(root.tasksList, {
                                props: {
                                    search: (
                                        this.$localDockerIp +
                                            ':4747/api/search?jql=assignee%20=%20currentUser()%20AND%20resolution%20=%20Unresolved%20order%20by%20updated%20DESC'
                                    )
                                },
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            })
                        ]
                    ),
                    createElement(
                        'section',
                        {
                            class: {
                                'flex-section': true
                            }
                        },
                        [
                            createElement(root.stashList, {
                                props: {
                                    user: this.state.stashUserName
                                },
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            }),
                            createElement(root.tasksListReport, {
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            })
                        ]
                    ),
                    createElement(
                        'section',
                        {
                            class: {
                                'flex-section': true
                            }
                        },
                        [
                            createElement(root.planList, {
                                props: { hideTime: true },
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            }),
                            createElement(root.rescueTime, {
                                props: {
                                    resqueKey: this.state.resqueApi,
                                    hideTime: true
                                },
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            })
                        ]
                    )
                ]
            );
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
