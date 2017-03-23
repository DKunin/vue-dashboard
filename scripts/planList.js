(function(root) {
    const template = `
        <dashCard :updateData="updateData">
            <div v-if="!plans && !loading">
                <div class="tc v-mid pa5 o-30">
                    No data
                </div>
            </div>
            <div v-if="plans">
                <div v-if="loading" class="loader"></div>
                <div v-for="file in plans" class="f5 lh-cop bb b--black-05 pv3">
                    {{file}}
                </div>
            </div>
        </dashCard>
    `;

    root.planList = {
        data: () => ({
            plans: [],
            loading: false
        }),
        methods: {
            updateData: function() {
                this.plans = [];
                this.loading = true;
                this.$http
                    .get(
                        root.LOCAL_IP +
                            ':4949/command/_Users_dikunin_Projects_work-calendar-exchange_calendar'
                    )
                    .then(
                        response => {
                            this.loading = false;
                            this.plans = typeof response.body === 'string'
                                ? response.body.split('\n')
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
})(this || (typeof window !== 'undefined' ? window : global));
