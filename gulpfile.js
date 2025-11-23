// initialize modules
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();

const scssTask = () => {
    return src("app/scss/style.scss", { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest("dist", { sourcemaps: '.' }));
}

const jsTask = () => {
    return src("app/js/script.js", { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest("dist", { sourcemaps: '.' }));
}

const browserSyncServe = (cb) => {
    browserSync.init({
        server: {
            baseDir: "."
        },
        notify: {
            styles: {
                top: "auto",
                bottom: "0"
            }
        }
    });
    cb();
}

const browserSyncReload = (cb) => {
    browserSync.reload();
    cb();
}

const watchTask = () => {
    watch("*.html", browserSyncReload);
    watch(["app/scss/**/*.scss", "app/js/**/*.js"],
        series(scssTask, jsTask, browserSyncReload));
}

exports.default = series(
    scssTask,
    jsTask,
    // We use parallel() to run browserSyncServe and watchTask at the same time 
    parallel(browserSyncServe, watchTask)
);
