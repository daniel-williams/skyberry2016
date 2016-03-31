var gulp= require('gulp');


var paths = {
  app: ['app/**/*.{js,jsx,less}']
};


gulp.task('watch', function() {
  gulp.watch(paths.app, ['test']);
});

gulp.task('test', function() {
  console.log('TODO: setup tests');
})

gulp.task('default', ['watch']);