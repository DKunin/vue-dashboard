(function(root) {
    const routes = [
        { path: '/', redirect: '/dashboard' },
        { path: '/dashboard', component: root.dashboard },
        { path: '/settings', component: settings }
    ];

    const router = new VueRouter({ routes });

    const template = `
        <main>
            <favIcon text="d" fill="purple"/>
            <nav class="left-side-navigation">
              <ul>
                <li>
                    <router-link class="left-side-navigation-link" to="/">
                        <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M6 26h16V6H6v20zm0 16h16V30H6v12zm20 0h16V22H26v20zm0-36v12h16V6H26z"/></svg>
                    </router-link>
                </li>
                <li>
                    <router-link class="left-side-navigation-link" to="/settings">
                        <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3a14.8 14.8 0 0 0-3.38 1.97L9.9 10.1a1 1 0 0 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3a14.8 14.8 0 0 0 3.38-1.97l4.98 2.01a1 1 0 0 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
                    </router-link>
                </li>
              </ul>
            </nav>
            <router-view :state="{ stashUserName, resqueApi }" />
        </main>
    `;

    root.mainApp = {
        router,
        el: '#app',
        template,
        name: 'mainApp',
        data: () => ({
            stashUserName: '',
            resqueApi: 'noKey'
        })
    };
})(this || (typeof window !== 'undefined' ? window : global));
