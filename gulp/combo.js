/**
 * Author: Luolei
 *
 * 自动将HTML中的文件转成combo路径

    <link rel="stylesheet" href="<%= staticConf.staticPath %>/css/reset.0.1.css">
    <link rel="stylesheet" href="<%= staticConf.staticPath %>/css/global.0.1.css">
    <link rel="stylesheet" href="<%= staticConf.staticPath %>/css/font.0.1.css">

 * 执行 gulp combo 后转换成
 *

 <link rel="stylesheet" data-ignore="true" href="//<%= staticConf.staticDomain %>/c/=/qd/css/reset.0.1.css,/qd/css/global.0.1.css,/qd/css/font.0.1.css?v=201605101449" />

 *
 * 若需要忽略某js和css,只需要在html标签中增加 data-ignore="true" 即可
 *
 */

var PROJECT_CONFIG = require('../.yconfig'); //载入项目基础配置
var gulp = require('gulp');
var del = require('del');
var combo = require('gulp-qidian-combo');
var gulpSlash = require('gulp-slash'); //处理windows和unix文件夹斜杠
var argv = require('yargs').argv;

var serverConf = require('../src/node-config/server');

var envType = "local";
var staticConf = serverConf[envType]['static'];
var dateFormat = require('dateformat');

/**
 * 执行combo,将预览版的html中的css和js url地址进行combo拼接
 */


gulp.task('preview-combo', function() {
    var _updateTime = dateFormat((new Date()).getTime(), 'yyyymmddHHMM');
    console.log('combo url时间更新' + _updateTime);
    var baseUri = '<%= staticConf.staticDomain %>/c/='; //这里设置combo的url地址
    gulp.src('_previews/**/*.html')
        .pipe(combo(baseUri, {
            splitter: ',',
            async: false,
            ignorePathVar: '<%= staticConf.staticPath %>',
            assignPathTag: PROJECT_CONFIG.gtimgName, //这里需要配置combo后的相关文件路径
            serverLogicToggle: true,
            serverLogicCondition: 'combo == true',
            updateTime: _updateTime
        }, {
            max_age: 31536000
        }))
        .pipe(gulp.dest('_previews'));
})

/**
 * 不做版本,直接将view html进行combo处理
 * 直接命令行执行 gulp
 */

gulp.task('view-combo', function() {
    var _updateTime = dateFormat((new Date()).getTime(), 'yyyymmddHHMM');
    console.log('url时间更新' + _updateTime);
    var baseUri = '<%= staticConf.staticDomain %>/c/=';
    gulp.src('src/views/**/*.html')
        .pipe(combo(baseUri, {
            splitter: ',',
            async: false,
            ignorePathVar: '<%= staticConf.staticPath %>',
            assignPathTag: PROJECT_CONFIG.gtimgName, //这里需要配置combo后的相关文件路径
            serverLogicToggle: true,
            serverLogicCondition: 'combo == true', //这里配置combo的触发逻辑,可以是服务器环境,也可以是tag值
            updateTime: _updateTime
        }, {
            max_age: 31536000
        }))
        .pipe(gulp.dest('_previews'));
})
