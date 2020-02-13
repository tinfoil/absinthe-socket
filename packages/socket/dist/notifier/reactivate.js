import _objectSpread from "@babel/runtime/helpers/objectSpread";
import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";

const _this;

const reactivate = function reactivate(notifier) {
  _newArrowCheck(this, _this);

  return notifier.isActive
    ? notifier
    : _objectSpread({}, notifier, {
        isActive: true
      });
}.bind(undefined);

export default reactivate;
// # sourceMappingURL=reactivate.js.map
