const fs = require("fs-extra");
const pathsMap = {};

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);

    _copy(src, dist);
  }

  function _copy(src, dist) {
    try {
      const paths = fs.readdirSync(src);

      paths.forEach((path) => {
        // template对应文件路径
        var _src = src + "/" + path;
        // 当前文件路径
        var _dist = dist + "/" + path;

        try {
          const stat = fs.statSync(_src);

          if (path !== "staticConfig") {
            // 判断是文件还是目录
            if (stat.isFile()) {
              pathsMap[path] = {
                source: src,
                to: dist,
              };
            } else if (stat.isDirectory()) {
              // 当是目录是，递归复制
              copyDir(_src, _dist, callback);
            }
          }
        } catch (error) {
          callback(error);
        }
      });
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = {
  copyDir,
  pathsMap,
};
