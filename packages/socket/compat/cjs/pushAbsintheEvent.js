

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.function.name");
require("phoenix");
require("core-js/modules/es6.array.find");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
const utilsComposite = require("@jumpn/utils-composite");

const _this;

const handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this);

  return push
    .receive("ok", handler.onSucceed)
    .receive("error", handler.onError)
    .receive("timeout", handler.onTimeout);
}.bind(undefined);

const _this$1;

const find = function find(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this$1);

  return notifiers.find(utilsComposite.hasIn([key], value));
}.bind(undefined);

const _this$2;

const getPushHandlerMethodGetter = function getPushHandlerMethodGetter(
  absintheSocket,
  request
) {
  const _this2 = this;

  _newArrowCheck(this, _this$2);

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
  _newArrowCheck(this, _this$2);

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
  _newArrowCheck(this, _this$2);

  handlePush(
    absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload),
    getPushHandler(absintheSocket, request, notifierPushHandler)
  );
  return absintheSocket;
}.bind(undefined);

module.exports = pushAbsintheEvent;
// # sourceMappingURL=pushAbsintheEvent.js.map
