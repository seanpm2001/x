import { tagVarSignal as _tagVarSignal, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _x = /* @__PURE__ */_value("x", (_scope, x, _dirty) => {
  if (_dirty) {
    _tagVarSignal_value = x + 3;
  }
  var _tagVarSignal_value;
  _tagVarSignal(_scope, _tagVarSignal_value, _dirty);
});
const _setup = _scope => {
  _x(_scope, 1);
};
export const template = "<span>child</span>";
export const walks = /* over(1) */"b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/custom-tag-var-expression/components/child.marko");