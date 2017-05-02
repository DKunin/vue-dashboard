(function(root) {
    const template = `
        <div :class="computedClass">
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
            half: {
                type: Boolean,
                default: false
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
        computed: {
            computedClass() {
                let basic = [ 'dash-panel' ];
                if (this.nopadding) {
                    basic.push('dash-panel-no-padding');
                }
                if (this.half) {
                    basic.push('dash-panel-half');
                }
                return basic.join(' ');
            }
        },
        data: () => ({
            updatedTime: new Date()
        }),
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
