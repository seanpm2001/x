import { data as _data, value as _value, createRenderer as _createRenderer, loop as _loop, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _i$forBody2 = /* @__PURE__ */_value("i", (_scope, i) => _data(_scope["#text/0"], i));
const _val$forBody2 = /* @__PURE__ */_value("val", (_scope, val) => _data(_scope["#text/1"], val));
const _forBody2 = /* @__PURE__ */_createRenderer("<div><!>: <!></div>", /* next(1), replace, over(2), replace */"D%c%");
const _i$forBody = /* @__PURE__ */_value("i", (_scope, i) => _data(_scope["#text/0"], i));
const _val$forBody = /* @__PURE__ */_value("val", (_scope, val) => _data(_scope["#text/1"], val));
const _forBody = /* @__PURE__ */_createRenderer("<div><!>: <!></div>", /* next(1), replace, over(2), replace */"D%c%");
const _for2 = /* @__PURE__ */_loop("#text/1", _forBody2, (_scope, _destructure2, _clean) => {
  let val, i;
  if (!_clean) [val, i] = _destructure2;
  _val$forBody2(_scope, val, _clean);
  _i$forBody2(_scope, i, _clean);
});
const _for = /* @__PURE__ */_loop("#text/0", _forBody, (_scope, _destructure, _clean) => {
  let val, i;
  if (!_clean) [val, i] = _destructure;
  _val$forBody(_scope, val, _clean);
  _i$forBody(_scope, i, _clean);
});
const _arrB = /* @__PURE__ */_value("arrB", (_scope, arrB) => _for2(_scope, [arrB, null]));
const _arrA = /* @__PURE__ */_value("arrA", (_scope, arrA) => _for(_scope, [arrA, null]));
const _setup = _scope => {
  _arrA(_scope, [1, 2, 3]);
  _arrB(_scope, [1, 2, 3]);
};
export const template = "<!><!>";
export const walks = /* replace, over(1), replace, over(1) */"%b%b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/for-tag-with-state/template.marko");