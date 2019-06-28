module.exports = {
    'root':true,
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true
	},
    'extends': 'eslint:recommended',
	'globals': {
    },
    'parser':'babel-eslint',
	'parserOptions': {
		'ecmaVersion': 2018    
	},
	'rules': {
		'indent': [
			'error',
			4
		],
		'linebreak-style': [
			2,
			'unix'
		],
		'quotes': [
			2,
			'single'
        ],
        "no-console":["error",{ // 不允许写console
                "allow":["warn","error","info"]
                // 但是可以写console.warn,error,info
            }
        ]
	}
};