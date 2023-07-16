const path = require("path");
// 경로를 조합해주는 node.js API

module.exports = {
	entry: "./src/index.js",
  	output: {
      	filename: "bundle.js",
      	path: path.resolve(__dirname, "dist"),
      	// npm build (webpack) 실행 시 dist 폴더에 bundle.js 생성됨
    }
  	
}