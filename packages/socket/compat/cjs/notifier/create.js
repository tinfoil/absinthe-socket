

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);
const utilsGraphql = require("@jumpn/utils-graphql");

const requestStatuses = {
  canceled: "canceled",
  canceling: "canceling",
  pending: "pending",
  sent: "sent",
  sending: "sending"
};

const _this;

const createUsing = function createUsing(request, operationType) {
  _newArrowCheck(this, _this);

  return {
    operationType,
    request,
    activeObservers: [],
    canceledObservers: [],
    isActive: true,
    requestStatus: requestStatuses.pending,
    subscriptionId: undefined
  };
}.bind(undefined);

const create = function create(request) {
  _newArrowCheck(this, _this);

  return createUsing(request, utilsGraphql.getOperationType(request.operation));
}.bind(undefined);

module.exports = create;
// # sourceMappingURL=create.js.map
