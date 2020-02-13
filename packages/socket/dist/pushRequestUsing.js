import _objectSpread from "@babel/runtime/helpers/objectSpread";
import {requestToCompat} from "@jumpn/utils-graphql";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.array.find-index";
import "core-js/modules/es6.function.name";
import "phoenix";
import "core-js/modules/es6.array.find";
import {hasIn, map} from "@jumpn/utils-composite";
import {remove, replace} from "@jumpn/utils-array";
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

const getObservers = function getObservers(_ref) {
  const activeObservers = _ref.activeObservers;

  var canceledObservers = _ref.canceledObservers;

  _newArrowCheck(this, _this$1);

  return _toConsumableArray(activeObservers).concat(
    _toConsumableArray(canceledObservers)
  );
}.bind(undefined);

const notify = function notify(notifier, event) {
  _newArrowCheck(this, _this$1);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

const _this$2;

const findIndex = function findIndex(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$2);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

const _this$3;

const remove$1 = function remove$$1(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$3);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return remove(
      findIndex(notifiers, "request", notifier.request),
      1,
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$4;

const updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$4);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

const eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

const _this$5;

const createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.start
  };
}.bind(undefined);

const createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.result
  };
}.bind(undefined);

const createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.error
  };
}.bind(undefined);

const createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$5);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

const createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$5);

  return {
    payload,
    name: eventNames.abort
  };
}.bind(undefined);

const _this$6;

const abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck(this, _this$6);

  return updateNotifiers(
    absintheSocket,
    remove$1(notify(notifier, createAbortEvent(error)))
  );
}.bind(undefined);

const _this$7;

const notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$7);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

const _this$8;

const handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this$8);

  return push
    .receive("ok", handler.onSucceed)
    .receive("error", handler.onError)
    .receive("timeout", handler.onTimeout);
}.bind(undefined);

const _this$9;

const find = function find(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$9);

  return notifiers.find(hasIn([key], value));
}.bind(undefined);

const _this$a;

const getPushHandlerMethodGetter = function getPushHandlerMethodGetter(
  absintheSocket,
  request
) {
  const _this2 = this;

  _newArrowCheck(this, _this$a);

  return function(handle) {
    const _this3 = this;

    _newArrowCheck(this, _this2);

    return function() {
      _newArrowCheck(this, _this3);

      const notifier = find(absintheSocket.notifiers, "request", request);

      if (notifier) {
        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        handle(...[absintheSocket, notifier].concat(args));
      }
    }.bind(this);
  }.bind(this);
}.bind(undefined);

const getPushHandler = function getPushHandler(
  absintheSocket,
  request,
  notifierPushHandler
) {
  _newArrowCheck(this, _this$a);

  return map(
    getPushHandlerMethodGetter(absintheSocket, request),
    notifierPushHandler
  );
}.bind(undefined);

const pushAbsintheEvent = function pushAbsintheEvent(
  absintheSocket,
  request,
  notifierPushHandler,
  absintheEvent
) {
  _newArrowCheck(this, _this$a);

  handlePush(
    absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload),
    getPushHandler(absintheSocket, request, notifierPushHandler)
  );
  return absintheSocket;
}.bind(undefined);

const _this$b;

const refresh = function refresh(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$b);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return replace(
      findIndex(notifiers, "request", notifier.request),
      [notifier],
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$c;

const refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$c);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

const requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

const absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

const _this$d;

const createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(
  payload
) {
  _newArrowCheck(this, _this$d);

  return {
    payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

const createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this$d);

  return {
    payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

const _this$e;

const pushAbsintheDocEvent = function pushAbsintheDocEvent(
  absintheSocket,
  _ref,
  notifierPushHandler
) {
  const request = _ref.request;

  _newArrowCheck(this, _this$e);

  return pushAbsintheEvent(
    absintheSocket,
    request,
    notifierPushHandler,
    createAbsintheDocEvent(requestToCompat(request))
  );
}.bind(undefined);

const setNotifierRequestStatusSending = function setNotifierRequestStatusSending(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$e);

  return refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      requestStatus: requestStatuses.sending
    })
  );
}.bind(undefined);

const createRequestError = function createRequestError(message) {
  _newArrowCheck(this, _this$e);

  const error = new Error("request: ".concat(message));
  error.name = "SocketError";
  return error;
}.bind(undefined);

const createRequestErrorWithResult = function createRequestErrorWithResult(
  message,
  result
) {
  _newArrowCheck(this, _this$e);

  const error = new Error("request: ".concat(message));
  error.name = "SocketError";
  error.result = result;
  return error;
}.bind(undefined);

const onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck(this, _this$e);

  return notifyActive(
    notifier,
    createErrorEvent(createRequestError("timeout"))
  );
}.bind(undefined);

const onError = function onError(absintheSocket, notifier, result) {
  _newArrowCheck(this, _this$e);

  return abortNotifier(
    absintheSocket,
    notifier,
    createRequestErrorWithResult("GraphQL error", result)
  );
}.bind(undefined);

const getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck(this, _this$e);

  return {
    onError,
    onSucceed,
    onTimeout
  };
}.bind(undefined);

const pushRequestUsing = function pushRequestUsing(
  absintheSocket,
  notifier,
  onSucceed
) {
  _newArrowCheck(this, _this$e);

  return pushAbsintheDocEvent(
    absintheSocket,
    setNotifierRequestStatusSending(absintheSocket, notifier),
    getNotifierPushHandler(onSucceed)
  );
}.bind(undefined);

export default pushRequestUsing;
export {onError};
// # sourceMappingURL=pushRequestUsing.js.map
