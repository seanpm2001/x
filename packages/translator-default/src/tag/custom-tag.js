import { types as t } from "@marko/babel-types";
import { assertNoArgs } from "@marko/babel-utils";
import { getAttrs, buildEventHandlerArray } from "./util";

// TODO: support transform and other entries.
const TAG_FILE_ENTRIES = ["template", "renderer"];
const TAG_IDENTIFIER_LOOKUPS = new WeakMap();

export default function(path, tagDef) {
  const { hub, node } = path;
  const { meta } = hub;
  const {
    name: { value: name },
    key,
    bodyOnlyIf
  } = node;
  const relativePath = tagDef && resolveRelativePath(hub, tagDef);

  if (!relativePath) {
    throw path
      .get("name")
      .buildCodeFrameError(
        `Unable to find entry point for custom tag <${name}>.`
      );
  }

  assertNoArgs(path);

  let tagIdentifierLookup = TAG_IDENTIFIER_LOOKUPS.get(hub);
  if (!tagIdentifierLookup) {
    TAG_IDENTIFIER_LOOKUPS.set(hub, (tagIdentifierLookup = {}));
  }

  const tagImportIdentifier = hub.importDefault(path, relativePath, name);
  const tagIdentifier =
    tagIdentifierLookup[name] ||
    path.scope.generateUidIdentifier(`${name}_tag`);

  if (!meta.tags.includes(relativePath)) {
    tagIdentifierLookup[name] = tagIdentifier;
    hub.addStaticNode(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          tagIdentifier,
          t.callExpression(
            hub.importDefault(
              path,
              "marko/src/runtime/helpers/load-tag",
              "marko_load_tag"
            ),
            [tagImportIdentifier]
          )
        )
      ])
    );

    meta.tags.push(relativePath);
  }

  const foundAttrs = getAttrs(path);
  const renderBodyProp = t.isObjectExpression(foundAttrs)
    ? foundAttrs.properties.find(
        prop => prop.key && prop.key.value === "renderBody"
      )
    : undefined;
  const customTagRenderCall = t.expressionStatement(
    t.callExpression(tagIdentifier, [
      foundAttrs,
      t.identifier("out"),
      hub._componentDefIdentifier,
      key,
      ...buildEventHandlerArray(path)
    ])
  );

  if (bodyOnlyIf && renderBodyProp) {
    const renderBodyIdentifier = path.scope.generateUidIdentifier(
      `${name}_tag_renderBody`
    );
    path.insertBefore(
      t.variableDeclaration("const", [
        t.variableDeclarator(renderBodyIdentifier, renderBodyProp.value)
      ])
    );

    renderBodyProp.value = renderBodyIdentifier;
    path.replaceWith(
      t.ifStatement(
        bodyOnlyIf,
        t.markoTag(renderBodyIdentifier, [], t.markoTagBody()),
        customTagRenderCall
      )
    );
  } else {
    path.replaceWith(customTagRenderCall);
  }
}

function resolveRelativePath(hub, tagDef) {
  for (const entry of TAG_FILE_ENTRIES) {
    if (!tagDef[entry]) continue;
    return hub.resolveRelativePath(tagDef[entry]);
  }
}
