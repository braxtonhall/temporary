import path from "path";
import {Configuration} from "webpack";

const config: Configuration = {
	context: path.join(__dirname, '/extension'),
	entry: {
		'bundle': './ts/main/index.ts',
		'options': './ts/options/index.ts',
		'background': './ts/background/delegator.ts',
	},
	output: {
		path: path.join(__dirname, '/extension/js'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader'
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};

module.exports = (env, options) => {
	if (options.mode !== 'production') {
		config.devtool = 'source-map';
	}

	return config;
};
