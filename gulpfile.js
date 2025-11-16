// initialize modules
const { src, dest, watch, serires } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();

sass.compiler = require("dart-sass");

