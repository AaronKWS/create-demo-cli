const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const { execSync } = require("child_process");

module.exports = function (creator, options, callback) {
  const { name, desc } = options;

  // 获取当前命令执行的目录
  const currentCWDPath = process.cwd();

  // 模版文件内相关文件引用路径
  const projectPath = path.join(currentCWDPath, name);
  const srcPath = path.join(projectPath, "src");
  const pubilcPath = path.join(projectPath, "public");
  const buildPath = path.join(projectPath, "build");

  // 同步创建目录
  fs.mkdirSync(projectPath);
  fs.mkdirSync(srcPath);
  fs.mkdirSync(pubilcPath);
  fs.mkdirSync(buildPath);

  // 将文件添加到内存
  creator.copyTpl(
    "packageTpl",
    path.join(projectPath, "package.json"),
    {
      name,
      desc,
    },
    true
  );
  creator.copyTpl("bablerc", path.join(projectPath, ".babelrc"));
  creator.copyTpl("webpackConfig", path.join(projectPath, "webpack.config.js"));
  creator.copyTpl("src/index.js", path.join(srcPath, "index.js"));
  creator.copyTpl("public/index.html", path.join(pubilcPath, "index.html"));

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
