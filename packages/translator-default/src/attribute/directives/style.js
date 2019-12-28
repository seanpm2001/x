import { types as t } from "@marko/babel-types";
import { isHTMLTag } from "@marko/babel-utils";
import styleToString from "marko/src/runtime/vdom/helper-styleAttr";

export default function(tag, _, value) {
  const { hub } = tag;
  if (value.isStringLiteral()) return;
  if (!isHTMLTag(tag)) return;

  const { confident, value: computed } = value.evaluate();
  value.replaceWith(
    confident
      ? t.stringLiteral(styleToString(computed) || "")
      : t.callExpression(
          hub.importDefault(
            tag,
            "marko/src/runtime/vdom/helper-styleAttr",
            "marko_style_merge"
          ),
          [value.node]
        )
  );
}
