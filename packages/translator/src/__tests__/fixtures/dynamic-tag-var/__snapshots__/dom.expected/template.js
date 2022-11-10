import child from "./components/child/index.marko";
import { conditional as _conditional, source as _source, notifySignal as _notifySignal, setSource as _setSource, destructureSources as _destructureSources, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _dynamicTagName4 = /* @__PURE__ */_conditional(18, 1, (_scope, show = _scope[24]) => show && "div");
const _dynamicTagName3 = /* @__PURE__ */_conditional(12, 1, (_scope, dynamic = _scope[25]) => dynamic);
const _dynamicTagName2 = /* @__PURE__ */_conditional(6, 1, (_scope, show = _scope[24]) => show && child);
const _dynamicTagName = /* @__PURE__ */_conditional(0, 1, _scope => child);
const _dynamic = /* @__PURE__ */_source(25, [_dynamicTagName3]);
const _show = /* @__PURE__ */_source(24, [_dynamicTagName2, _dynamicTagName4]);
const _setup = _scope => {
  _notifySignal(_scope, _dynamicTagName);
};
export const attrs = /* @__PURE__ */_destructureSources([_show, _dynamic], (_scope, {
  show,
  dynamic
}) => {
  _setSource(_scope, _show, show);
  _setSource(_scope, _dynamic, dynamic);
});
export { _show as _apply_show, _dynamic as _apply_dynamic };
export const template = "<!><!><!><!>";
export const walks = /* replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1), replace, skip(5), over(1) */"%-b%-b%-b%-b";
export const setup = _setup;
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs);