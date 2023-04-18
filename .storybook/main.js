module.exports = {
  "stories": [
    "../src/**/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // {
    //   name: "@storybook/addon-styling",
    //   options: {
    //     postCss: true,
    //   }
    // }
  ],
  "framework": "@storybook/angular",
  "core": {
    "builder": "webpack5"
  }
}
