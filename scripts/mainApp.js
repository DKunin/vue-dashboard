(function(root) {
    const routes = [
        { path: '/', component: dashboard },
        { path: '/settings', component: settings }
    ];

    const router = new VueRouter({ routes });

    const template = `
        <main>
            <nav class="pb2">
              <div class="nowrap overflow-x-auto">
                <router-link class="link dim gray f5 f4-ns dib mr3" to="/">Dashboard</router-link>
                <router-link class="link dim gray f5 f4-ns dib mr3" to="/settings">Settings</router-link>
              </div>
            </nav>
            <router-view :state="{ tasks, requests, hideWips, hideMaster }" />
        </main>
    `;

    root['mainApp'] = {
        router,
        el: '#app',
        template,
        name: 'mainApp',
        data: () => ({
            tasks: [],
            requests: [],
            hideWips: false,
            hideMaster: false
        })
    };
})(this || (typeof window !== 'undefined' ? window : global));
