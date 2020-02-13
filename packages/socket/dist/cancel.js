import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.array.find-index";
import {replace, remove} from "@jumpn/utils-array";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import "core-js/modules/es6.array.find";
import "core-js/modules/es6.function.name";
import {hasIn, map} from "@jumpn/utils-composite";
import "phoenix";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import {requestToCompat, errorsToString} from "@jumpn/utils-graphql";
import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";

const _this;

const cancel = function cancel(_ref) {
  const activeObservers = _ref.activeObservers;

  var canceledObservers = _ref.canceledObservers;

  var rest = _objectWithoutProperties(_ref, [
    "activeObservers",
    "canceledObservers"
  ]);

  _newArrowCheck(this, _this);

  return _objectSpread({}, rest, {
    isActive: false,
    activeObservers: [],
    canceledObservers: _toConsumableArray(activeObservers).concat(
      _toConsumableArray(canceledObservers)
    )
  });
}.bind(undefined);

const _this$1;

const getNotifier = function getNotifier(handlerName, payload) {
  const _this2 = this;

  _newArrowCheck(this, _this$1);

  return function(observer) {
    _newArrowCheck(this, _this2);

    return observer[handlerName] && observer[handlerName](payload);
  }.bind(this);
}.bind(undefined);

const getHandlerName = function getHandlerName(_ref) {
  const name = _ref.name;

  _newArrowCheck(this, _this$1);

  return "on".concat(name);
}.bind(undefined);

const notifyAll = function notifyAll(observers, event) {
  _newArrowCheck(this, _this$1);

  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
}.bind(undefined);

const _this$2;

const notifyCanceled = function notifyCanceled(notifier, event) {
  _newArrowCheck(this, _this$2);

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

const _this$3;

const createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload,
    name: eventNames.start
  };
}.bind(undefined);

const createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload,
    name: eventNames.result
  };
}.bind(undefined);

const createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload,
    name: eventNames.error
  };
}.bind(undefined);

const createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this$3);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

const createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this$3);

  return {
    payload,
    name: eventNames.abort
  };
}.bind(undefined);

const _this$4;

const clearCanceled = function clearCanceled(notifier) {
  _newArrowCheck(this, _this$4);

  return _objectSpread({}, notifier, {
    canceledObservers: []
  });
}.bind(undefined);

const flushCanceled = function flushCanceled(notifier) {
  _newArrowCheck(this, _this$4);

  return notifier.canceledObservers.length > 0
    ? clearCanceled(notifyCanceled(notifier, createCancelEvent()))
    : notifier;
}.bind(undefined);

const _this$5;

const findIndex = function findIndex(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$5);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

const _this$6;

const refresh = function refresh(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$6);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return replace(
      findIndex(notifiers, "request", notifier.request),
      [notifier],
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$7;

const remove$1 = function remove$$1(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$7);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return remove(
      findIndex(notifiers, "request", notifier.request),
      1,
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$8;

const updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$8);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

const _this$9;

const refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$9);

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

const _this$a;

const getObservers = function getObservers(_ref) {
  const activeObservers = _ref.activeObservers;

  var canceledObservers = _ref.canceledObservers;

  _newArrowCheck(this, _this$a);

  return _toConsumableArray(activeObservers).concat(
    _toConsumableArray(canceledObservers)
  );
}.bind(undefined);

const notify = function notify(notifier, event) {
  _newArrowCheck(this, _this$a);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

const _this$b;

const abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck(this, _this$b);

  return updateNotifiers(
    absintheSocket,
    remove$1(notify(notifier, createAbortEvent(error)))
  );
}.bind(undefined);

const _this$c;

const find = function find(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$c);

  return notifiers.find(hasIn([key], value));
}.bind(undefined);

const _this$d;

const notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$d);

  notifyAll(notifier.activeObservers, event);
  return notifier;
}.bind(undefined);

const _this$e;

const notifyResultEvent = function notifyResultEvent(notifier, result) {
  _newArrowCheck(this, _this$e);

  return notifyActive(notifier, createResultEvent(result));
}.bind(undefined);

const _this$f;

const notifyStartEvent = function notifyStartEvent(notifier) {
  _newArrowCheck(this, _this$f);

  return notifyActive(notifier, createStartEvent(notifier));
}.bind(undefined);

const _this$g;

const reset = function reset(notifier) {
  _newArrowCheck(this, _this$g);

  return flushCanceled(
    _objectSpread({}, notifier, {
      isActive: true,
      requestStatus: requestStatuses.pending,
      subscriptionId: undefined
    })
  );
}.bind(undefined);

const _this$h;

const handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this$h);

  return push
    .receive("ok", handler.onSucceed)
    .receive("error", handler.onError)
    .receive("timeout", handler.onTimeout);
}.bind(undefined);

const _this$i;

const getPushHandlerMethodGetter = function getPushHandlerMethodGetter(
  absintheSocket,
  request
) {
  const _this2 = this;

  _newArrowCheck(this, _this$i);

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
  _newArrowCheck(this, _this$i);

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
  _newArrowCheck(this, _this$i);

  handlePush(
    absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload),
    getPushHandler(absintheSocket, request, notifierPushHandler)
  );
  return absintheSocket;
}.bind(undefined);

const absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

const _this$j;

const createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(
  payload
) {
  _newArrowCheck(this, _this$j);

  return {
    payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

const createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this$j);

  return {
    payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

const _this$k;

const pushAbsintheDocEvent = function pushAbsintheDocEvent(
  absintheSocket,
  _ref,
  notifierPushHandler
) {
  const request = _ref.request;

  _newArrowCheck(this, _this$k);

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
  _newArrowCheck(this, _this$k);

  return refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      requestStatus: requestStatuses.sending
    })
  );
}.bind(undefined);

const createRequestError = function createRequestError(message) {
  _newArrowCheck(this, _this$k);

  const error = new Error("request: ".concat(message));
  error.name = "SocketError";
  return error;
}.bind(undefined);

const createRequestErrorWithResult = function createRequestErrorWithResult(
  message,
  result
) {
  _newArrowCheck(this, _this$k);

  const error = new Error("request: ".concat(message));
  error.name = "SocketError";
  error.result = result;
  return error;
}.bind(undefined);

const onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck(this, _this$k);

  return notifyActive(
    notifier,
    createErrorEvent(createRequestError("timeout"))
  );
}.bind(undefined);

const onError = function onError(absintheSocket, notifier, result) {
  _newArrowCheck(this, _this$k);

  return abortNotifier(
    absintheSocket,
    notifier,
    createRequestErrorWithResult("GraphQL error", result)
  );
}.bind(undefined);

const getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck(this, _this$k);

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
  _newArrowCheck(this, _this$k);

  return pushAbsintheDocEvent(
    absintheSocket,
    setNotifierRequestStatusSending(absintheSocket, notifier),
    getNotifierPushHandler(onSucceed)
  );
}.bind(undefined);

const _this$l;

const onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$l);

  return updateNotifiers(absintheSocket, remove$1(flushCanceled(notifier)));
}.bind(undefined);

const onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$l);

  return subscribe(
    absintheSocket,
    refreshNotifier(absintheSocket, reset(notifier))
  );
}.bind(undefined);

const createUnsubscribeError = function createUnsubscribeError(message) {
  _newArrowCheck(this, _this$l);

  return new Error("unsubscribe: ".concat(message));
}.bind(undefined);

const unsubscribeHandler = {
  onError: function onError$$1(absintheSocket, notifier, errorMessage) {
    _newArrowCheck(this, _this$l);

    return abortNotifier(
      absintheSocket,
      notifier,
      createUnsubscribeError(errorMessage)
    );
  }.bind(undefined),
  onTimeout: function onTimeout(absintheSocket, notifier) {
    _newArrowCheck(this, _this$l);

    return notifyCanceled(
      notifier,
      createErrorEvent(createUnsubscribeError("timeout"))
    );
  }.bind(undefined),
  onSucceed: function onSucceed(absintheSocket, notifier) {
    _newArrowCheck(this, _this$l);

    if (notifier.isActive) {
      onUnsubscribeSucceedActive(absintheSocket, notifier);
    } else {
      onUnsubscribeSucceedCanceled(absintheSocket, notifier);
    }
  }.bind(undefined)
};

const pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(
  absintheSocket,
  _ref
) {
  const request = _ref.request;

  var subscriptionId = _ref.subscriptionId;

  _newArrowCheck(this, _this$l);

  return pushAbsintheEvent(
    absintheSocket,
    request,
    unsubscribeHandler,
    createAbsintheUnsubscribeEvent({
      subscriptionId
    })
  );
}.bind(undefined);

const unsubscribe = function unsubscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  return pushAbsintheUnsubscribeEvent(
    absintheSocket,
    refreshNotifier(
      absintheSocket,
      _objectSpread({}, notifier, {
        requestStatus: requestStatuses.canceling
      })
    )
  );
}.bind(undefined);

const onSubscribeSucceed = function onSubscribeSucceed(
  absintheSocket,
  notifier,
  _ref2
) {
  const subscriptionId = _ref2.subscriptionId;

  _newArrowCheck(this, _this$l);

  const subscribedNotifier = refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      subscriptionId,
      requestStatus: requestStatuses.sent
    })
  );

  if (subscribedNotifier.isActive) {
    notifyStartEvent(subscribedNotifier);
  } else {
    unsubscribe(absintheSocket, subscribedNotifier);
  }
}.bind(undefined);

const onSubscribe = function onSubscribe(absintheSocket, notifier, response) {
  _newArrowCheck(this, _this$l);

  if (response.errors) {
    onError(absintheSocket, notifier, errorsToString(response.errors));
  } else {
    onSubscribeSucceed(absintheSocket, notifier, response);
  }
}.bind(undefined);

var subscribe = function subscribe(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
}.bind(undefined);

const onDataMessage = function onDataMessage(absintheSocket, _ref3) {
  const payload = _ref3.payload;

  _newArrowCheck(this, _this$l);

  const notifier = find(
    absintheSocket.notifiers,
    "subscriptionId",
    payload.subscriptionId
  );

  if (notifier) {
    notifyResultEvent(notifier, payload.result);
  }
}.bind(undefined);

const dataMessageEventName = "subscription:data";

const isDataMessage = function isDataMessage(message) {
  _newArrowCheck(this, _this$l);

  return message.event === dataMessageEventName;
}.bind(undefined);

const _this$m;

const cancelQueryOrMutationSending = function cancelQueryOrMutationSending(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$m);

  return updateNotifiers(
    absintheSocket,
    refresh(flushCanceled(cancel(notifier)))
  );
}.bind(undefined);

const cancelQueryOrMutationIfSending = function cancelQueryOrMutationIfSending(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.sending
    ? cancelQueryOrMutationSending(absintheSocket, notifier)
    : absintheSocket;
}.bind(undefined);

const cancelPending = function cancelPending(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return updateNotifiers(
    absintheSocket,
    remove$1(flushCanceled(cancel(notifier)))
  );
}.bind(undefined);

const cancelQueryOrMutation = function cancelQueryOrMutation(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.pending
    ? cancelPending(absintheSocket, notifier)
    : cancelQueryOrMutationIfSending(absintheSocket, notifier);
}.bind(undefined);

const unsubscribeIfNeeded = function unsubscribeIfNeeded(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.sent
    ? unsubscribe(absintheSocket, notifier)
    : absintheSocket;
}.bind(undefined);

const cancelNonPendingSubscription = function cancelNonPendingSubscription(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$m);

  return unsubscribeIfNeeded(
    absintheSocket,
    refreshNotifier(absintheSocket, cancel(notifier))
  );
}.bind(undefined);

const cancelSubscription = function cancelSubscription(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.requestStatus === requestStatuses.pending
    ? cancelPending(absintheSocket, notifier)
    : cancelNonPendingSubscription(absintheSocket, notifier);
}.bind(undefined);

const cancelActive = function cancelActive(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.operationType === "subscription"
    ? cancelSubscription(absintheSocket, notifier)
    : cancelQueryOrMutation(absintheSocket, notifier);
}.bind(undefined);
/**
 * Cancels a notifier sending a Cancel event to all its observers and
 * unsubscribing in case it holds a subscription request
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * withAbsintheSocket.cancel(absintheSocket, notifier);
 */

let cancel$1 = function cancel$$1(absintheSocket, notifier) {
  _newArrowCheck(this, _this$m);

  return notifier.isActive
    ? cancelActive(absintheSocket, notifier)
    : absintheSocket;
}.bind(undefined);

export default cancel$1;
// # sourceMappingURL=cancel.js.map
