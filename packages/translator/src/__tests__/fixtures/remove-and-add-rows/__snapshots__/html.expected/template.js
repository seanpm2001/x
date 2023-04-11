import { write as _write, escapeXML as _escapeXML, markHydrateNode as _markHydrateNode, SYMBOL_OWNER as _SYMBOL_OWNER, markHydrateControlSingleNodeEnd as _markHydrateControlSingleNodeEnd, nextScopeId as _nextScopeId, writeHydrateScope as _writeHydrateScope, maybeFlush as _maybeFlush, register as _register, createRenderer as _createRenderer } from "@marko/runtime-fluurt/src/html";
const _renderer = _register(({
  children
}, _tagVar, _scope0_) => {
  const _scope0_id = _nextScopeId();
  _write("<div>");
  const _forScopeIds = [],
    _scope1_ = new Map();
  const _by = function (c) {
    return c.id;
  };
  let _i2 = 0;
  for (const child of children) {
    const _scope1_id = _nextScopeId();
    let _i = _i2++;
    _forScopeIds.push(_scope1_id);
    _write(`${_escapeXML(child.text)}${_markHydrateNode(_scope1_id, "#text/0")}`);
    _writeHydrateScope(_scope1_id, (_s => (_scope1_.set(_by(child, _i), _s), _s))({
      [_SYMBOL_OWNER]: _scope0_id
    }));
    _maybeFlush();
  }
  _write(`${_markHydrateControlSingleNodeEnd(_scope0_id, "#div/0", _forScopeIds)}</div>${_markHydrateNode(_scope0_id, "#div/0")}`);
  _writeHydrateScope(_scope0_id, {
    "#div/0(": _scope1_.size ? _scope1_ : undefined
  }, _scope0_);
}, "packages/translator/src/__tests__/fixtures/remove-and-add-rows/template.marko");
export default _renderer;
export const render = /* @__PURE__ */_createRenderer(_renderer);