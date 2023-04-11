import { write as _write, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, markHydrateScopeStart as _markHydrateScopeStart, SYMBOL_OWNER as _SYMBOL_OWNER, markHydrateControlEnd as _markHydrateControlEnd, nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, maybeFlush as _maybeFlush, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = _register((input, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _write("<div>");
  const _scope1_ = new Map();
  for (let _from = input.from ?? 0, _step = input.step ?? 1, _steps = (input.to - _from) / _step, _i = 0; _i <= _steps; _i++) {
    const _scope1_id = _nextScopeId();
    const n = _from + _i * _step;
    _write(`${_markHydrateScopeStart(_scope1_id)}${_escapeXML(n)}${_markHydrateNode(_scope1_id, "#text/0")}, `);
    _writeHydrateScope(_scope1_id, (_s => (_scope1_.set(n, _s), _s))({
      [_SYMBOL_OWNER]: _scope0_id
    }));
    _maybeFlush();
  }
  _write(`${_markHydrateControlEnd(_scope0_id, "#div/0")}</div>${_markHydrateNode(_scope0_id, "#div/0")}`);
  _writeHydrateScope(_scope0_id, {
    "#div/0(": _scope1_.size ? _scope1_ : undefined
  }, _scope0_);
}, "packages/translator/src/__tests__/fixtures/create-and-clear-rows-loop-from/template.marko");
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);