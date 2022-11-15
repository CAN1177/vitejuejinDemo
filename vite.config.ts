import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { normalizePath } from 'vite';
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
	// 手动指定项目根目录位置
	// root: path.join(__dirname, "src"),
	//  React 项目编译和热更新的功能
	plugins: [react()],

	// css 相关的配置
	css: {
		preprocessorOptions: {
			scss: {
				// additionalData 的内容会在每个 scss 文件的开头自动注入
				additionalData: `@import "${variablePath}";`,
			},
		},
		modules: {
			// 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
			// 其中，name 表示当前文件名，local 表示类名
			// generateScopedName: "[name]_[local]_[hash:base64:5]",
			generateScopedName: '[local]_[hash:base64:5]',
		},
	},

	resolve: {
		// 别名配置
		alias: {
			'@assets': path.join(__dirname,'src/assets')
		}
	},
	server: {
		port: 9000
	}
});
