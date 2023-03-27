import type { ValueSignal, IntersectionSignal } from "./signals";
import { Accessor, AccessorChars, Scope, ScopeContext } from "../common/types";
import { createScope } from "./scope";
import { setContext } from "../common/context";
import { WalkCodes, walk, trimWalkString } from "./walker";
import { queueHydrate, runHydrate } from "./queue";
import { DOMFragment, defaultFragment } from "./fragment";
import { attrs } from "./dom";
import { setConditionalRendererOnlyChild } from "./control-flow";
import { register } from "./hydrate";

const enum NodeType {
  Element = 1,
  Text = 3,
  Comment = 8,
  DocumentFragment = 11,
}

export type Renderer<I extends Input = Input> = {
  ___template: string;
  ___walks: string | undefined;
  ___setup: SetupFn | undefined;
  ___closureSignals: IntersectionSignal[];
  ___clone: () => Node;
  ___hasUserEffects: 0 | 1;
  ___sourceNode: Node | undefined;
  ___fragment: DOMFragment | undefined;
  ___dynamicStartNodeOffset: Accessor | undefined;
  ___dynamicEndNodeOffset: Accessor | undefined;
  ___attrs: ValueSignal<I> | undefined;
  ___owner: Scope | undefined;
};

export type RendererOrElementName<I extends Input = Input> =
  | Renderer<I>
  | (string & Record<keyof Renderer, undefined>);

type Input = Record<string, unknown>;
type SetupFn = (scope: Scope) => void;
type RenderResult<I extends Input> = {
  update: (input: I) => void;
  destroy: () => void;
};

export function createScopeWithRenderer(
  renderer: RendererOrElementName<any>,
  context: ScopeContext,
  ownerScope?: Scope
) {
  setContext(context);
  const newScope = createScope(context as ScopeContext);
  newScope._ = renderer.___owner || ownerScope;
  newScope.___renderer = renderer as Renderer;
  initRenderer(renderer, newScope);
  if (renderer.___closureSignals) {
    for (const signal of renderer.___closureSignals) {
      signal.___subscribe?.(newScope);
    }
  }
  setContext(null);
  return newScope;
}

export function initContextProvider(
  scope: Scope,
  scopeAccessor: number,
  valueAccessor: number,
  contextKey: string,
  renderer: Renderer
) {
  const node: Node = scope[scopeAccessor];
  const newScope = createScopeWithRenderer(
    renderer,
    {
      ...scope.___context,
      [contextKey]: [scope, valueAccessor],
    },
    scope
  );

  (renderer.___fragment ?? defaultFragment).___insertBefore(
    newScope,
    node.parentNode!,
    node.nextSibling
  );

  for (const signal of renderer.___closureSignals) {
    signal(newScope, true);
  }
}

export function initRenderer(
  renderer: RendererOrElementName<any>,
  scope: Scope
) {
  const dom =
    typeof renderer === "string"
      ? document.createElement(renderer)
      : renderer.___clone();
  walk(
    dom.nodeType === NodeType.DocumentFragment
      ? dom.firstChild!
      : (dom as ChildNode),
    renderer.___walks ?? " ",
    scope
  );
  scope.___startNode =
    dom.nodeType === NodeType.DocumentFragment
      ? dom.firstChild!
      : (dom as ChildNode);
  scope.___endNode =
    dom.nodeType === NodeType.DocumentFragment
      ? dom.lastChild!
      : (dom as ChildNode);
  if (renderer.___setup) {
    renderer.___setup(scope);
  }
  if (renderer.___dynamicStartNodeOffset !== undefined) {
    scope.___startNode = renderer.___dynamicStartNodeOffset;
  }
  if (renderer.___dynamicEndNodeOffset !== undefined) {
    scope.___endNode = renderer.___dynamicEndNodeOffset;
  }
  return dom;
}

export function dynamicTagAttrs(
  scope: Scope,
  nodeAccessor: Accessor,
  getAttrs: () => Record<string, unknown>,
  renderBody: Renderer,
  dirty: boolean | undefined
) {
  const renderer = scope[
    nodeAccessor + AccessorChars.COND_RENDERER
  ] as Renderer;

  if (!renderer || renderer === renderBody || (!dirty && !renderer.___attrs)) {
    return;
  }

  const childScope = scope[nodeAccessor + AccessorChars.COND_SCOPE];
  if (typeof renderer === "string") {
    // This will always be 0 because in dynamicRenderer we used WalkCodes.Get
    const elementAccessor = MARKO_DEBUG ? `#${renderer}/0` : 0;
    attrs(childScope, elementAccessor, getAttrs());
    setConditionalRendererOnlyChild(childScope, elementAccessor, renderBody);
  } else if (renderer.___attrs) {
    if (dirty) {
      const attributes = getAttrs();
      renderer.___attrs(
        childScope,
        {
          ...attributes,
          renderBody: renderBody ?? attributes.renderBody,
        },
        dirty
      );
    } else {
      renderer.___attrs(childScope, null as any, dirty);
    }
  }
}

export function createRenderFn<I extends Input>(
  template: string,
  walks: string,
  setup?: SetupFn,
  attrs?: ValueSignal<I>,
  closureSignals?: ValueSignal[],
  templateId?: string,
  dynamicStartNodeOffset?: number,
  dynamicEndNodeOffset?: number
) {
  const renderer = createRenderer<I>(
    template,
    walks,
    setup,
    closureSignals,
    0,
    undefined,
    dynamicStartNodeOffset,
    dynamicEndNodeOffset,
    attrs
  );
  return register(
    templateId!,
    Object.assign((input: I, element: Element): RenderResult<I> => {
      const scope = createScope();
      queueHydrate(scope, () => {
        element.replaceChildren(dom);
      });
      const dom = initRenderer(renderer, scope);

      if (attrs) {
        attrs(scope, input, true);
      }

      runHydrate();

      return {
        update: (newInput: I) => {
          if (attrs) {
            attrs(scope, newInput, null);
            attrs(scope, newInput, true);
            runHydrate();
          }
        },
        destroy: () => {
          // TODO
        },
      };
    }, renderer)
  );
}

export function createRenderer<I extends Input>(
  template: string,
  walks?: string,
  setup?: SetupFn,
  closureSignals: IntersectionSignal[] = [],
  hasUserEffects: 0 | 1 = 0,
  fragment?: DOMFragment,
  dynamicStartNodeOffset?: Accessor,
  dynamicEndNodeOffset?: Accessor,
  attrs?: ValueSignal<I>
): Renderer<I> {
  return {
    ___template: template,
    ___walks: walks && /* @__PURE__ */ trimWalkString(walks),
    ___setup: setup,
    ___clone: _clone,
    ___closureSignals: closureSignals,
    ___hasUserEffects: hasUserEffects,
    ___sourceNode: undefined,
    ___fragment: fragment,
    ___dynamicStartNodeOffset: dynamicStartNodeOffset,
    ___dynamicEndNodeOffset: dynamicEndNodeOffset,
    ___attrs: attrs,
    ___owner: undefined,
  };
}

function _clone(this: Renderer) {
  let sourceNode: Node | null | undefined = this.___sourceNode;
  if (!sourceNode) {
    if (MARKO_DEBUG && this.___template === undefined) {
      throw new Error(
        "The renderer does not have a template to clone: " +
          JSON.stringify(this)
      );
    }
    const walks = this.___walks;
    // TODO: there's probably a better way to determine if nodes will be inserted before/after the parsed content
    // and therefore we need to put it in a document fragment, even though only a single node results from the parse
    const ensureFragment =
      walks &&
      walks.length < 4 &&
      walks.charCodeAt(walks.length - 1) !== WalkCodes.Get;
    this.___sourceNode = sourceNode = parse(
      this.___template,
      ensureFragment as boolean
    );
  }
  return sourceNode.cloneNode(true);
}

const doc = document;
const parser = /* @__PURE__ */ doc.createElement("template");

function parse(template: string, ensureFragment?: boolean) {
  let node: Node | null;
  parser.innerHTML = template;
  const content = parser.content;

  if (
    ensureFragment ||
    (node = content.firstChild) !== content.lastChild ||
    (node && node.nodeType === NodeType.Comment)
  ) {
    node = doc.createDocumentFragment();
    node.appendChild(content);
  } else if (!node) {
    node = doc.createTextNode("");
  }

  return node as Node & { firstChild: ChildNode; lastChild: ChildNode };
}
