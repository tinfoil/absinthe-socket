

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/web.dom.iterable");
require("core-js/modules/es6.array.for-each");
require("core-js/modules/es6.function.name");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);

const _this;

const getNotifier = function getNotifier(handlerName, payload) {
  const _this2 = this;

  _newArrowCheck(this, _this);

  return function(observer) {
    _newArrowCheck(this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

const getHandlerName = function getHandlerName(_ref) {
  const name = _ref.name;

  _newArrowCheck(this, _this);

  return "on".concat(name);
}.bind(undefined);

const notifyAll = function notifyAll(observers, event) {
  _newArrowCheck(this, _this);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

module.exports = notifyAll;
// # sourceMappingURL=notifyAll.js.map
