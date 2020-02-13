

Object.defineProperty(exports, "__esModule", {value: true});

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);

const eventNames = {
  abort: "Abort",
  cancel: "Cancel",
  error: "Error",
  result: "Result",
  start: "Start"
};

const _this;

const createStartEvent = function createStartEvent(payload) {
  _newArrowCheck(this, _this);

  return {
    payload,
    name: eventNames.start
  };
}.bind(undefined);

const createResultEvent = function createResultEvent(payload) {
  _newArrowCheck(this, _this);

  return {
    payload,
    name: eventNames.result
  };
}.bind(undefined);

const createErrorEvent = function createErrorEvent(payload) {
  _newArrowCheck(this, _this);

  return {
    payload,
    name: eventNames.error
  };
}.bind(undefined);

const createCancelEvent = function createCancelEvent() {
  _newArrowCheck(this, _this);

  return {
    name: eventNames.cancel,
    payload: undefined
  };
}.bind(undefined);

const createAbortEvent = function createAbortEvent(payload) {
  _newArrowCheck(this, _this);

  return {
    payload,
    name: eventNames.abort
  };
}.bind(undefined);

exports.createStartEvent = createStartEvent;
exports.createResultEvent = createResultEvent;
exports.createErrorEvent = createErrorEvent;
exports.createCancelEvent = createCancelEvent;
exports.createAbortEvent = createAbortEvent;
// # sourceMappingURL=eventCreators.js.map
