const initialState = {
    githubToken: '',
    stashUserName: ''
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
                  <label class="db fw6 lh-copy f6" for="githubToken">github token</label>
                  <input v-model="githubToken" class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="githubToken" id="githubToken">
                </div>
              </fieldset>
              <div class="">
                <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Save">
              </div>
            </form>
        </main>
    `;

const settings = {
    data() {
        return initialState;
    },
    template,
    methods: {
        saveSettings: function(event) {
            event.preventDefault();
            const { stashUserName, githubToken } = this;

            localStorage.setItem(
                'settings',
                JSON.stringify({
                    stashUserName,
                    githubToken
                })
            );
            updateSettings({
                stashUserName,
                githubToken
            });
            this.$router.push('/');
        }
    },
    mounted: function() {
        const { stashUserName, githubToken } =
            JSON.parse(localStorage.getItem('settings')) || initialState;
        this.$set(this, 'stashUserName', stashUserName);
        this.$set(this, 'githubToken', githubToken);
    }
};

export default settings;
