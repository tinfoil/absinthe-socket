

Object.defineProperty(exports, "__esModule", {value: true});

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.array.find-index");
require("core-js/modules/es6.array.find");
require("core-js/modules/es6.function.name");
const utilsComposite = require("@jumpn/utils-composite");
require("phoenix");
require("core-js/modules/web.dom.iterable");
require("core-js/modules/es6.array.for-each");
const _toConsumableArray = _interopDefault(
  require("@babel/runtime/helpers/toConsumableArray")
);
const utilsGraphql = require("@jumpn/utils-graphql");
const Observable = _interopDefault(require("zen-observable"));
require("core-js/modules/es7.array.includes");
require("core-js/modules/es6.string.includes");
const _objectSpread = _interopDefault(
  require("@babel/runtime/helpers/objectSpread")
);
const _objectWithoutProperties = _interopDefault(
  require("@babel/runtime/helpers/objectWithoutProperties")
);
require("core-js/modules/es6.array.index-of");
const utilsArray = require("@jumpn/utils-array");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);

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

  return notifiers.findIndex(utilsComposite.hasIn([key], value));
}.bind(undefined);

const _this$6;

const refresh = function refresh(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$6);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return utilsArray.replace(
      findIndex(notifiers, "request", notifier.request),
      [notifier],
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$7;

const remove = function remove(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$7);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return utilsArray.remove(
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
    remove(notify(notifier, createAbortEvent(error)))
  );
}.bind(undefined);

const _this$c;

const find = function find(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$c);

  return notifiers.find(utilsComposite.hasIn([key], value));
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

  return utilsComposite.map(
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
    createAbsintheDocEvent(utilsGraphql.requestToCompat(request))
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

  return updateNotifiers(absintheSocket, remove(flushCanceled(notifier)));
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
    onError(
      absintheSocket,
      notifier,
      utilsGraphql.errorsToString(response.errors)
    );
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
    remove(flushCanceled(cancel(notifier)))
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

const _this$n;

const setNotifierRequestStatusSent = function setNotifierRequestStatusSent(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$n);

  return refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      requestStatus: requestStatuses.sent
    })
  );
}.bind(undefined);

const onQueryOrMutationSucceed = function onQueryOrMutationSucceed(
  absintheSocket,
  notifier,
  response
) {
  _newArrowCheck(this, _this$n);

  return updateNotifiers(
    absintheSocket,
    remove(
      notifyResultEvent(
        setNotifierRequestStatusSent(absintheSocket, notifier),
        response
      )
    )
  );
}.bind(undefined);

const pushQueryOrMutation = function pushQueryOrMutation(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$n);

  return pushRequestUsing(
    absintheSocket,
    notifyStartEvent(notifier),
    onQueryOrMutationSucceed
  );
}.bind(undefined);

const pushRequest = function pushRequest(absintheSocket, notifier) {
  _newArrowCheck(this, _this$n);

  if (notifier.operationType === "subscription") {
    subscribe(absintheSocket, notifier);
  } else {
    pushQueryOrMutation(absintheSocket, notifier);
  }
}.bind(undefined);

const _this$o;

const createChannelJoinError = function createChannelJoinError(message) {
  _newArrowCheck(this, _this$o);

  return new Error("channel join: ".concat(message));
}.bind(undefined);

const notifyErrorToAllActive = function notifyErrorToAllActive(
  absintheSocket,
  errorMessage
) {
  const _this2 = this;

  _newArrowCheck(this, _this$o);

  return absintheSocket.notifiers.forEach(
    (notifier) => {
      _newArrowCheck(this, _this2);

      return notifyActive(
        notifier,
        createErrorEvent(createChannelJoinError(errorMessage))
      );
    }
  );
}.bind(undefined); // join Push is reused and so the handler
// https://github.com/phoenixframework/phoenix/blob/master/assets/js/phoenix.js#L356

let createChannelJoinHandler = function createChannelJoinHandler(
  absintheSocket
) {
  const _this3 = this;

  _newArrowCheck(this, _this$o);

  return {
    onError: function onError(errorMessage) {
      _newArrowCheck(this, _this3);

      return notifyErrorToAllActive(absintheSocket, errorMessage);
    }.bind(this),
    onSucceed: function onSucceed() {
      const _this4 = this;

      _newArrowCheck(this, _this3);

      return absintheSocket.notifiers.forEach(
        (notifier) => {
          _newArrowCheck(this, _this4);

          return pushRequest(absintheSocket, notifier);
        }
      );
    }.bind(this),
    onTimeout: function onTimeout() {
      _newArrowCheck(this, _this3);

      return notifyErrorToAllActive(absintheSocket, "timeout");
    }.bind(this)
  };
}.bind(undefined);

const joinChannel = function joinChannel(absintheSocket) {
  _newArrowCheck(this, _this$o);

  handlePush(
    absintheSocket.channel.join(),
    createChannelJoinHandler(absintheSocket)
  );
  absintheSocket.channelJoinCreated = true;
  return absintheSocket;
}.bind(undefined);

const _this$p;

const onMessage = function onMessage(absintheSocket) {
  const _this2 = this;

  _newArrowCheck(this, _this$p);

  return function(message) {
    _newArrowCheck(this, _this2);

    if (isDataMessage(message)) {
      onDataMessage(absintheSocket, message);
    }
  }.bind(this);
}.bind(undefined);

const createConnectionCloseError = function createConnectionCloseError() {
  _newArrowCheck(this, _this$p);

  return new Error("connection: close");
}.bind(undefined);

const notifyConnectionCloseError = function notifyConnectionCloseError(notifier) {
  _newArrowCheck(this, _this$p);

  return notify(notifier, createErrorEvent(createConnectionCloseError()));
}.bind(undefined);

const notifierOnConnectionCloseCanceled = function notifierOnConnectionCloseCanceled(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$p);

  return updateNotifiers(
    absintheSocket,
    remove(notifyConnectionCloseError(notifier))
  );
}.bind(undefined);

const notifierOnConnectionCloseActive = function notifierOnConnectionCloseActive(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$p);

  if (notifier.operationType === "mutation") {
    abortNotifier(absintheSocket, notifier, createConnectionCloseError());
  } else {
    refreshNotifier(
      absintheSocket,
      reset(notifyConnectionCloseError(notifier))
    );
  }
}.bind(undefined);

const notifierOnConnectionClose = function notifierOnConnectionClose(
  absintheSocket
) {
  const _this3 = this;

  _newArrowCheck(this, _this$p);

  return function(notifier) {
    _newArrowCheck(this, _this3);

    if (notifier.isActive) {
      notifierOnConnectionCloseActive(absintheSocket, notifier);
    } else {
      notifierOnConnectionCloseCanceled(absintheSocket, notifier);
    }
  }.bind(this);
}.bind(undefined);

const onConnectionClose = function onConnectionClose(absintheSocket) {
  const _this4 = this;

  _newArrowCheck(this, _this$p);

  return function() {
    _newArrowCheck(this, _this4);

    return absintheSocket.notifiers.forEach(
      notifierOnConnectionClose(absintheSocket)
    );
  }.bind(this);
}.bind(undefined);

const shouldJoinChannel = function shouldJoinChannel(absintheSocket) {
  _newArrowCheck(this, _this$p);

  return (
    !absintheSocket.channelJoinCreated && absintheSocket.notifiers.length > 0
  );
}.bind(undefined);

const onConnectionOpen = function onConnectionOpen(absintheSocket) {
  const _this5 = this;

  _newArrowCheck(this, _this$p);

  return function() {
    _newArrowCheck(this, _this5);

    if (shouldJoinChannel(absintheSocket)) {
      joinChannel(absintheSocket);
    }
  }.bind(this);
}.bind(undefined);

const absintheChannelName = "__absinthe__:control";
/**
 * Creates an Absinthe Socket using the given Phoenix Socket instance
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 * import {Socket as PhoenixSocket} from "phoenix";

 * const absintheSocket = withAbsintheSocket.create(
 *   new PhoenixSocket("ws://localhost:4000/socket")
 * );
 */

const create = function create(phoenixSocket) {
  _newArrowCheck(this, _this$p);

  const absintheSocket = {
    phoenixSocket,
    channel: phoenixSocket.channel(absintheChannelName),
    channelJoinCreated: false,
    notifiers: []
  };
  phoenixSocket.onOpen(onConnectionOpen(absintheSocket));
  phoenixSocket.onClose(onConnectionClose(absintheSocket));
  phoenixSocket.onMessage(onMessage(absintheSocket));
  return absintheSocket;
}.bind(undefined);

const _this$q;

const observe = function observe(_ref, observer) {
  const activeObservers = _ref.activeObservers;

  var rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this$q);

  return _objectSpread({}, rest, {
    activeObservers: _toConsumableArray(activeObservers).concat([observer]),
    isActive: true
  });
}.bind(undefined);

const _this$r;

/**
 * Observes given notifier using the provided observer
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket"
 *
 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
 *
 * const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
 *   onAbort: logEvent("abort"),
 *   onError: logEvent("error"),
 *   onStart: logEvent("open"),
 *   onResult: logEvent("result")
 * });
 */
const observe$1 = function observe$$1(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this$r);

  return refreshNotifier(absintheSocket, observe(notifier, observer));
}.bind(undefined);

const _this$s;

const createUsing = function createUsing(request, operationType) {
  _newArrowCheck(this, _this$s);

  return {
    operationType,
    request,
    activeObservers: [],
    canceledObservers: [],
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  };
}.bind(undefined);

const create$1 = function create(request) {
  _newArrowCheck(this, _this$s);

  return createUsing(request, utilsGraphql.getOperationType(request.operation));
}.bind(undefined);

const _this$t;

const reactivate = function reactivate(notifier) {
  _newArrowCheck(this, _this$t);

  return notifier.isActive
    ? notifier
    : _objectSpread({}, notifier, {
        isActive: true
      });
}.bind(undefined);

const _this$u;

const connectOrJoinChannel = function connectOrJoinChannel(absintheSocket) {
  _newArrowCheck(this, _this$u);

  if (absintheSocket.phoenixSocket.isConnected()) {
    joinChannel(absintheSocket);
  } else {
    // socket ignores connect calls if a connection has already been created
    absintheSocket.phoenixSocket.connect();
  }
}.bind(undefined);

const sendNew = function sendNew(absintheSocket, request) {
  _newArrowCheck(this, _this$u);

  const notifier = create$1(request);
  updateNotifiers(absintheSocket, utilsArray.append([notifier]));

  if (absintheSocket.channelJoinCreated) {
    pushRequest(absintheSocket, notifier);
  } else {
    connectOrJoinChannel(absintheSocket);
  }

  return notifier;
}.bind(undefined);

const updateCanceledReactivate = function updateCanceledReactivate(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$u);

  return refreshNotifier(absintheSocket, reactivate(notifier));
}.bind(undefined);

const updateCanceled = function updateCanceled(absintheSocket, notifier) {
  _newArrowCheck(this, _this$u);

  return notifier.requestStatus === requestStatuses.sending
    ? updateCanceledReactivate(absintheSocket, flushCanceled(notifier))
    : updateCanceledReactivate(absintheSocket, notifier);
}.bind(undefined);

const updateIfCanceled = function updateIfCanceled(absintheSocket, notifier) {
  _newArrowCheck(this, _this$u);

  return notifier.isActive
    ? notifier
    : updateCanceled(absintheSocket, notifier);
}.bind(undefined);

const getExistentIfAny = function getExistentIfAny(absintheSocket, request) {
  _newArrowCheck(this, _this$u);

  const notifier = find(absintheSocket.notifiers, "request", request);
  return notifier && updateIfCanceled(absintheSocket, notifier);
}.bind(undefined);
/**
 * Sends given request and returns an object (notifier) to track its progress
 * (see observe function)
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * const operation = `
 *   subscription userSubscription($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * // This example uses a subscription, but the functionallity is the same for
 * // all operation types (queries, mutations and subscriptions)
 *
 * const notifier = withAbsintheSocket.send(absintheSocket, {
 *   operation,
 *   variables: {userId: 10}
 * });
 */

const send = function send(absintheSocket, request) {
  _newArrowCheck(this, _this$u);

  return (
    getExistentIfAny(absintheSocket, request) ||
    sendNew(absintheSocket, request)
  );
}.bind(undefined);

const _this$v;

// prettier-ignore
const getUnsubscriber = function getUnsubscriber(absintheSocket, _ref, observer, unsubscribe) {
  const _this2 = this;

  const request = _ref.request;

  _newArrowCheck(this, _this$v);

  return function () {
    _newArrowCheck(this, _this2);

    const notifier = find(absintheSocket.notifiers, "request", request);
    unsubscribe(absintheSocket, notifier, notifier ? observer : undefined);
  }.bind(this);
}.bind(undefined);

const onResult = function onResult(_ref2, observableObserver) {
  const _this3 = this;

  const operationType = _ref2.operationType;

  _newArrowCheck(this, _this$v);

  return function(result) {
    _newArrowCheck(this, _this3);

    observableObserver.next(result);

    if (operationType !== "subscription") {
      observableObserver.complete();
    }
  }.bind(this);
}.bind(undefined);

const createObserver = function createObserver(
  notifier,
  handlers,
  observableObserver
) {
  _newArrowCheck(this, _this$v);

  return _objectSpread({}, handlers, {
    onAbort: observableObserver.error.bind(observableObserver),
    onResult: onResult(notifier, observableObserver)
  });
}.bind(undefined);
/**
 * Creates an Observable that will follow the given notifier
 *
 * @param {AbsintheSocket} absintheSocket
 * @param {Notifier<Result, Variables>} notifier
 * @param {Object} [options]
 * @param {function(error: Error): undefined} [options.onError]
 * @param {function(notifier: Notifier<Result, Variables>): undefined} [options.onStart]
 * @param {function(): undefined} [options.unsubscribe]
 *
 * @return {Observable}
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * const unobserveOrCancelIfNeeded = (absintheSocket, notifier, observer) => {
 *   if (notifier && observer) {
 *     withAbsintheSocket.unobserveOrCancel(absintheSocket, notifier, observer);
 *   }
 * };
 *
 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
 *
 * const observable = withAbsintheSocket.toObservable(absintheSocket, notifier, {
 *   onError: logEvent("error"),
 *   onStart: logEvent("open"),
 *   unsubscribe: unobserveOrCancelIfNeeded
 * });
 */

let toObservable = function toObservable(absintheSocket, notifier) {
  const _this4 = this;

  const _ref3 =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var unsubscribe = _ref3.unsubscribe;

  var handlers = _objectWithoutProperties(_ref3, ["unsubscribe"]);

  _newArrowCheck(this, _this$v);

  return new Observable(
    ((observableObserver) => {
      _newArrowCheck(this, _this4);

      let observer = createObserver(notifier, handlers, observableObserver);
      observe$1(absintheSocket, notifier, observer);
      return (
        unsubscribe &&
        getUnsubscriber(absintheSocket, notifier, observer, unsubscribe)
      );
    })
  );
}.bind(undefined);

const _this$w;

const removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck(this, _this$w);

  return utilsArray.remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

const unobserve = function unobserve(_ref, observer) {
  const activeObservers = _ref.activeObservers;

  var rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this$w);

  return _objectSpread({}, rest, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

const _this$x;

const ensureHasActiveObserver = function ensureHasActiveObserver(
  notifier,
  observer
) {
  _newArrowCheck(this, _this$x);

  if (notifier.activeObservers.includes(observer)) return notifier;
  throw new Error("Observer is not attached to notifier");
}.bind(undefined);
/**
 * Detaches observer from notifier
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
 */

let unobserve$1 = function unobserve$$1(absintheSocket, notifier, observer) {
  _newArrowCheck(this, _this$x);

  return updateNotifiers(
    absintheSocket,
    refresh(unobserve(ensureHasActiveObserver(notifier, observer), observer))
  );
}.bind(undefined);

const _this$y;

const doUnobserveOrCancel = function doUnobserveOrCancel(
  absintheSocket,
  notifier,
  observer
) {
  _newArrowCheck(this, _this$y);

  return notifier.activeObservers.length === 1
    ? cancel$1(absintheSocket, notifier)
    : unobserve$1(absintheSocket, notifier, observer);
}.bind(undefined);
/**
 * Cancels notifier if there are no more observers apart from the one given, or
 * detaches given observer from notifier otherwise
 *
 * @example
 * import * as withAbsintheSocket from "@absinthe/socket";
 *
 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
 */

let unobserveOrCancel = function unobserveOrCancel(
  absintheSocket,
  notifier,
  observer
) {
  _newArrowCheck(this, _this$y);

  return notifier.isActive
    ? doUnobserveOrCancel(absintheSocket, notifier, observer)
    : absintheSocket;
}.bind(undefined);

exports.cancel = cancel$1;
exports.create = create;
exports.observe = observe$1;
exports.send = send;
exports.toObservable = toObservable;
exports.unobserve = unobserve$1;
exports.unobserveOrCancel = unobserveOrCancel;
// # sourceMappingURL=index.js.map
