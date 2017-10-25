import selectText from './selectText.js';

const template = `
        <div :class="computedClass">
            <button :class="'refresh-button ' + (loading ? 'refresh-button refresh-button-updating': '')" v-on:click.prevent="forceUpdate">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="23 4 23 10 17 10"/>
                        <polyline points="1 20 1 14 7 14"/>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                    </svg>
            </button>
            <button type="button" v-if="search" @click="copyPath(unescape(search))" class="refresh-button" >
                <search-icon />
            </button>
            <slot>∅</slot>
            <small v-if="!hideTime" class="dash-panel-time">{{updatedTime}}</small>
        </div>
    `;


const dashCard = {
    props: {
        updateData: {
            type: Function,
            default: () => {}
        },
        half: {
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: ''
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
        },
        search: {
            type: String,
            default: ''
        }
    },
    methods: {
        forceUpdate() {
            this.$set(this, 'updatedTime', new Date());
            this.updateData(true);
        },
        copyPath(text) {
            let changedText = text.split('?')[1];
            selectText({ text: changedText });
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
            if (this.customClass) {
                basic.push(this.customClass);
            }
            return basic.join(' ');
        }
    },
    data: () => ({
        updatedTime: new Date()
    }),
    template
};

export default dashCard;
