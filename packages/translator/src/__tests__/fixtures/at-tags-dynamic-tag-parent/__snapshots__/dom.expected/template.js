import { write as _write, dynamicTagAttrs as _dynamicTagAttrs, createRenderer as _createRenderer, conditional as _conditional, value as _value, createRenderFn as _createRenderFn } from "@marko/runtime-fluurt/src/dom";
const _xBody = /* @__PURE__ */_createRenderer("Body content", "");
const _dynamicTagName = /* @__PURE__ */_conditional("#text/0", (_scope, _dirty) => {
  if (_dirty) {
    _dynamicBody_attrs = () => ({
      header: {
        class: "my-header",
        renderBody() {
          _write("Header content");
        }
      },
      footer: {
        class: "my-footer",
        renderBody() {
          _write("Footer content");
        }
      }
    });
  }
  var _dynamicBody_attrs;
  _dynamicTagAttrs(_scope, "#text/0", _dynamicBody_attrs, _xBody, _dirty);
});
const _x = /* @__PURE__ */_value("x", (_scope, x, _dirty) => {
  if (_dirty) {
    _dynamicTagName_value = x || _xBody;
  }
  var _dynamicTagName_value;
  _dynamicTagName(_scope, _dynamicTagName_value, _dirty);
});
export const attrs = (_scope, _destructure, _dirty = true) => {
  let x;
  if (_dirty) ({
    x
  } = _destructure);
  _x(_scope, x, _dirty);
};
export { _x as _apply_x };
export const template = "<!>";
export const walks = /* replace, over(1) */"%b";
export const setup = function () {};
export default /* @__PURE__ */_createRenderFn(template, walks, setup, attrs, null, "packages/translator/src/__tests__/fixtures/at-tags-dynamic-tag-parent/template.marko");