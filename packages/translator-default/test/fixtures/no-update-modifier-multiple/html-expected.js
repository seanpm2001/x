// Compiled using marko@5.0.0 - DO NOT EDIT

const _marko_template = _t(__filename);

export default _marko_template;
import _marko_props from "marko/src/runtime/html/helpers/data-marko";
import _marko_attr from "marko/src/runtime/html/helpers/attr";
import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "nQxCtzDQ",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  out.w(`<div><input${_marko_props({
    noupdate: ["value"]
  })}${_marko_attr("value", input.defaultValue)}><input${_marko_props({
    noupdate: ["value", "checked"]
  })} type="checkbox"${_marko_attr("value", input.defaultValue)}${_marko_attr("checked", input.checked)}></div>`);
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);