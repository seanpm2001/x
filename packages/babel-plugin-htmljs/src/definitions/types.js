import {
  assertNodeType,
  assertValueType,
  chain,
  assertNodeOrValueType,
  assertEach
} from "@babel/types/lib/definitions/utils";

import { functionCommon } from "@babel/types/lib/definitions/core";

const valueFieldCommon = {
  value: {
    validate: assertValueType("string")
  }
};

export default {
  MarkoFile: {
    builder: ["program", "comments", "tokens"],
    visitor: ["program"],
    aliases: ["Marko", "File"],
    fields: {
      program: {
        validate: assertNodeType("Program")
      }
    }
  },

  HTMLDocumentType: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLDeclaration: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLCDATA: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLComment: {
    builder: ["value"],
    aliases: ["Marko", "Expression", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLText: {
    visitor: ["value"],
    builder: ["value"],
    aliases: ["Marko", "StringLiteral", "Literal"],
    fields: { ...valueFieldCommon }
  },

  HTMLPlaceholder: {
    visitor: ["value"],
    builder: ["value", "escaped"],
    aliases: ["Marko", "Expression"],
    fields: {
      value: {
        validate: assertNodeType("Expression")
      },
      escaped: {
        validate: assertValueType("boolean"),
        default: true
      }
    }
  },

  HTMLSpreadAttribute: {
    builder: ["value"],
    visitor: ["value"],
    aliases: ["Marko", "HTMLAttribute"],
    fields: {
      value: {
        validate: assertNodeType("Expression"),
        optional: true
      }
    }
  },

  HTMLAttribute: {
    builder: ["name", "value", "modifier"],
    visitor: ["value"],
    aliases: ["Marko"],
    fields: {
      name: {
        validate: assertValueType("string")
      },
      value: {
        validate: assertNodeType("Expression"),
        optional: true
      },
      modifier: {
        validate: assertValueType("string"),
        optional: true
      }
    }
  },

  HTMLStartTag: {
    builder: ["name", "params", "attributes"],
    aliases: ["Marko", "Expression"],
    fields: {
      name: {
        validate: assertValueType("string")
      },
      params: {
        ...functionCommon.params,
        default: []
      },
      attributes: {
        validate: chain(
          assertValueType("array"),
          assertNodeOrValueType("HTMLAttribute")
        ),
        optional: true,
        default: []
      }
    }
  },

  HTMLEndTag: {
    builder: ["name"],
    aliases: ["Marko", "Expression"],
    fields: {
      name: {
        validate: assertValueType("string")
      }
    }
  },

  HTMLElement: {
    builder: ["startTag", "endTag", "children", "properties"],
    aliases: ["Marko", "Expression"],
    fields: {
      startTag: {
        validate: assertNodeType("HTMLStartTag")
      },
      endTag: {
        validate: assertNodeType("HTMLEndTag"),
        optional: true
      },
      children: {
        validate: chain(
          assertValueType("array"),
          assertEach(
            assertNodeType("HTMLElement", "HTMLText", "HTMLPlaceholder")
          )
        ),
        default: []
      },
      properties: {
        validate: assertValueType("object")
      }
    }
  }
};
