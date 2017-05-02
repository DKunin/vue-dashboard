(function(root) {
    const initialState = {
        stashUrl: '',
        stashUserName: '',
        resqueApi: '',
        newsApi: ''
    };
    const template = `
        <main class="pa4 black-80">
            <form class="measure center" v-on:submit="saveSettings">
              <fieldset class="ba b--transparent ph0 mh0">
                <legend class="f4 fw6 ph0 mh0">Settings</legend>
                <div class="mt3">
                  <label class="db fw6 lh-copy f6" for="stashUserName">username for stash</label>
                  <input v-model="stashUserName" class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="stashUserName"  id="stashUserName">
                </div>
                <div class="mt3">
                  <label class="db fw6 lh-copy f6" for="resqueApi">resqueApi</label>
                  <input v-model="resqueApi" class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="resqueApi"  id="resqueApi">
                </div>
                <div class="mt3">
                  <label class="db fw6 lh-copy f6" for="newsApi">newsApi</label>
                  <input v-model="newsApi" class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="newsApi"  id="newsApi">
                </div>
              </fieldset>
              <div class="">
                <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Save">
              </div>
            </form>
        </main>
    `;

    root.settings = {
        data: () => initialState,
        template,
        methods: {
            saveSettings: function(event) {
                event.preventDefault();
                const {
                    stashUserName,
                    newsApi,
                    resqueApi
                } = this;
                localStorage.setItem(
                    'settings',
                    JSON.stringify({
                        stashUserName,
                        resqueApi,
                        newsApi
                    })
                );

                updateSettings({
                    stashUserName,
                    newsApi,
                    resqueApi
                });
                this.$router.push('/');
            }
        },
        mounted: function() {
            const {
                stashUserName,
                newsApi,
                resqueApi
            } = JSON.parse(localStorage.getItem('settings')) || initialState;
            this.$set(this, 'stashUserName', stashUserName);
            this.$set(this, 'resqueApi', resqueApi);
            this.$set(this, 'newsApi', newsApi);
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
