const express = require('express');
const app = express();
var BodyParser = require('body-parser');
var mysql = require('mysql');

app.use('/stylesheets', express.static('public/stylesheets'));
app.use('/images', express.static('public/images'));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(BodyParser.urlencoded({ extended: true }));

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portofolio',
});

db.connect((err) => {
  if (err) throw err;

  app.get('/', function (req, res, next) {
    res.render('index');
  });

  app.get('/project', (req, res, next) => {
    db.query('SELECT * FROM projek', (err, result) => {
      const projeks = JSON.parse(JSON.stringify(result));
      // console.log(result);
      res.render('project', { projeks: projeks });
    });
  });

  app.get('/tambah', (req, res) => {
    res.render('tambah');
  });

  app.post('/tambah', (req, res) => {
    let sql = `INSERT INTO projek (nama, deskripsi, link) VALUES ('${req.body.nama}','${req.body.deskripsi}', '${req.body.link}')`;
    db.query(sql, (err, field) => {
      if (err) throw err;
    });

    res.redirect('/project');
  });

  app.get('/contact', (req, res) => {
    res.render('contact');
  });

  app.get('*', (req, res) => {
    res.render('404');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('server is running');
});
