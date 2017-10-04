const template = `
        <dashCard :updateData="updateData" :hideTime="hideTime">
            <div  class="pa2">
                <span v-for="type in types" class="ph1">
                    <button :class="'f6 lh-cop ' + (selectedTypes.includes(type) ? 'b': '')" @click='processToggleFilter(type)'>{{type}}</button>
                </span>
            </div>
            <div v-if="!files.length && !loading">
                <div class="fw1 tc v-mid pa5 o-30">
                    no data
                </div>
            </div>
            <div v-if="files">
                <div v-if="loading" class="loader"></div>
                <div v-for="file in filteredFiles" class="f6 lh-cop bb b--black-05 pv3">
                    <a @click="openFile(file)">{{file}}</a>
                </div>
            </div>
        </dashCard>
    `;

const changedFilesList = {
    data() {
        return {
            files: [],
            loading: false,
            selectedTypes: []
        };
    },
    props: {
        hideTime: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        types() {
            return [
                ...new Set(
                    this.files.map(singlePlan => {
                        return singlePlan.split('.').pop();
                    })
                )
            ];
        },
        filteredFiles() {
            if (!this.selectedTypes.length) {
                return this.files;
            }

            return this.files.filter(singleFile => {
                return this.selectedTypes.some(singleType => {
                    return singleFile.includes(singleType);
                });
            });
        }
    },
    methods: {
        openFile(fileName) {
            new Image().src = `${this
                .$localIp}:7288/openeditor?options='/Users/dikunin/Projects/avito/${fileName}'`;
        },
        processToggleFilter(type) {
            if (this.selectedTypes.includes(type)) {
                this.selectedTypes = this.selectedTypes.filter(
                    singleValue => singleValue !== type
                );
            } else {
                this.selectedTypes = this.selectedTypes.concat([type]);
            }
        },
        updateData() {
            this.files = [];
            this.loading = true;
            this.$http
                .get(
                    this.$localIp +
                        ':4949/command/_Users_dikunin_Projects_work-calendar-exchange_changed-files'
                )
                .then(
                    response => {
                        this.loading = false;
                        this.files =
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

export default changedFilesList;
