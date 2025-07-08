function generationPlugin(options = {}) {
  return {
    name: 'generation',
    outputOptions(outputOptions) {
      console.log(outputOptions);
    },
    renderStart() {
      console.log('renderStart');
    },
    banner() {
      console.log('banner');
      return '//banner';
    },
    footer() {
      console.log('footer');
      return '//footer';
    },
    intro() {
      console.log('intro');
      return '//intro';
    },
    outro() {
      console.log('outro');
      return '//outro';
    },
    renderDynamicImport() {
      console.log('renderDynamicImport');
    },
    augmentChunkHash() {
      console.log('augmentChunkHash');
    },
    resolveFileUrl() {
      console.log('resolveFileUrl');
    },
    resolveImportMeta() {
      console.log('resolveImportMeta');
    },
    renderChunk() {
      console.log('renderChunk');
    },
    generateBundle() {
      console.log('generateBundle');
    },
    writeBundle() {
      console.log('writeBundle');
    },
    renderError() {
      console.log('renderError');
    },
    closeBundle() {
      console.log('closeBundle');
    }

  }
}
export default generationPlugin;
