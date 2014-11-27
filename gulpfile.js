var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    stylish = require('jshint-stylish'),
    port = 80;

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe($.connect.reload())
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish));
});

gulp.task('sass', function() {
  gulp.src('./css/src/*.scss')
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe($.connect.reload());
});

gulp.task('connect', function() {
    $.connect.server({
        root: require('path').resolve('./'),
        port: port,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe($.connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['html']);
    gulp.watch(['./js/*.js'], ['js']);
    gulp.watch(['./css/**/*.scss'], ['sass']);
});

gulp.task('default', ['connect', 'watch']);
