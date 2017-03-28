(function(root) {
    const template = `
        <dashCard :updateData="updateData" :hideTime="true" :half="half">
            <div v-if="!plans && !loading">
                <div class="tc v-mid pa5 o-30">
                    No data
                </div>
            </div>
            <div v-if="plans">
                <svg class="pv2" width="100%" height="50" viewBox="0 0 200 80" preserveAspectRatio="none">
                    <rect style="fill: #2980b9;" v-for="(singleKey, index) in order" :y="18 * index" x="0" height="14px" :width="(plans[singleKey + '_percent'] || 0) + '%'" />
                </svg>
                <div v-for="singleKey in order" class="f5 lh-cop bb b--black-05 pv3">
                    {{singleKey}} <span class="fr">{{plans[singleKey]}}</span>
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
            plans: {},
            times: [],
            order: [
                'very distracting',
                'distracting',
                'neutral',
                'productive',
                'very productive'
            ],
            loading: false
        }),
        methods: {
            formatToday() {
                const today = new Date();
                return `${today.getFullYear()}-${today.getMonth() +
                    1}-${today.getDate()}`;
            },
            formatTime(sec_num) {
                let hours = Math.floor(sec_num / 3600);
                let minutes = Math.floor((sec_num - hours * 3600) / 60);
                let seconds = sec_num - hours * 3600 - minutes * 60;

                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                return hours + ':' + minutes + ':' + seconds;
            },
            processName(name) {
                return name.toLowerCase().replace(' time', '');
            },
            timeToPercent(time, max) {
                return (time * 100 / max).toFixed();
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
                                    name: this.processName(singleRow[3]),
                                    time: this.formatTime(singleRow[1])
                                };
                            });
                            const time = response.rows.map(singleRow => {
                                return singleRow[1];
                            });
                            const max = time[0];
                            const singleObj = response.rows.reduce(
                                (newObj, singleItem) => {
                                    return Object.assign(newObj, {
                                        [this.processName(
                                            singleItem[3]
                                        )]: this.formatTime(singleItem[1]),
                                        [this.processName(singleItem[3]) +
                                            '_percent']: this.timeToPercent(
                                            singleItem[1],
                                            max
                                        )
                                    });
                                },
                                {}
                            );
                            console.log(JSON.stringify(singleObj));
                            this.plans = singleObj;
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
