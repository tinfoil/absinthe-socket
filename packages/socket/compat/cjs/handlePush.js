

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
require("phoenix");

const _this;

const handlePush = function handlePush(push, handler) {
  _newArrowCheck(this, _this);

  return push
    .receive("ok", handler.onSucceed)
    .receive("error", handler.onError)
    .receive("timeout", handler.onTimeout);
}.bind(undefined);

module.exports = handlePush;
// # sourceMappingURL=handlePush.js.map
