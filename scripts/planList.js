const template = `
        <dashCard :updateData="updateData" :hideTime="hideTime">
            <div v-if="!plans.length && !loading">
                <div class="fw1 tc v-mid pa5 o-30">
                    no data
                </div>
            </div>
            <div v-if="plans">
                <div v-if="loading" class="loader"></div>
                <div v-for="file in plans" class="f6 lh-cop bb b--black-05 pv3">
                    {{file}}
                </div>
            </div>
        </dashCard>
    `;

const planList = {
    data() {
        return {
            plans: [],
            loading: false
        };
    },
    props: {
        hideTime: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        updateData: function() {
            this.plans = [];
            this.loading = true;
            this.$http
                .get(
                    this.$localIp +
                        ':4949/command/_Users_dikunin_Projects_work-calendar-exchange_calendar'
                )
                .then(
                    response => {
                        this.loading = false;
                        this.plans =
                            typeof response.body === 'string'
                                ? response.body
                                    .trim()
                                    .split('\n')
                                    .filter(Boolean)
                                : null;
                    },
                    () => {
                        this.loading = false;
                    }
                );
        }
    },
    template
};

export default planList;
