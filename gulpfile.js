var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    postcss = require("gulp-postcss"),
    connect = require("gulp-connect"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

sass.compiler = require("node-sass");

var paths = {
    styles: {
        src: "./helios/design/scss/**/*.scss",
        mainScss: "./helios/design/scss/main.scss",
        dest: "./helios/design/css"
    },
    html: {
        src: "./helios/*.html"
    },
    js: {
        src: "./helios/design/js/*.js",
        dest: "./helios/design/js/dist/"
    }
};

gulp.task("server", done => {
    connect.server({
        root: "./helios",
        livereload: true,
        port: 8888
    });
    done();
});

function js() {
    return gulp
        .src(paths.js.src)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
}
exports.js = js;

function html() {
    return gulp.src(paths.html.src).pipe(connect.reload());
}
exports.html = html;

function style() {
    return gulp
        .src(paths.styles.mainScss)
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(connect.reload());
}
exports.style = style;

gulp.task("watch", done => {
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.js.src, js);
    done();
});

var build = gulp.series(style, html, js);

exports.default = gulp.series(build, gulp.series("server", "watch"));