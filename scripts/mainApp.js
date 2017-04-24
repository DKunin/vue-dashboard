(function(root) {
    const routes = [
        { path: '/', component: root.dashboard },
        { path: '/settings', component: settings }
    ];

    const router = new VueRouter({ routes });

    const template = `
        <main>
            <nav class="left-side-navigation">
              <ul>
                <li>
                    <router-link class="left-side-navigation-link" to="/">
                        <i class="fa fa-desktop" aria-hidden="true"></i>
                    </router-link>
                </li>
                <li>
                    <router-link class="left-side-navigation-link" to="/settings">
                        <i class="fa fa-cogs" aria-hidden="true"></i>
                    </router-link>
                </li>
              </ul>
            </nav>
            <router-view :state="{ tasks, requests, hideWips, hideMaster, techDept, stashUserName, boardId, resqueApi, newsApi }" />
        </main>
    `;

    root.mainApp = {
        router,
        el: '#app',
        template,
        name: 'mainApp',
        data: () => ({
            tasks: [],
            techDept: [],
            requests: [],
            stashUserName: '',
            newsApi: '',
            resqueApi: 'noKey',
            boardId: 0,
            hideWips: false,
            hideMaster: false
        })
    };
})(this || (typeof window !== 'undefined' ? window : global));
