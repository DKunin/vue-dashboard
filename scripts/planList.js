(function(root) {
    root['planList'] = {
        data: () => ({
            files: []
        }),
        mounted: function() {
            this.$http
                .get(
                    'http://10.10.12.13:4949/command/_Users_dikunin_Projects_work-calendar-exchange_calendar'
                )
                .then(
                    response => {
                        this.files = response.body.split('\n');
                    },
                    response => {}
                );
        },
        template: (
            `
          <div class="dash-panel">
            <div v-if="files === null">No data</div>
            <div v-if="files">
                <div v-if="!files.length" class="loader">Loader</div>
                  <div v-for="file in files" class="f5 lh-cop bb b--black-05 pv3">
                    {{file}}
                  </div>
            </div>
          </div>
      `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
