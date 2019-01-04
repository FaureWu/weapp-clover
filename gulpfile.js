const path = require('path')
const gulp = require('gulp')
const fs = require('fs')
const oss = require('gulp-alioss-upload')
const appConfig = require('./config/config')

let localAppConfig = {}
if (fs.existsSync(path.resolve('./config/config.local.js'))) {
  localAppConfig = require('./config/config.local.js')
}

const ossOptions = {
  ...(localAppConfig.oss && localAppConfig.oss[process.env.BUILD_ENV]
    ? localAppConfig.oss[process.env.BUILD_ENV]
    : appConfig.oss[process.env.BUILD_ENV]),
  path: appConfig.oss.path,
  prefix: appConfig.oss.prefix,
  formats: appConfig.oss.formats,
}

function uploadOss() {
  return gulp
    .src([
      './dist/**/*.js',
      './dist/**/*.json',
      './dist/**/*.wxss',
      './dist/**/*.wxml',
    ], { since: gulp.lastRun(uploadOss) })
    .pipe(oss(ossOptions))
    .pipe(gulp.dest('./dist/'))
}

gulp.task('upload:oss', uploadOss)
gulp.task('watch', function() {
  return gulp.watch(
    [
      './dist/**/*.js',
      './dist/**/*.json',
      './dist/**/*.wxss',
      './dist/**/*.wxml',
    ],
    { delay: 1000, ignoreInitial: false },
    uploadOss,
  )
})
