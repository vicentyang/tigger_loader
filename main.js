module.exports = function (context) {
  var cptName = this.resource.match(/\\([A-Z]\w+)LayaComponent.ts$/)[1];
  return context + `
    declare var module;
    declare var require;
    var app = require('../ctrl/ApplicationOut.ts').default;
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(function(data) {
            app.clearCptAllData('Spin');
            var vm = app.componentDataMap;
            var cl = new Map();
            var keys = vm.keys();
            var next;
            while (next = keys.next(), !next.done) {
                var ineMap = vm.get(next.value);
                var ineRet = new Map();
                var ineKeys = ineMap.keys();
                var ineNext;
                var i = 0;
                while (ineNext = ineKeys.next(), !ineNext.done) {
                    ineRet.set(i++, ineMap.get(ineNext.value));
                }
                cl.set(next.value, ineRet);
            }
            setTimeout(() => {
                app.buildSence('Preload', app.sence.get('Preload'), cl, ['Spin']);
            }, 32);
        });
    }
  `
}
