var gulp = require('gulp');
var typedoc = require("gulp-typedoc");
var pkg = require('./../package.json');

gulp.task("typedoc", function() {
	return gulp
		.src(["./app/**/*.ts"])
		.pipe(typedoc({
			// TypeScript options (see typescript docs)
			module: "commonjs",
			target: "es5",
      includeDeclarations: false,
      json: "./docs/file.json",
      theme: 'default',
			// Output options (see typedoc docs)
			out: "./docs",
			// TypeDoc options (see typedoc docs)
			name: pkg.name,
      exclude: '*./node_modules/**/**',
      ignoreCompilerErrors: true,
			version: true
		}));
});
