var path = require('path');

module.exports = function (context) {
  var cptName = path.basename(this.resource, '.ts');
  var component = /@component/.test(context);
  var sence = /@sence/.test(context);
  if (component === true || sence === true) {
      return context + `
        declare var module;
        declare var require;
        var _laya = require('tigger_laya').default;
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
  } else {
      return context + `
        declare var module;
        declare var require;
        var _laya = require('tigger_laya').default;
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(function(data) {
                setTimeout(function() {
                    _laya.rebuildSence();
                }, 48);
            });
        }
      `
  }
}
