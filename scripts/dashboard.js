import tasksList from './tasksList.js';
import stashList from './stashList.js';
import planList from './planList.js';
import githubIssues from './githubIssues.js';
import tasksListReport from './tasksListReport.js';
import changedFilesList from './changedFilesList.js';

const dashboard = {
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
            return [this.pageOne(createElement), this.pageTwo(createElement)][
                parseInt(this.$route.params.pageNumb)
            ];
        },
        pageOne(createElement) {
            return [
                createElement(
                    'section',
                    {
                        class: {
                            'flex-section': true
                        },
                        key: 'personal-tasks',
                        data: {
                            name: 'personal-tasks'
                        }
                    },
                    [
                        createElement(tasksList, {
                            props: {
                                search:
                                    this.$localDockerIp +
                                    ':4747/api/search?jql=' +
                                    escape(
                                        'assignee = currentUser() AND resolution = Unresolved and (status != "Ready for merge") order by updated DESC'
                                    )
                            },
                            directives: [
                                {
                                    name: 'visibilityUpdate'
                                }
                            ]
                        }),
                        createElement(tasksList, {
                            props: {
                                uniqueName: 'watchedTasks',
                                search:
                                    this.$localDockerIp +
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
                        createElement(stashList, {
                            props: {
                                user: this.state.stashUserName
                            },
                            directives: [
                                {
                                    name: 'visibilityUpdate'
                                }
                            ]
                        }),
                        createElement(githubIssues, {
                            props: {
                                search: `https://api.github.com/issues?access_token=${this
                                    .state.githubToken}`
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
                        createElement(planList, {
                            props: { hideTime: true },
                            directives: [
                                {
                                    name: 'visibilityUpdate'
                                }
                            ]
                        }),
                        createElement(changedFilesList, {
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
                        },
                        key: 'mobile-releases',
                        data: {
                            name: 'mobile-releases'
                        }
                    },
                    [
                        createElement(tasksList, {
                            props: {
                                uniqueName: 'iOs 22',
                                panel: '',
                                displayName: true,
                                search:
                                    this.$localDockerIp +
                                    ':4747/api/search?jql=' +
                                    escape(
                                        'labels = 22.0 AND component = "Trust&Safety" AND project = "Avito iOS" ORDER BY priority DESC, issuetype DESC'
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
                        },
                        key: 'mobile-releases',
                        data: {
                            name: 'mobile-releases'
                        }
                    },
                    [
                        createElement(tasksList, {
                            props: {
                                uniqueName: 'Android 22',
                                panel: '',
                                displayName: true,
                                search:
                                    this.$localDockerIp +
                                    ':4747/api/search?jql=' +
                                    escape(
                                        'labels = 22.0 AND component = "Trust&Safety" AND project = "Avito Android" ORDER BY issuetype DESC'
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
                        createElement(tasksListReport, {
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
                                class:
                                    'f4 fw6 db black link hover-near-black' +
                                    (this.$route.params.pageNumb === '0'
                                        ? ' current-page'
                                        : ''),
                                attrs: {
                                    href: '#/dashboard/0'
                                }
                            },
                            '•'
                        ),
                        createElement(
                            'a',
                            {
                                class:
                                    'f4 fw6 db black link hover-near-black' +
                                    (this.$route.params.pageNumb === '1'
                                        ? ' current-page'
                                        : ''),
                                attrs: {
                                    href: '#/dashboard/1'
                                }
                            },
                            '•'
                        )
                    ]
                )
            ]
        );
    }
};

export default dashboard;
