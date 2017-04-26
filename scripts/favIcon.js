(function(root) {
    const template = `
        <noscript style="display:none">
           <svg ref="svg" id="arrow-right.svg" xmlns="http://www.w3.org/2000/svg" :width='width' :height='height' :viewBox="'0 0 ' + height + ' ' + width">
                <text
                    :fill="fill"
                    :x="width/2"
                    :y="height - 3"
                    text-anchor="middle"
                    font-family="Helvetica"
                    font-size="18">
                    {{text}}
                </text>
            </svg>
            <canvas ref='canvas' :width='width' :height='height'/>
        </noscript>
    `;

    root.favIcon = {
        props: {
            width: {
                type: Number,
                default: 20
            },
            height: {
                type: Number,
                default: 20
            },
            fill: {
                type: String,
                default: 'black'
            },
            text: {
                type: String,
                default: '-'
            }
        },
        mounted: function() {
            let markup = new XMLSerializer().serializeToString(this.$refs.svg);
            let encoded = 'data:image/svg+xml;base64,' + btoa(markup);
            const img = document.createElement('img');
            img.src = encoded
            img.onload = () => {
                this.$refs.canvas.getContext('2d').drawImage(img, 0, 0)
                let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = this.$refs.canvas.toDataURL();
                document.getElementsByTagName('head')[0].appendChild(link);
            }
        },
        template
    };
})(this || (typeof window !== 'undefined' ? window : global));
