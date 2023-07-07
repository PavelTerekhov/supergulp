import gulp from "gulp";
import gpug from "gulp-pug";
import {deleteSync} from 'del'

const routes = {
    pug: {
        src: "src/*.pug",
        dest: "build"
    }
};

const pug = () => 
    gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

const clear = () => deleteSync(["build"]);

const prepare = gulp.series([clear]);
const assets = gulp.series([pug]);

export const dev = gulp.series([prepare, assets]);