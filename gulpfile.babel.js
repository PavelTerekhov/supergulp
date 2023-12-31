import {gulp} from "gulp";
import {gpug} from "gulp-pug";
import {gulpWebserver} from 'gulp-webserver';
import {deleteSync} from "del";
import {image} from "gulp-image";
import {sass} from "gulp-sass";

sass.compiler = require('node-sass');

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    img: {
        src: 'src/img/*',
        dest: 'build/img'
    },
    scss: {
            watch: 'src/scss/**/*.scss',
        src: 'src/scss/style.scss',
        dest: 'build/css'
    }
};

const pug = () =>
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));


const clear = () => deleteSync(["build"]);

const webserver = () => 
    gulp.src("build").pipe(gulpWebserver({livereload: true, open: true}));


const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.scss.watch, style);
};

const img = () => 
    gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));


const style = () => gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(routes.scss.dest))

const prepare = gulp.series([clear, img]);
const assets = gulp.series([pug, style]);
const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);