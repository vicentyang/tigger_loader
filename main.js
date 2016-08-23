var path = require('path');

module.exports = function (context) {
  var cptName = path.basename(this.resource, '.ts').replace('_lc', '');
  return context + `
    declare var module;
    declare var require;
    var _laya = require('laya').default;
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(function(data) {
            _laya.cancelComponent('${cptName}');
            setTimeout(function() {
                _laya.rebuildSence();
            }, 48);
        });
    }
  `
}
