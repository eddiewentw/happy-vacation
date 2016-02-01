var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');

gulp.task( 'default', [ 'html', 'style', 'js', 'libraryJS' ] );

gulp.task( 'style', function() {
	return gulp.src('master/css/*.css')
		.pipe( concat('main.min.css') )
		.pipe( minifycss() )
		.pipe( gulp.dest('gh-pages/css/') );
});

gulp.task( 'js', function() {
	return gulp.src('master/js/main.js')
		.pipe( uglify() )
		.pipe( gulp.dest('gh-pages/js/') );
});

gulp.task( 'libraryJS', function() {
	return gulp.src(['master/library/jquery.min.js', 'master/library/moment/moment.min.js', 'master/library/Pikaday/pikaday.js'])
		.pipe( concat('all.min.js') )
		.pipe( uglify() )
		.pipe( gulp.dest('gh-pages/library/') );
});

gulp.task( 'html', function() {
	return gulp.src('master/index.html')
		.pipe( htmlReplace({
			'css': 'css/main.min.css',
			'libraryJS': 'library/all.min.js'
		}) )
		.pipe( gulp.dest('gh-pages/') );
});