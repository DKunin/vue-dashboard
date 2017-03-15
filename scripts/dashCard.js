(function(root) {
    const template = `
        <div :class="'dash-panel ' + (nopadding? 'dash-panel-no-padding':'')">
            <button :class="'refresh-button ' + (loading ? 'refresh-button refresh-button-updating': '')" v-on:click.prevent="forceUpdate"><span>↻</span></button>
            <slot>∅</slot>
            <small v-if="!hideTime" class="dash-panel-time">{{updatedTime}}</small>
        </div>
    `;

    root.dashCard = {
        props: {
            updateData: {
                type: Function,
                default: () => {}
            },
            hideTime: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            nopadding: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            forceUpdate: function() {
                this.$set(this, 'updatedTime', new Date());
                this.updateData(true);
            }
        },
        data: () => ({
            updatedTime: new Date()
        }),
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
