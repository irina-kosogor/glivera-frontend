const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const pug = require('gulp-pug');


gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("./src/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./dist/css"))
        .pipe(gulp.dest("./dist/img"))
        .pipe(gulp.dest("./dist/icons"))
        .pipe(gulp.dest("./dist/fonts"))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("./src/scss/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("./src/pug/*.pug", gulp.parallel('pug'));
});

gulp.task('pug', function buildHTML(){
    return gulp.src('src/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'pug'));



