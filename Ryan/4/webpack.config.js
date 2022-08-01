import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_, argv) => {

    return {
        entry: {
            main : './src/public/main.ts'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [{
                        loader: 'ts-loader', 
                        options: {
                            configFile: "tsconfig.client.json",
                            compilerOptions: { 
                                sourceMap: argv.mode === 'development'
                            }
                        }
                    }],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.html/,
                    type: 'asset/resource',
                    generator : {
                      filename : '[name][ext][query]',
                    },
                    exclude: /[$\\\\/]index\.html$/i
                }
            ]
        },
        target:'web',
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js'
            },
            extensions: ['.ts', '.mts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/public/index.html',
                scriptLoading:"module"
            })
        ],
        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'dist/public'),
            clean: true
        },
        stats: {
            errorDetails:true
        }
    };
};