const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = (config, env) => {
    config = rewireCssModules(config, env);
    config.module.rules.push(

    )
    return config
}