import { on as _on, queueSource as _queueSource, data as _data, register as _register, queueHydrate as _queueHydrate, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _hydrate_clickCount = _register("packages/translator/src/__tests__/fixtures/basic-unused-ref/template.marko_0_clickCount", _scope => _on(_scope["#button/0"], "click", function () {
  const clickCount = _scope["clickCount"];
  _queueSource(_scope, _clickCount, clickCount + 1);
}));
const _clickCount = /* @__PURE__ */_value("clickCount", (_scope, clickCount) => {
  _data(_scope["#text/1"], clickCount);
  _queueHydrate(_scope, _hydrate_clickCount);
});
const _unused_2 = (_scope, unused_2) => {};
const _unused_ = (_scope, unused_1) => {};
const _setup = _scope => {
  _unused_(_scope, 123);
  _unused_2(_scope, 456);
  _clickCount(_scope, 0);
};
export const template = "<div><button> </button></div>";
export const walks = /* next(1), get, next(1), get, out(2) */"D D m";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/basic-unused-ref/template.marko");