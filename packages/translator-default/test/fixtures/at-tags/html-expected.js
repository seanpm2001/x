// Compiled using marko@5.0.0 - DO NOT EDIT

const _marko_template = _t(__filename);

export default _marko_template;
import _hello from "./components/hello/index.marko";
import _marko_load_tag from "marko/src/runtime/helpers/load-tag";

const _hello_tag = _marko_load_tag(_hello);

import _marko_renderer from "marko/src/runtime/components/renderer";
import { t as _t } from "marko/src/runtime/html";
const _marko_componentType = "Mp8YE_db",
      _marko_component = {};
_marko_template._ = _marko_renderer(function (input, out, _component, component, state) {
  _hello_tag({
    "foo": {
      "renderBody": out => {
        out.w("Foo!");
      }
    }
  }, out, _component, "0");
}, {
  ___type: _marko_componentType,
  ___implicit: true
}, _marko_component);