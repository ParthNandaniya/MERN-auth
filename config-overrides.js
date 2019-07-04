// const { injectBabelPlugin } = require('react-app-rewired');
// const rewireLess = require('react-app-rewire-less');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

// module.exports = function override(config, env) {
// 	config = injectBabelPlugin(
// 		['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
// 		config
// 	);
// 	config = rewireLess.withLoaderOptions({
// 		modifyVars: {
// 			'@primary-color': '#459ef5',
// 			'@link-color': '#459ff5',
// 			'@font-size-base': '13px',
// 			'@border-radius-base': '4px',
// 			'@box-shadow-base': '0 1px 4px rgba(0, 0, 0, .15)',
// 			'@primary-1': 'rgba(69, 158, 245, 0.15)',
// 			'@table-row-hover-bg': 'rgba(69, 158, 245, 0.05)'
// 		},
// 		javascriptEnabled: true
// 	})(config, env);
// 	return config;
// };

module.exports = override(
  	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
  	}),
  	addLessLoader({
		modifyVars: {
			'@primary-color': '#459ef5',
			'@link-color': '#459ff5',
			'@font-size-base': '13px',
			'@border-radius-base': '4px',
			'@box-shadow-base': '0 1px 4px rgba(0, 0, 0, .15)',
			'@primary-1': 'rgba(69, 158, 245, 0.15)',
			'@table-row-hover-bg': 'rgba(69, 158, 245, 0.05)'
		},
		javascriptEnabled: true
	})
);
