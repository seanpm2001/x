import { conditional as _conditional, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _dynamicTagName = /* @__PURE__ */_conditional("#text/0");
const _input = /* @__PURE__ */_value("input", (_scope, input) => _dynamicTagName(_scope, input.renderBody));
export const attrs = _input;
export { _input as _apply_input };
export const template = "<set value=hello><!></set>";
export const walks = /* next(1), replace, out(1) */"D%l";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, null, "packages/translator/src/__tests__/fixtures/context-tag-from-relative-path/other.marko");