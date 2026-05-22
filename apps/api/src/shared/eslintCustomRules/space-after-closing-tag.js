/**
 * Custom ESLint rule to enforce spacing after closing tags
 */
module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce spacing after closing tags',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'whitespace',
    schema: []
  },
  create(context) {
    return {
      JSXClosingElement(node) {
        // This is a placeholder implementation that doesn't actively check anything
        // since the rule is set to 'off' in the config
      }
    }
  }
}
