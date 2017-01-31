(function(root) {
    const initialState = {
        stashUrl: '',
        stashUserName: '',
        boardId: '',
        hideMaster: false,
        hideWips: false
    };
    root['settings'] = {
        data: () => initialState,
        template: `
          <main class="pa4 black-80">
            <form class="measure center" v-on:submit="saveSettings">
              <fieldset class="ba b--transparent ph0 mh0">
                <legend class="f4 fw6 ph0 mh0">Settings</legend>
                <div class="mt3">
                  <label class="db fw6 lh-copy f6" for="stashUserName">username for stash</label>
                  <input v-model="stashUserName" class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="stashUserName"  id="stashUserName">
                </div>
                <div class="mt3">
                  <label class="db fw6 lh-copy f6" for="stashUrl">stash url</label>
                  <input v-model="stashUrl" class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="stashUrl"  id="stashUrl">
                </div>
                <div class="mt3">
                  <label class="db fw6 lh-copy f6" for="boardId">BoardId</label>
                  <input v-model="boardId" class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="boardId"  id="boardId">
                </div>
                <div class="mt3">
                  <label class="pa0 ma0 lh-copy f6 pointer">
                      <input type="checkbox" v-model="hideMaster" />
                      Hide inMaster
                  </label>
                </div>
                <div class="mt3">
                  <label class="pa0 ma0 lh-copy f6 pointer">
                      <input type="checkbox" v-model="hideWips" />
                      Hide wips
                  </label>
                </div>
              </fieldset>
              <div class="">
                <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Save">
              </div>
            </form>
          </main>
      `,
        methods: {
            saveSettings: function(event) {
                event.preventDefault();
                const { stashUserName, boardId, hideMaster, hideWips } = this;
                localStorage.setItem(
                    'settings',
                    JSON.stringify({
                        stashUserName,
                        boardId,
                        hideMaster,
                        hideWips
                    })
                );
            }
        },
        mounted: function() {
            const { stashUserName, boardId, hideMaster, hideWips } = JSON.parse(
                localStorage.getItem('settings')
            ) ||
                initialState;
            this.$set(this, 'stashUserName', stashUserName);
            this.$set(this, 'boardId', boardId);
            this.$set(this, 'hideMaster', hideMaster);
            this.$set(this, 'hideWips', hideWips);
        }
    };
})(this);
