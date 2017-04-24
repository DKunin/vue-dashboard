(function(root) {
    const template = `
        <div class="pv2">
            <div v-if="files === null">No data</div>
            <div v-if="files">
                <div v-if="!files.length" class="loader">Loader</div>
                  <div v-for="file in files">
                    {{file}}
                  </div>
            </div>
        </div>
    `;

    root.changedFiles = {
        data: () => ({
            files: []
        }),
        mounted: function() {
            this.$http
                .get(this.$localIp + ':4949/command/comparemaster')
                .then(response => {
                    this.files = response.body.split('\n');
                });
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
