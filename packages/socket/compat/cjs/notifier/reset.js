

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

const _objectSpread = _interopDefault(
  require("@babel/runtime/helpers/objectSpread")
);
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

const _this$1;

const notifyCanceled = function notifyCanceled(notifier, event) {
  _newArrowCheck(this, _this$1);

  notifyAll(notifier.canceledObservers, event);
  return notifier;
}.bind(undefined);

const eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

const _this$2;

const createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload,
    name: eventNames.start
  };
}.bind(undefined);

const createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload,
    name: eventNames.result
  };
}.bind(undefined);

const createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload,
    name: eventNames.error
  };
}.bind(undefined);

const createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$2);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

const createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$2);

  return {
    payload,
    name: eventNames.abort
  };
}.bind(undefined);

const _this$3;

const clearCanceled = function clearCanceled(notifier) {
  _newArrowCheck(this, _this$3);

  return _objectSpread({}, notifier, {
    canceledObservers: []
  });
}.bind(undefined);

const flushCanceled = function flushCanceled(notifier) {
  _newArrowCheck(this, _this$3);

  return notifier.canceledObservers.length > 0
    ? clearCanceled(notifyCanceled(notifier, createCancelEvent()))
    : notifier;
}.bind(undefined);

const requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

const _this$4;

const reset = function reset(notifier) {
  _newArrowCheck(this, _this$4);

  return flushCanceled(
    _objectSpread({}, notifier, {
      isActive: true,
      requestStatus: requestStatuses.pending,
      subscriptionId: undefined
    })
  );
}.bind(undefined);

module.exports = reset;
// # sourceMappingURL=reset.js.map
