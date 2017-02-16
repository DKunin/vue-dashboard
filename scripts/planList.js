(function(root) {
    root['planList'] = {
        data: () => ({
            files: []
        }),
        methods: {
            updateData: function() {
                this.$http
                    .get(
                        root.LOCAL_IP + ':4949/command/_Users_dikunin_Projects_work-calendar-exchange_calendar'
                    )
                    .then(
                        response => {
                            this.files = response.body.split('\n');
                        },
                        response => {}
                    );
            }
        },
        mounted: function() {
            this.updateData();
        },
        template: (
            `
          <dashCard :updateData="updateData">
            <div v-if="files === null">No data</div>
            <div v-if="files">
                <div v-if="!files.length" class="loader"></div>
                  <div v-for="file in files" class="f5 lh-cop bb b--black-05 pv3">
                    {{file}}
                  </div>
            </div>
          </dashCard>
      `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
