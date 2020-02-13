

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es7.array.includes");
require("core-js/modules/es6.string.includes");
require("core-js/modules/es6.array.find-index");
const utilsComposite = require("@jumpn/utils-composite");
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

const findIndex = function findIndex(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this);

  return notifiers.findIndex(utilsComposite.hasIn([key], value));
}.bind(undefined);

const _this$1;

const refresh = function refresh(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$1);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return utilsArray.replace(
      findIndex(notifiers, "request", notifier.request),
      [notifier],
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$2;

const removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck(this, _this$2);

  return utilsArray.remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

const unobserve = function unobserve(_ref, observer) {
  const activeObservers = _ref.activeObservers;

  var rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this$2);

  return _objectSpread({}, rest, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

const _this$3;

const updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$3);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

const _this$4;

const ensureHasActiveObserver = function ensureHasActiveObserver(
  notifier,
  observer
) {
  _newArrowCheck(this, _this$4);

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
  _newArrowCheck(this, _this$4);

  return updateNotifiers(
    absintheSocket,
    refresh(unobserve(ensureHasActiveObserver(notifier, observer), observer))
  );
}.bind(undefined);

module.exports = unobserve$1;
// # sourceMappingURL=unobserve.js.map
