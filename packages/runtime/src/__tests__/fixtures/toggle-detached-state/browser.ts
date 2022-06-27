import {
  data,
  conditional,
  createRenderer,
  createRenderFn,
  source,
  closure,
  inConditionalScope,
  Scope,
  destructureSources,
  setSource,
} from "../../../dom/index";
import { get, next, over } from "../../utils/walks";

export const inputs = [
  {
    value: { name: "Jack" },
    visible: true,
  },
  {
    value: undefined,
    visible: false,
  },
  {
    value: { name: "Jake" },
    visible: true,
  },
];

type Input = typeof inputs[number];

const enum INDEX {
  comment = 0,
  conditional = 0,
  conditional_scope = 1,
  visible = 6,
  value = 8,
}

type ComponentScope = Scope<{
  [INDEX.comment]: Comment;
  [INDEX.conditional]: Comment;
  [INDEX.visible]: Input["visible"];
  [INDEX.value]: Input["value"];
}>;

const enum INDEX_BRANCH0 {
  text = 0,
  value = 1
}

type Branch0Scope = Scope<{
  _: ComponentScope;
  [INDEX_BRANCH0.text]: Text;
}>;

// <attrs/{ visible, value }/>
// <div>
//   <if=visible>
//     <span>${value.name}</span>
//   </if>
// </div>

export const template = `<div><!></div>`;
export const walks = next(1) + get + over(1);

const value$if = closure(
  INDEX_BRANCH0.value,
  1, 
  INDEX.value, 
  [], 
  (scope: Branch0Scope, value: { name: string }) => {
    data(scope[INDEX_BRANCH0.text], value.name);
  }
);

const _if = conditional(
  INDEX.conditional, 
  1, 
  (scope: ComponentScope) => scope[INDEX.visible] ? _ifBody : undefined
);

export const value_subscribers = [
  inConditionalScope(value$if, (scope: ComponentScope) => scope[INDEX.conditional_scope])
];

export const visible_subscribers = [
  _if,
];

const _value = source(INDEX.value, value_subscribers);
const _visible = source(INDEX.visible, visible_subscribers);

export const attrs = destructureSources([_value, _visible], (scope: ComponentScope, { visible, value }: Input) => {
  setSource(scope, _value, value);
  setSource(scope, _visible, visible);
});

export default createRenderFn(template, walks, undefined, attrs);

const _ifBody = createRenderer(
  "<span> </span>",
  next(1) + get + next(1),
  undefined, // optimization (value will always be set in _apply_value),
  [value$if]
);
