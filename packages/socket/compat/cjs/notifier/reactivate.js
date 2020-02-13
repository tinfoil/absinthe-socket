

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

const _objectSpread = _interopDefault(
  require("@babel/runtime/helpers/objectSpread")
);
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);

const _this;

const reactivate = function reactivate(notifier) {
  _newArrowCheck(this, _this);

  return notifier.isActive
    ? notifier
    : _objectSpread({}, notifier, {
        isActive: true
      });
}.bind(undefined);

module.exports = reactivate;
// # sourceMappingURL=reactivate.js.map
