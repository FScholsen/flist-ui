const { createDefaultConfig } = require("@open-wc/testing-karma");
const merge = require("deepmerge");

process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        {
          pattern: config.grep ? config.grep : "packages/**/tests/*.test.js",
          type: "module",
        },
      ],
      // basePath: "../../",
      browsers: ["ChromeHeadlessNoSandbox"],
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: "ChromeHeadless",
          flags: ["--headless", "--no-sandbox"],
        },
      },
      frameworks: ["mocha", "chai", "esm"],
      client: {
        mocha: { ui: "tdd" },
      },
      plugins: [
        // load plugin karma-esm
        require.resolve("@open-wc/karma-esm"),
      ],
      esm: {
        // if you are using 'bare module imports' you will need this option
        nodeResolve: true,
        preserveSymlinks: true,
        // babel: true
      },
    })
  );
  return config;
};
