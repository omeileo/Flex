export default {
  meta: {
    type: 'layout',
    docs: {
      description: 'enforce a space after closing tag',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'whitespace',
    schema: [],
  },
  create(context) {
    return {
      JSXElement(node) {
        const sourceCode = context.getSourceCode();
        const nextToken = sourceCode.getTokenAfter(node);

        if (
          nextToken &&
          nextToken.type === 'JSXText' &&
          nextToken.value !== ' '
        ) {
          context.report({
            node,
            message: 'A space is required after the closing tag.',
            fix(fixer) {
              // TODO: Update to resolve issue with 2 line breaks instead of 1
              // const lineBreak = context.getSourceCode().text.includes('\r\n') ? '\r\n' : '\n'
              // return fixer.insertTextAfter(node, lineBreak)
              // eslint-disable-next-line no-console
              console.log('fixer', fixer);
            },
          });
        }
      },
    };
  },
};
