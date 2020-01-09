import { resolve } from "path";
import SELF_CLOSING from "self-closing-tags";
import { types as t } from "@marko/babel-types";
import { getTagDef } from "@marko/babel-utils";
import write from "../../util/html-out-write";
import withPreviousLocation from "../../util/with-previous-location";
import translateAttributes from "./attributes";
import getComponentFiles from "../../util/get-component-files";

const EMPTY_OBJECT = {};

/**
 * Translates the html streaming version of a standard html element.
 */
export default function(path) {

  const { hub, node } = path;
  const {
    name: { value: tagName },
    body: { body },
    properties,
    handlers
  } = node;
  const tagProperties = properties.slice();
  const tagDef = getTagDef(path);

  if (tagDef) {
    const { parseOptions = EMPTY_OBJECT } = tagDef;
    if (parseOptions.import) {
      // TODO: the taglib should be updated to support this as a top level option.
      hub.meta.deps.push(resolve(tagDef.dir, parseOptions.import));
    }
  }

  if (handlers) {
    Object.entries(handlers).forEach(
      ([eventName, { arguments: args, once }]) => {
        const delegateArgs = [t.stringLiteral(eventName), args[0]];
        if (args.length > 1) {
          delegateArgs.push(t.arrayExpression(args.slice(1)));
        }

        // TODO: look into only sending this if once is true.
        delegateArgs.push(t.booleanLiteral(once));

        // TODO: why do we output eventName twice.
        tagProperties.push(
          t.objectProperty(
            t.stringLiteral(`on${eventName}`),
            t.callExpression(
              t.memberExpression(
                hub._componentDefIdentifier,
                t.identifier("d")
              ),
              delegateArgs
            )
          )
        );
      }
    );
  }

  const isImplicit = !hub.inlineComponentClass && !getComponentFiles(path).componentFile;
  if (isImplicit && tagProperties.length) {
    path.pushContainer(
      "attributes",
      t.markoAttribute("data-marko", t.objectExpression(tagProperties))
    );
  }

  const writeStartNode = withPreviousLocation(
    write`<${tagName}${translateAttributes(path, path.get("attributes"))}>`,
    node
  );

  if (SELF_CLOSING.indexOf(tagName) !== -1) {
    path.replaceWith(writeStartNode);
    return;
  }

  let needsBlock;
  for (const childNode of body) {
    if (t.isVariableDeclaration(childNode)) {
      if (childNode.kind === "const" || childNode.kind === "let") {
        needsBlock = true;
        break;
      }
    }
  }

  path.replaceWithMultiple(
    [writeStartNode]
      .concat(needsBlock ? t.blockStatement(body) : body)
      .concat(write`</${tagName}>`)
  );
}
