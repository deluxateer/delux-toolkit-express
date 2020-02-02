module.exports = (app) => {
  // @route   GET
  // @desc    loads home page
  // @access  Public
  app.get('/', (req, res) => res.render('index'));

  // @route   GET
  // @desc    loads deluxthreads page
  // @access  Public
  app.get('/deluxthreads', (req, res) => res.render('deluxthreads'));
}