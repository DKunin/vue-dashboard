(function(root) {
    const template = `
        <dashCard :updateData="updateData" :hideTime="true" :half="half">
            <div v-if="!plans && !loading">
                <div class="tc v-mid pa5 o-30">
                    No data
                </div>
            </div>
            <div v-if="plans">
                <div v-for="file in plans" class="f5 lh-cop bb b--black-05 pv3">
                    {{file}}
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
            }
        },
        data: () => ({
            plans: [],
            times: [],
            loading: false
        }),
        methods: {
            updateData: function() {
                this.plans = [];
                this.loading = true;
                this.$http
                    .get(
                        'https://allow-any-origin.appspot.com/https://www.rescuetime.com/anapi/data?&key=&perspective=interval&restrict_kind=efficiency&interval=hour&restrict_begin=2017-03-27&restrict_end=2017-03-27&format=json'
                    )
                    .then(response => response.json())
                    .then(
                        response => {
                            this.loading = false;
                            console.log(response);
                            this.plans = [];
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
