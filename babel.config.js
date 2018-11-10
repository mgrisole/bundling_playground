module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            "@babel/preset-env",
            {
                targets: {
                ie: 11,
                browsers: 'last 2 versions'
            },
            useBuiltIns: 'usage'
            }
        ]
    ];
    const plugins = [];

  return {
    presets,
    plugins,
    ignore: [ 'node_modules' ]
  };
}