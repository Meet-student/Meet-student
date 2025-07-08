const MagicString = require("magic-string");
function definePlugin(config) {
  return {
    name: 'define',
    transform(code) {
      //{__VUE_OPTIONS_API__: true,__VUE_PROD_DEVTOOLS__: false}
      const replacements = config.define || {};
      const replacementKeys = Object.keys(replacements);//[__VUE_OPTIONS_API__,__VUE_PROD_DEVTOOLS__]
      const pattern = new RegExp('(' + replacementKeys.map(str => str).join('|') + ')', 'g');
      //pattern = (__VUE_OPTIONS_API__|__VUE_PROD_DEVTOOLS__)
      const ms = new MagicString(code)
      let hasReplaced = false;
      let match;
      while ((match = pattern.exec(code))) {
        hasReplaced = true;
        const start = match.index;
        const end = start + match[0].length;
        const replacement = '' + replacements[match[1]];
        ms.overwrite(start, end, replacement);
      }
      if (!hasReplaced) {
        return null;
      }
      return { code: ms.toString() }
    }
  }
}
module.exports = definePlugin;