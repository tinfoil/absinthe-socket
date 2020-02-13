import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";
import {getOperationType} from "@jumpn/utils-graphql";

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

  return createUsing(request, getOperationType(request.operation));
}.bind(undefined);

export default create;
// # sourceMappingURL=create.js.map
