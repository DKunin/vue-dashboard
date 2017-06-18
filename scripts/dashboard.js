(function(root) {
    root.dashboard = {
        props: {
            state: {
                type: Object,
                default: {}
            }
        },
        methods: {
            computedPage(createElement, getArray) {
                if (getArray) {
                    return [{}, {}];
                }
                return [
                    this.pageOne(createElement),
                    this.pageTwo(createElement)
                ][parseInt(this.$route.params.pageNumb)];
            },
            pageOne(createElement) {
                return [
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
                                    search: this.$localDockerIp +
                                        ':4747/api/search?jql=assignee%20=%20currentUser()%20AND%20resolution%20=%20Unresolved%20order%20by%20updated%20DESC'
                                },
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            }),
                            createElement(root.tasksList, {
                                props: {
                                    uniqueName: 'watchedTasks',
                                    search: this.$localDockerIp +
                                        ':4747/api/search?jql=' +
                                        escape(
                                            'watcher = currentUser() and (status = "In test" or status = "QA Progress" or status = "Ready for merge")'
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
                            createElement(root.changedFilesList, {
                                props: {
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
                ];
            },
            pageTwo(createElement) {
                return [
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
                                    search: this.$localDockerIp +
                                        ':4747/api/search?jql=assignee%20=%20currentUser()%20AND%20resolution%20=%20Unresolved%20order%20by%20updated%20DESC'
                                },
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            }),
                            createElement(root.tasksList, {
                                props: {
                                    uniqueName: 'watchedTasks',
                                    search: this.$localDockerIp +
                                        ':4747/api/search?jql=' +
                                        escape(
                                            'watcher = currentUser() and (status = "In test" or status = "QA Progress" or status = "Ready for merge")'
                                        )
                                },
                                directives: [
                                    {
                                        name: 'visibilityUpdate'
                                    }
                                ]
                            })
                        ]
                    )
                ];
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
                    this.computedPage(createElement),
                    createElement(
                        'div',
                        {
                            class: {
                                'page-controls': true
                            }
                        },
                        [
                            createElement(
                                'a',
                                {
                                    class: 'f4 fw6 db black link hover-near-black' + (this.$route.params.pageNumb === '0' ? ' current-page' : ''),
                                    attrs: {
                                        href: '#/dashboard/0'
                                    }
                                },
                                '•'
                            ),
                            createElement(
                                'a',
                                {
                                    class: 'f4 fw6 db black link hover-near-black' + (this.$route.params.pageNumb === '1' ? ' current-page' : ''),
                                    attrs: {
                                        href: '#/dashboard/1'
                                    }
                                },
                                '•'
                            ),
                        ]
                    )
                ]
            );
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
