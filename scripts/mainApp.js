(function(root) {
    const routes = [
        { path: '/', component: dashboard },
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
            <router-view :state="{ tasks, requests, hideWips, hideMaster, techDept }" />
        </main>
    `;

    root['mainApp'] = {
        router,
        el: '#app',
        template,
        name: 'mainApp',
        data: () => ({
            tasks: [],
            techDept: [],
            requests: [],
            hideWips: false,
            hideMaster: false
        })
    };
})(this || (typeof window !== 'undefined' ? window : global));
