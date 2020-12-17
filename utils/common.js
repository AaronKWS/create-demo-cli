// 根据我们想要实现的功能配置执行动作，遍历产生对应的命令
const mapActions = {
  create: {
    alias: "c", //别名
    description: "创建一个项目", // 描述
    examples: [
      //用法
      "demo-app create",
    ],
  },
  "*": {
    alias: "", //别名
    description: "command not found", // 描述
    examples: [], //用法
  },
};

module.exports = {
  mapActions,
};
