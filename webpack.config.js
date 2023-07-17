const path = require("path");
// 경로를 조합해주는 node.js API
const HtmlWebpackPlugin = require('html-webpack-plugin');
'[name].[ext]?[hash]'
module.exports = {
    mode: 'development',
	entry: "./src/index.js",
  	output: {
      	filename: "bundle.js",
      	path: path.resolve(__dirname, "dist"),
      	// npm build (webpack) 실행 시 dist 폴더에 bundle.js 생성됨
    },
    module : {
        rules: [
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src', 'index.html'),
        }),
      ],
}