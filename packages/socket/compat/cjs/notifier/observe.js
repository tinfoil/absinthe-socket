

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

const observe = function observe(_ref, observer) {
  const activeObservers = _ref.activeObservers;

  var rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this);

  return _objectSpread({}, rest, {
    activeObservers: _toConsumableArray(activeObservers).concat([observer]),
    isActive: true
  });
}.bind(undefined);

module.exports = observe;
// # sourceMappingURL=observe.js.map
