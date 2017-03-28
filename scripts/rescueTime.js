(function(root) {
    const template = `
        <dashCard :updateData="updateData" :hideTime="true" :half="half">
            <div v-if="!plans && !loading">
                <div class="tc v-mid pa5 o-30">
                    No data
                </div>
            </div>
            <div v-if="plans">
                <div v-for="time in plans" class="f5 lh-cop bb b--black-05 pv3">
                    {{time.name}}: {{time.seconds}} mins.
                </div>
            </div>
            <div v-if="loading" class="loader"></div>
        </dashCard>
    `;

    root.rescueTime = {
        props: {
            half: {
                type: Boolean,
                default: false
            },
            resqueKey: {
                type: String,
                default: ''
            }
        },
        data: () => ({
            plans: [],
            times: [],
            loading: false
        }),
        methods: {
            formatToday() {
                const today = new Date();
                return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            },
            updateData() {
                if (!this.resqueKey) {
                    setTimeout(() => this.updateData(), 800);
                    return;
                }
                this.plans = [];
                this.loading = true;
                this.$http
                    .get(
                        `https://allow-any-origin.appspot.com/https://www.rescuetime.com/anapi/data?&key=${this.resqueKey}&restrict_kind=efficiency&restrict_begin=${this.formatToday()}&restrict_end=${this.formatToday()}&format=json`
                    )
                    .then(response => response.json())
                    .then(
                        response => {
                            this.loading = false;
                            const rows = response.rows.map(singleRow => {
                                return {
                                    name: singleRow[3],
                                    seconds: (singleRow[1] / 60).toFixed()
                                }
                            })
                            this.plans = rows;
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
