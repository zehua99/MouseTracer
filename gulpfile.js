var path = require('path');
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
gulp.task("watch",function() {
    nodemon({
        verbose: true,
        script: "./bin/www",
        ext: "js",
        watch: "./",
        env: {
            'DEBUG': 'mousetracer:*',
            'NODE_ENV': 'development'
        },
        stdout: true
    });
});