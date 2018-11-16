const gulp = require('gulp')
const oss = require('gulp-alioss-upload')
const appConfig = require('./config/config')

const ossOptions = {
  ...appConfig.oss[process.env.BUILD_ENV],
  path: appConfig.oss.path,
  prefix: appConfig.oss.prefix,
  formats: appConfig.oss.formats,
}

gulp.task('upload:oss', function() {
  return gulp.src(['./dist/**/*.js', './dist/**/*.json', './dist/**/*.wxss', './dist/**/*.wxml'])
    .pipe(oss(ossOptions))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function() {
  gulp.watch(['./dist/**/*.js', './dist/**/*.json', './dist/**/*.wxss', './dist/**/*.wxml'], ['upload:oss']);
})
