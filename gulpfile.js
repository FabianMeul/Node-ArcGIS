var gulp         = require("gulp"),
    eslint       = require("gulp-eslint");


// Gulp JsHint
// https://github.com/spalger/gulp-jshint
gulp.task("eslint", function() {
    gulp.src(["**/*.js","!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.result(function(result) {
        // Called for each ESLint result.
        console.log("ESLint result: " + result.filePath);
        console.log("# Messages: " + result.messages.length);
        console.log("# Warnings: " + result.warningCount);
        console.log("# Errors: " + result.errorCount);
    }));
});

// Default task(s).
gulp.task("default", ["eslint"], function(){});

// Travis CI task
gulp.task("test", ["eslint"], function(){});
