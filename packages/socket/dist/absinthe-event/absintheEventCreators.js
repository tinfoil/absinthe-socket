import "core-js/modules/es6.function.bind";
import _newArrowCheck from "@babel/runtime/helpers/newArrowCheck";

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

export {createAbsintheDocEvent, createAbsintheUnsubscribeEvent};
// # sourceMappingURL=absintheEventCreators.js.map
