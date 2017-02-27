(function(root) {
    root['pocketList'] = {
        data: () => ({
            list: [],
            count: 0
        }),
        methods: {
            updateData: function() {
                this.$http
                    .get(
                        'http://192.168.99.100:5050/api/pocket'
                    )
                    .then(
                        response => {
                            this.list = response.body.list;
                            this.count = response.body.count;
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
          <dashCard :updateData="updateData" :hideTime="true">
            <div v-if="list === null">No data</div>
            <div v-if="list">
                <div v-if="!list.length" class="loader"></div>
                  <div v-for="item in list" class="f5 lh-cop bb b--black-05 pv3">
                    <a class="fw6 db black link dim" :href="item.url" target="_blank">
                        {{item.title}}
                        <small class="db">≈{{Math.ceil(item.word_count/250)}} min. read</small>
                    </a>
                  </div>
            </div>
          </dashCard>
      `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
