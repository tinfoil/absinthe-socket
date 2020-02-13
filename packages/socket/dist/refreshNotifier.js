import {replace} from "@jumpn/utils-array";
import "core-js/modules/es6.array.find-index";
import {hasIn} from "@jumpn/utils-composite";
import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";

const _this;

const findIndex = function findIndex(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this);

  return notifiers.findIndex(hasIn([key], value));
}.bind(undefined);

const _this$1;

const refresh = function refresh(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$1);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return replace(
      findIndex(notifiers, "request", notifier.request),
      [notifier],
      notifiers
    );
  }.bind(this);
}.bind(undefined);

const _this$2;

const updateNotifiers = function updateNotifiers(absintheSocket, updater) {
  _newArrowCheck(this, _this$2);

  absintheSocket.notifiers = updater(absintheSocket.notifiers);
  return absintheSocket;
}.bind(undefined);

const _this$3;

const refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
  _newArrowCheck(this, _this$3);

  updateNotifiers(absintheSocket, refresh(notifier));
  return notifier;
}.bind(undefined);

export default refreshNotifier;
// # sourceMappingURL=refreshNotifier.js.map
