import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";

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

const _this$1;

const notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$1);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

export default notifyActive;
// # sourceMappingURL=notifyActive.js.map
