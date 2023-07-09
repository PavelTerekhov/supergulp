import gulp from "gulp";
import gpug from "gulp-pug";
import {deleteSync} from "del";
import ws from "gulp-webserver";

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    }
};

const pug = () => 
    gulp
        .src(routes.pug.src)
        .pipe(gpug())
        .pipe(gulp.dest(routes.pug.dest));

const clear = () => deleteSync(["build"]);
const webserver = () => {
    gulp
        .src("build")
        .pipe(ws({livereload: true, open: true}));
}
const watch = () => {
    gulp.watch(routes.pug.watch, pug);
}
const prepare = gulp.series([clear]);
const assets = gulp.series([pug]);
const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);