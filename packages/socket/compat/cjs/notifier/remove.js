

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

const utilsArray = require("@jumpn/utils-array");
require("core-js/modules/es6.array.find-index");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
const utilsComposite = require("@jumpn/utils-composite");

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

const remove = function remove(notifier) {
  const _this2 = this;

  _newArrowCheck(this, _this$1);

  return function(notifiers) {
    _newArrowCheck(this, _this2);

    return utilsArray.remove(
      findIndex(notifiers, "request", notifier.request),
      1,
      notifiers
    );
  }.bind(this);
}.bind(undefined);

module.exports = remove;
// # sourceMappingURL=remove.js.map
