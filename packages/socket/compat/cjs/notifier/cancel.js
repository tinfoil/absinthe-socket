

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

const _toConsumableArray = _interopDefault(
  require("@babel/runtime/helpers/toConsumableArray")
);
const _objectSpread = _interopDefault(
  require("@babel/runtime/helpers/objectSpread")
);
const _objectWithoutProperties = _interopDefault(
  require("@babel/runtime/helpers/objectWithoutProperties")
);
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

module.exports = cancel;
// # sourceMappingURL=cancel.js.map
