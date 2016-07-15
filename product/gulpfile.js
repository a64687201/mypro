var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-clean-css'),
	cssver = require('gulp-make-css-url-version'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	rev = require('gulp-rev-append'),
	concat = require('gulp-concat'),
	htmlmin = require('gulp-htmlmin'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename');
 
//gulp默认命令设置
gulp.task('default',['lessmin','jsmin','libsmin','htmlmin','imagemin']);
//gulp自动监听
gulp.task('watch', function() {
    gulp.watch('src/html/**/*.html', ['htmlmin']); //当所有html文件发生改变时，调用htmlmin任务
    gulp.watch('src/less/**/*.less', ['lessmin']); //当所有less文件发生改变时，调用lessmin任务
    gulp.watch('src/js/**/*.js', ['jsmin']); //当所有js文件发生改变时，调用jsmin任务
    gulp.watch('src/libs/**/*.js', ['libsmin']); //当所有libs文件发生改变时，调用libsmin任务
    gulp.watch('src/image/**/*.{png,jpg,gif,ico}', ['imagemin']); //当所有图片文件发生改变时，调用imagemin任务
});
//imagemin 图片压缩
gulp.task('imagemin', function () {
    gulp.src('src/image/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/image'));
});
//uglify JS代码压缩
gulp.task('jsmin', function () {
    gulp.src(['src/js/**/*.js'])
        .pipe(uglify({
        	mangle: {except:['require','exports','module','$']}//排除混淆关键字
        }))
        .pipe(rename(function(path){
        	path.basename += '.min';
        }))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('libsmin', function () {
    gulp.src(['src/libs/**/*.js'])
        .pipe(uglify({
        	mangle: false//不修改参数名
        }))
        .pipe(gulp.dest('dist/libs'));
});
//gulp-clean-css css代码压缩
//gulp-make-css-url-version css文件引用url添加版本号
//gulp-less less编译
//gulp-sourcemaps 生成sourcemap文件以便less引入关系
//gulp-autoprefixer 自动添加兼容性前缀
gulp.task('lessmin', function () {
    gulp.src('src/less/**/*.less')
//  	.pipe(sourcemaps.init())
    	.pipe(less())
//  	.pipe(sourcemaps.write())
    	.pipe(cssver())
    	.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0','iOS 7'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
        	advanced:true,//是否开启高级优化（合并选择器等）
        	compatibility:'ie8',//保留ie8及以下兼容写法
        	keepBreaks: false,//是否保留换行
        	keepSpecialComments:'*'//保留特殊前缀
        }))
        .pipe(rename(function(path){
        	path.basename += '.min';
        }))
        .pipe(gulp.dest('dist/css'));
});
//gulp-htmlmin html代码压缩
//gulp-rev-append 给页面引用添加版本号,消除缓存
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
    };
    gulp.src('src/html/**/*.html')
    	.pipe(rev())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});

//gulp-concat JS代码合并（暂时不用）
gulp.task('concat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});