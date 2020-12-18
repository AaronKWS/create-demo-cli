const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const { copyDir, pathsMap } = require("./tools/copyDir");
const webpackModuleConfig = require("./template/config/staticConfig/webpack.module.config.js");

module.exports = function (creator, options, callback) {
  const { name, desc } = options;
  let entry, rules;

  // 获取当前命令执行的目录
  const currentCWDPath = process.cwd();

  // 模版文件内相关文件引用路径
  const projectPath = path.join(currentCWDPath, name);

  // 配置相关
  if (options.env.length) {
    Object.keys(webpackModuleConfig).map((_keys) => {
      if (options.env.includes(_keys)) {
        const configPar = webpackModuleConfig[_keys];

        if (configPar.entry) {
          entry = configPar.entry;
        }

        if (!!configPar.rules.length) {
          rules = [
            ...webpackModuleConfig[_keys].rules,
            ...webpackModuleConfig.DEFULT.rules,
          ];
        }
      }
    });
  } else {
    entry = webpackModuleConfig.DEFULT.entry;
    rules = webpackModuleConfig.DEFULT.rules;
  }

  console.log(11111);

  // 文件拉取相关
  copyDir(path.resolve(__dirname, "template"), projectPath, (error) => {
    console.log(chalk.red(error));
  });

  Object.keys(pathsMap).forEach((item) => {
    const { source, to } = pathsMap[item];

    if (item === "package.json") {
      creator.copyTpl(
        path.join(source, item),
        path.join(to, item),
        { name, desc },
        true
      );
    } else if (item === "config.ejs") {
      creator.copyTpl(
        path.join(source, item),
        path.join(to, "config.js"),
        { entry, rules },
        true
      );
    } else {
      creator.copyTpl(path.join(source, item), path.join(to, item));
    }
  });

  console.log();

  creator.fsEditorStore.commit(() => {
    console.log();
    console.log(`${chalk.grey(`创建项目: ${name}`)} ${chalk.green("✔ ")}`);
    console.log(
      `${chalk.grey(`创建目录: ${name}/build`)} ${chalk.green("✔ ")}`
    );
    console.log(
      `${chalk.grey(`创建目录: ${name}/public`)} ${chalk.green("✔ ")}`
    );
    console.log(`${chalk.grey(`创建目录: ${name}/src`)} ${chalk.green("✔ ")}`);
    console.log(
      `${chalk.grey(`创建文件: ${name}/build/index.html`)} ${chalk.green("✔ ")}`
    );
    console.log(
      `${chalk.grey(`创建文件: ${name}/src/index.js`)} ${chalk.green("✔ ")}`
    );

    callback();
  });
};
