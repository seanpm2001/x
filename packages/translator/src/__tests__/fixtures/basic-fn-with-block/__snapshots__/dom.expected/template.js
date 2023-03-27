import { on as _on, queueSource as _queueSource, data as _data, register as _register, queueHydrate as _queueHydrate, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _hydrate_count = _register("packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko_0_count", _scope => _on(_scope["#button/0"], "click", function () {
  const count = _scope["count"];
  {
    _queueSource(_scope, _count, count + 1);
  }
}));
const _count = /* @__PURE__ */_value("count", (_scope, count) => {
  _data(_scope["#text/1"], count);
  _queueHydrate(_scope, _hydrate_count);
});
const _setup = _scope => {
  _count(_scope, 0);
};
export const template = "<button> </button>";
export const walks = /* get, next(1), get, out(1) */" D l";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, null, null, "packages/translator/src/__tests__/fixtures/basic-fn-with-block/template.marko");