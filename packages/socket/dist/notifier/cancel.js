import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
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

export default cancel;
// # sourceMappingURL=cancel.js.map
