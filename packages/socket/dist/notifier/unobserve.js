import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import "core-js/modules/es6.array.index-of";
import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";
import {remove} from "@jumpn/utils-array";

const _this;

const removeObserver = function removeObserver(observers, observer) {
  _newArrowCheck(this, _this);

  return remove(observers.indexOf(observer), 1, observers);
}.bind(undefined);

const unobserve = function unobserve(_ref, observer) {
  const activeObservers = _ref.activeObservers;

  var rest = _objectWithoutProperties(_ref, ["activeObservers"]);

  _newArrowCheck(this, _this);

  return _objectSpread({}, rest, {
    activeObservers: removeObserver(activeObservers, observer)
  });
}.bind(undefined);

export default unobserve;
// # sourceMappingURL=unobserve.js.map
