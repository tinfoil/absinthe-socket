

Object.defineProperty(exports, "__esModule", {value: true});

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);

const absintheEventNames = {
  doc: "doc",
  unsubscribe: "unsubscribe"
};

const _this;

const createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(
  payload
) {
  _newArrowCheck(this, _this);

  return {
    payload,
    name: absintheEventNames.unsubscribe
  };
}.bind(undefined);

const createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
  _newArrowCheck(this, _this);

  return {
    payload,
    name: absintheEventNames.doc
  };
}.bind(undefined);

exports.createAbsintheDocEvent = createAbsintheDocEvent;
exports.createAbsintheUnsubscribeEvent = createAbsintheUnsubscribeEvent;
// # sourceMappingURL=absintheEventCreators.js.map
