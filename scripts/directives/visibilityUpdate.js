(function(root) {
    root.visibilityUpdate = {
        bind(el, binding, vnode) {
            let lastUpdate = Date.now();
            const updateFunction = vnode.componentInstance.updateData;
            updateFunction();
            document.addEventListener('visibilitychange', function() {
                const timeSinceLastUpdate =
                    Math.abs(lastUpdate - Date.now()) / 1000;
                if (timeSinceLastUpdate > 120) {
                    updateFunction(true);
                    lastUpdate = Date.now();
                }
            });
        }
    };
})(this || (typeof window !== 'undefined' ? window : global));
