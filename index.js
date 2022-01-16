/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const pkgJson = require(path.resolve(process.cwd(), "./package.json"));
const hasStylelint = Object.prototype.hasOwnProperty.call(
  pkgJson.devDependencies,
  "plugin-stylelint"
);

module.exports = {
  plugins: [
    hasStylelint && require("stylelint")(require("plugin-stylelint")),
    hasStylelint &&
      require("postcss-reporter")({ clearReportedMessages: true }),
    // 更有效的引入内联样式表，并重新合并
    require("postcss-import")(),
    // 自动添加兼容性前缀polyfills
    require("postcss-preset-env"),
    // 修复了一些已知的flexbox错误
    require("postcss-flexbugs-fixes"),
    // 为浅色文本 添加抗锯齿功能
    require("postcss-light-text"),
    // 将样式表里的px转换成rem
    require("postcss-plugin-px2rem")({
      rootValue: 16, // 换算基数,默认100，可以设置为75这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了
      remUnit: 168, // 设计图的宽度/10 比如你的设计图是1920的宽度 这里你就1920/10=192
      // exclude: /(node_module)/, // 排除文件夹 /(node_module)/。如果想把UI框架内的px也转换成rem，设为false
      exclude: false,
    }),
    // 自动添加前缀
    require("autoprefixer")({
      browsers: ["last 2 versions"],
      flexbox: "no-2009", // 仅为规范的最终版本和IE版本添加前缀。
      grid: "autoplace", // 启用-ms-Grid Layout的前缀
      overrideBrowserslist: ["> 0.15% in CN"],
    }), // 引入
    // 删除注释等一系列css压缩处理
    require("cssnano")(),
  ].filter(Boolean),
};
