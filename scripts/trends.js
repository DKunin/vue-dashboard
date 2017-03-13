(function(root) {
    const template = `
        <dashCard :updateData="updateData">
        </dashCard>
    `;

    root.trends = {
        data: () => ({
            plans: [],
            loading: false
        }),
        methods: {
            updateData: function() {
                this.plans = [];
                this.loading = false;
            }
        },
        mounted: function() {
            this.updateData();
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
