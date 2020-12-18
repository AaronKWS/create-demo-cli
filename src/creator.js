const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const inquirer = require("inquirer");
const memFs = require("mem-fs");
const memFsEditor = require("mem-fs-editor");
const figlet = require("figlet");
const ora = require("ora");

const text = figlet.textSync("Demo Cli");

console.log(chalk.green(text));

class Creator {
  constructor() {
    const fsStore = memFs.create();
    this.fsEditorStore = memFsEditor.create(fsStore);

    this.options = {
      name: "demo-app",
      desc: "A demo of app",
      env: null,
    };
  }

  // 初始化操作
  init() {
    console.log(chalk.green("demo app😼："));
    this.ask().then((result) => {
      this.options = { ...this.options, ...result };

      this.write();
    });
  }

  // 构建前用户需要输入
  ask() {
    const prompt = [];

    // 问题1: 输入文件名
    prompt.push({
      type: "input",
      message: "请输入文件名",
      name: "name",
      default: "demo-app", // 默认值
      validate: (name) => {
        if (!name) {
          return "请输入项目名称";
        }

        if (fs.existsSync(name)) {
          return "项目名重复!";
        }

        return true;
      },
    });

    // 问题2: 输入项目描述
    prompt.push({
      type: "input",
      message: "请输入项目相关描述",
      name: "desc",
      default: "A demo of app", // 默认值
    });

    // 问题3: demo支持环境
    prompt.push({
      type: "checkbox",
      name: "env",
      message: "请输入DEMO_APP支持环境",
      choices: [{ name: "TS", value: "TS" }],
    });

    return inquirer.prompt(prompt);
  }

  // 写入文件操作
  write() {
    const spinner = ora(chalk.green("demo app 构建开始")).start();
    console.log();
    const buildDir = require("../cliConfig");

    buildDir(this, this.options, () => {
      console.log(chalk.green("🔨项目构建完成🎉🎉🎉"));
      console.log();
      console.log(chalk.grey("启动项目:"));
      console.log();
      console.log(`   cd ${this.options.name}`);
      console.log();
      console.log(`   npm install`);
      console.log();
      console.log(`   npm start`);
      spinner.stop();
    });
  }

  // 拷贝template文件（携带ejs语法）
  copyTpl(file, to, option = {}, isEjs = false) {
    if (isEjs) {
      this.fsEditorStore.copyTpl(file, to, option);
    } else {
      this.fsEditorStore.copy(file, to);
    }
  }
}

module.exports = new Creator();
