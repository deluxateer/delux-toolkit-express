const express = require('express');
const { serverPort } = require('./config/port');

const app = express();

// Init middleware
app.use(express.urlencoded({ extended: true }));

// Define views and static assets
app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(express.static('public'));

// Define api routes
app.use('/api/users', require('./routes/users'));


// Page routes
app.get('/', (req, res) => res.render('index'));
app.get('/deluxthreads', (req, res) => res.render('deluxthreads'));

app.listen(serverPort, () => console.log(`Server listening on port ${serverPort}`));