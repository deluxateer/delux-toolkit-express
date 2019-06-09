export const test = () => (
  src('src/js/**/*.js')
    .pipe(webpack(require('./webpack.config')))
    .pipe(dest('dist/'))
);