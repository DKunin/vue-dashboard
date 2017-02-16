(function(root) {
    root['processList'] = {
        data: () => ({
            processes: []
        }),
        mounted: function() {
            this.$http
                .get(root.LOCAL_IP + ':4949/command/pm2?options=jlist')
                .then(
                    response => {
                        this.processes = response.body;
                    },
                    response => {}
                );
        },
        template: (
            `
          <div class="">
            <div v-if="processes === null">No data</div>
            <div v-if="processes">
                <div v-if="!processes.length" class="loader">Loader</div>
                <table class="w-100 collapse ba br2 b--black-10">
                  <tbody>
                    <tr v-for="process in processes" class="striped--near-white ">
                      <td class="pa2">{{process.pm_id}}</td><td class="pa2">{{process.name}}</td><td class="pa2">{{process.monit.cpu}}%</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
      `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
