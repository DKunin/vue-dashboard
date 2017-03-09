(function(root) {
    root['planList'] = {
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
                            this.plans = response.body.split('\n');
                        },
                        response => {
                            this.loading = false;
                        }
                    );
            }
        },
        mounted: function() {
            this.updateData();
        },
        template: (
            `
                <dashCard :updateData="updateData">
                    <div v-if="plans === null && !loading">No data</div>
                    <div v-if="plans">
                        <div v-if="loading" class="loader"></div>
                        <div v-for="file in plans" class="f5 lh-cop bb b--black-05 pv3">
                            {{file}}
                        </div>
                    </div>
                </dashCard>
            `
        )
    };
})(this || (typeof window !== 'undefined' ? window : global));
