(function(root) {
    root['dashCard'] = {
        props: {
            updateData: {
                type: Function,
                default: () => {}
            },
            hideTime: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            forceUpdate: function() {
                this.$set(this, 'updatedTime', new Date());
                this.updateData();
            }
        },
        data: () => ({
            updatedTime: new Date()
        }),
        template: (
            `
          <div class="dash-panel">
            <button class="refresh-button" v-on:click.prevent="forceUpdate">↻</button>
            <slot>∅</slot>
            <small v-if="!hideTime" class="dash-panel-time">{{updatedTime}}</small>
          </div>
      `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
