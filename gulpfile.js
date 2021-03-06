var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'); 

    

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [  
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js',
    'node_modules/bootstrap-v4-dev/js/dist/dropdown.js'
];

var sassSources = ['components/sass/style.scss']

gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({ bare: true })
             .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function () {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'nested'
    }))
            .on('error', gutil.log)
        .pipe(gulp.dest('builds/development/css'))
});

gulp.task('boostrap', function() {
    gulp.src()
});

gulp.task('default', ['coffee', 'js', 'compass', 'watch']);

gulp.task('watch', function() {
          gulp.watch(coffeeSources, ['coffee']);
          gulp.watch(jsSources, ['js']);
            gulp.watch('components/sass/*.scss', ['compass'])
});