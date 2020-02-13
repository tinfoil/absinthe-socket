

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

const _objectSpread = _interopDefault(
  require("@babel/runtime/helpers/objectSpread")
);
const _objectWithoutProperties = _interopDefault(
  require("@babel/runtime/helpers/objectWithoutProperties")
);
require("core-js/modules/es6.array.index-of");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
const utilsArray = require("@jumpn/utils-array");

const _this;

const removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck(this, _this);

  return utilsArray.remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

const unobserve = function unobserve(_ref, observer) {
  const activeObservers = _ref.activeObservers;

  var rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this);

  return _objectSpread({}, rest, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

module.exports = unobserve;
// # sourceMappingURL=unobserve.js.map
