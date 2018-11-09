module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            "@babel/preset-env",
            {
                "modules": false
            }
        ]
    ];
    const plugins = [];

  return {
    presets,
    plugins
  };
}