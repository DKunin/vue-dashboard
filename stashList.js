(function(root) {
    root['stashList'] = {
        props: { requests: { type: Array, default: [] } },
        methods: {
            articleClass: function(request) {
                return [
                    'fl br3 pa3 ma1 ba b--black-10',
                    {
                        'o-30': request.title.indexOf('WIP') !== -1,
                        'bg-white': request.mine,
                        'bg-light-gray': !request.mine
                    }
                ];
            },
            processTitle: function(title) {
                const withoutNumber = title.replace(/^\w{4}-\d+\W/, '');
                if (withoutNumber.length < 40) {
                    return withoutNumber;
                }
                return withoutNumber.slice(0, 40) + '...';
            }
        },
        template: `
            <div>
                <div v-if="!requests.length" class="loader">Loader</div>
                <article
                    :class="articleClass(request)"
                    v-for="request in requests"
                    style="height: 240px;max-width: 160px;">

                    <div v-bind:class="[{ 'bg-dark-red': request.mergability.conflicted, 'bg-dark-green': !request.mergability.conflicted }, 'db br3 ph3 pv2 mb2 white']"> </div>
                    <div>
                        <a class="link black" :href='request.links.self[0].href' target="_blank">{{processTitle(request.title)}}...</a>
                    </div>
                    <hr class="mw3 bb bw1 b--black-10">
                    <div
                        v-for="reviewer in request.reviewers"
                        v-bind:class="[{ 'bg-dark-green': reviewer.approved, 'bg-dark-red': !reviewer.approved }, 'dib fl br3 pa1 tc mr1 mb1 white']" title="{{reviewer.user.name}}">{{reviewer.user.slug}}</div>
                </article>
            </div>
      `
    };
})(this);
