/**
 * Sass
 */
var gulp = require('gulp');
var chalk = require('chalk'); // 美化日志
var plumber = require("gulp-plumber");
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

/**
 * csscombo调用根目录下 .csscombo.json 进行格式化
 */
var csscomb = require('gulp-csscomb');
var bust = require('gulp-buster');

// 设置相关路径
var paths = {
    sass: 'src/static/**/*.scss',
    css: 'build',
    prelease:'_prelease'
};

// sass task
gulp.task('sass', function(cb) {
    gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(csscomb())
        // .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest(paths.css))
        // .pipe(sourcemaps.write({
        //     sourceRoot: '/css/sass'
        // }))

    //对普通css只做格式化处理
    gulp.src('src/static/**/*.css')
        .pipe(plumber())
        .pipe(csscomb())
        .pipe(gulp.dest(paths.css))
        cb()
});



