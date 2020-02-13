

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.array.find");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
const utilsComposite = require("@jumpn/utils-composite");

const _this;

const find = function find(
  notifiers,
  key,
  value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
) {
  _newArrowCheck(this, _this);

  return notifiers.find(utilsComposite.hasIn([key], value));
}.bind(undefined);

module.exports = find;
// # sourceMappingURL=find.js.map
