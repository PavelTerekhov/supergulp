import gulp from "gulp";
import gpug from "gulp-pug";
const gulpWebserver = require('gulp-webserver');
import {deleteSync} from "del";
import image from "gulp-image";


const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    img: {
        src: 'src/img/*',
        dest: 'build/img'
    }
};

const pug = () => {
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));
};

const clear = () => deleteSync(["build"]);

const webserver = () => {
  gulp.src("build").pipe(gulpWebserver({livereload: true, open: true }));
};

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
};

const img = () => {
    gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));
}

const prepare = gulp.series([clear, img]);
const assets = gulp.series([pug]);
const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);