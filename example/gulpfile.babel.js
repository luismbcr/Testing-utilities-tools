'use strict';
//simple gulp file, just to run up a server.
import gulp from 'gulp';
import browserSync from 'browser-sync';


gulp.task('default',()=>{
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(["*.html","styles/*.css"]).on('change', browserSync.reload);
});

