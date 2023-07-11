const { Compilation, sources } = require('webpack');

class CssUnitsModifier {
  constructor(unit, newUnit) {
    this.unit = unit;
    this.newUnit = newUnit
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('CssUnitsModifier', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'css-units-modifier',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        () => {
          const { filename } = compilation.options.output;
          const file = compilation.getAsset(filename);
          compilation.updateAsset(
            filename,
            new sources.RawSource(file.source.source().replaceAll(this.unit, this.newUnit))
          );
        }
      );
    })
  }
}
module.exports = CssUnitsModifier
