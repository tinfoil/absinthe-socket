

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("phoenix");
require("core-js/modules/web.dom.iterable");
require("core-js/modules/es6.array.for-each");
require("core-js/modules/es6.array.find-index");
const _toConsumableArray = _interopDefault(
  require("@babel/runtime/helpers/toConsumableArray")
);
require("core-js/modules/es6.function.name");
require("core-js/modules/es6.array.find");
const utilsComposite = require("@jumpn/utils-composite");
const utilsArray = require("@jumpn/utils-array");
const utilsGraphql = require("@jumpn/utils-graphql");
const _objectSpread = _interopDefault(
  require("@babel/runtime/helpers/objectSpread")
);
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);

const _this;

const handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this);

  return push
    .receive("ok", handler.onSucceed)
    .receive("error", handler.onError)
    .receive("timeout", handler.onTimeout);
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

const notifyActive = function notifyActive(notifier, event) {
  _newArrowCheck(this, _this$2);

  notifyAll(notifier.activeObservers, event);
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

const notifyResultEvent = function notifyResultEvent(notifier, result) {
  _newArrowCheck(this, _this$4);

  return notifyActive(notifier, createResultEvent(result));
}.bind(undefined);

const _this$5;

const notifyStartEvent = function notifyStartEvent(notifier) {
  _newArrowCheck(this, _this$5);

  return notifyActive(notifier, createStartEvent(notifier));
}.bind(undefined);

const _this$6;

const findIndex = function findIndex(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$6);

  return notifiers.findIndex(utilsComposite.hasIn([key], value));
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

const getObservers = function getObservers(_ref) {
  const activeObservers = _ref.activeObservers;

  var canceledObservers = _ref.canceledObservers;

  _newArrowCheck(this, _this$8);

  return _toConsumableArray(activeObservers).concat(
    _toConsumableArray(canceledObservers)
  );
}.bind(undefined);

const notify = function notify(notifier, event) {
  _newArrowCheck(this, _this$8);

  notifyAll(getObservers(notifier), event);
  return notifier;
}.bind(undefined);

const _this$9;

const updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$9);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

const _this$a;

const abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
  _newArrowCheck(this, _this$a);

  return updateNotifiers(
    absintheSocket,
    remove(notify(notifier, createAbortEvent(error)))
  );
}.bind(undefined);

const _this$b;

const find = function find(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$b);

  return notifiers.find(utilsComposite.hasIn([key], value));
}.bind(undefined);

const _this$c;

const getPushHandlerMethodGetter = function getPushHandlerMethodGetter(
  absintheSocket,
  request
) {
  const _this2 = this;

  _newArrowCheck(this, _this$c);

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
  _newArrowCheck(this, _this$c);

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
  _newArrowCheck(this, _this$c);

  handlePush(
    absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload),
    getPushHandler(absintheSocket, request, notifierPushHandler)
  );
  return absintheSocket;
}.bind(undefined);

const _this$d;

const refresh = function refresh(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$d);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return utilsArray.replace(
      findIndex(notifiers, "request", notifier.request),
      [notifier],
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$e;

const refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$e);

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

const _this$f;

const createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(
  payload
) {
  _newArrowCheck(this, _this$f);

  return {
    payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

const createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this$f);

  return {
    payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

const _this$g;

const pushAbsintheDocEvent = function pushAbsintheDocEvent(
  absintheSocket,
  _ref,
  notifierPushHandler
) {
  const request = _ref.request;

  _newArrowCheck(this, _this$g);

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
  _newArrowCheck(this, _this$g);

  return refreshNotifier(
    absintheSocket,
    _objectSpread({}, notifier, {
      requestStatus: requestStatuses.sending
    })
  );
}.bind(undefined);

const createRequestError = function createRequestError(message) {
  _newArrowCheck(this, _this$g);

  const error = new Error("request: ".concat(message));
  error.name = "SocketError";
  return error;
}.bind(undefined);

const createRequestErrorWithResult = function createRequestErrorWithResult(
  message,
  result
) {
  _newArrowCheck(this, _this$g);

  const error = new Error("request: ".concat(message));
  error.name = "SocketError";
  error.result = result;
  return error;
}.bind(undefined);

const onTimeout = function onTimeout(absintheSocket, notifier) {
  _newArrowCheck(this, _this$g);

  return notifyActive(
    notifier,
    createErrorEvent(createRequestError("timeout"))
  );
}.bind(undefined);

const onError = function onError(absintheSocket, notifier, result) {
  _newArrowCheck(this, _this$g);

  return abortNotifier(
    absintheSocket,
    notifier,
    createRequestErrorWithResult("GraphQL error", result)
  );
}.bind(undefined);

const getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
  _newArrowCheck(this, _this$g);

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
  _newArrowCheck(this, _this$g);

  return pushAbsintheDocEvent(
    absintheSocket,
    setNotifierRequestStatusSending(absintheSocket, notifier),
    getNotifierPushHandler(onSucceed)
  );
}.bind(undefined);

const _this$h;

const notifyCanceled = function notifyCanceled(notifier, event) {
  _newArrowCheck(this, _this$h);

  notifyAll(notifier.canceledObservers, event);
  return notifier;
}.bind(undefined);

const _this$i;

const clearCanceled = function clearCanceled(notifier) {
  _newArrowCheck(this, _this$i);

  return _objectSpread({}, notifier, {
    canceledObservers: []
  });
}.bind(undefined);

const flushCanceled = function flushCanceled(notifier) {
  _newArrowCheck(this, _this$i);

  return notifier.canceledObservers.length > 0
    ? clearCanceled(notifyCanceled(notifier, createCancelEvent()))
    : notifier;
}.bind(undefined);

const _this$j;

const reset = function reset(notifier) {
  _newArrowCheck(this, _this$j);

  return flushCanceled(
    _objectSpread({}, notifier, {
      isActive: true,
      requestStatus: requestStatuses.pending,
      subscriptionId: undefined
    })
  );
}.bind(undefined);

const _this$k;

const onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$k);

  return updateNotifiers(absintheSocket, remove(flushCanceled(notifier)));
}.bind(undefined);

const onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$k);

  return subscribe(
    absintheSocket,
    refreshNotifier(absintheSocket, reset(notifier))
  );
}.bind(undefined);

const createUnsubscribeError = function createUnsubscribeError(message) {
  _newArrowCheck(this, _this$k);

  return new Error("unsubscribe: ".concat(message));
}.bind(undefined);

const unsubscribeHandler = {
  onError: function onError$$1(absintheSocket, notifier, errorMessage) {
    _newArrowCheck(this, _this$k);

    return abortNotifier(
      absintheSocket,
      notifier,
      createUnsubscribeError(errorMessage)
    );
  }.bind(undefined),
  onTimeout: function onTimeout(absintheSocket, notifier) {
    _newArrowCheck(this, _this$k);

    return notifyCanceled(
      notifier,
      createErrorEvent(createUnsubscribeError("timeout"))
    );
  }.bind(undefined),
  onSucceed: function onSucceed(absintheSocket, notifier) {
    _newArrowCheck(this, _this$k);

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

  _newArrowCheck(this, _this$k);

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
  _newArrowCheck(this, _this$k);

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

  _newArrowCheck(this, _this$k);

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
  _newArrowCheck(this, _this$k);

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
  _newArrowCheck(this, _this$k);

  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
}.bind(undefined);

const onDataMessage = function onDataMessage(absintheSocket, _ref3) {
  const payload = _ref3.payload;

  _newArrowCheck(this, _this$k);

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
  _newArrowCheck(this, _this$k);

  return message.event === dataMessageEventName;
}.bind(undefined);

const _this$l;

const setNotifierRequestStatusSent = function setNotifierRequestStatusSent(
  absintheSocket,
  notifier
) {
  _newArrowCheck(this, _this$l);

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
  _newArrowCheck(this, _this$l);

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
  _newArrowCheck(this, _this$l);

  return pushRequestUsing(
    absintheSocket,
    notifyStartEvent(notifier),
    onQueryOrMutationSucceed
  );
}.bind(undefined);

const pushRequest = function pushRequest(absintheSocket, notifier) {
  _newArrowCheck(this, _this$l);

  if (notifier.operationType === "subscription") {
    subscribe(absintheSocket, notifier);
  } else {
    pushQueryOrMutation(absintheSocket, notifier);
  }
}.bind(undefined);

const _this$m;

const createChannelJoinError = function createChannelJoinError(message) {
  _newArrowCheck(this, _this$m);

  return new Error("channel join: ".concat(message));
}.bind(undefined);

const notifyErrorToAllActive = function notifyErrorToAllActive(
  absintheSocket,
  errorMessage
) {
  const _this2 = this;

  _newArrowCheck(this, _this$m);

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

  _newArrowCheck(this, _this$m);

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
  _newArrowCheck(this, _this$m);

  handlePush(
    absintheSocket.channel.join(),
    createChannelJoinHandler(absintheSocket)
  );
  absintheSocket.channelJoinCreated = true;
  return absintheSocket;
}.bind(undefined);

module.exports = joinChannel;
// # sourceMappingURL=joinChannel.js.map
