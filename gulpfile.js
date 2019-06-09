const {src, dest, series, parallel, watch} = require('gulp');

function test() {
  console.log('gulp task is running')
  return (
    src('src/js/**/*.js')
      .pipe(dest('dist/'))
  );
}

exports.test = test;