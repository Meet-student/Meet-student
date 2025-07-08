function aliasPlugin(options) {
  const { entries = [] } = options;
  return {
    name: 'alias',
    async resolveId(importee, importer) {
      if (!importer) return null;
      const matchedEntry = entries.find(entry => matches(entry.find, importee));
      if (!matchedEntry) return null;
      const updatedId = importee.replace(matchedEntry.find, matchedEntry.replacement);
      return this.resolve(updatedId, importer, Object.assign({ skipSelf: true })).then(
        resolved => resolved || { id: updatedId }
      );
    }
  }
}
function matches(pattern, importee) {
  if (pattern instanceof RegExp) {
    return pattern.test(importee);
  }
  if (importee.length < pattern.length) {
    return false;
  }
  if (importee === pattern) return true;
  return importee.startsWith(pattern + '/');
}
export default aliasPlugin;
