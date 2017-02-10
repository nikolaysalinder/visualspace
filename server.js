var express = require('express');
var app = express();
//Подключаем папку public для статических файлов
app.use(express.static(__dirname + '/public'));

//Подключаем шаблонизатор handlebars изпользую шаблон main в папке views/layouts
var handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  //этот код надо внести для того чтобы не было Error: Missing helper "section"
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name]=options.fn(this);
      return null;
    }
  } 
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//устанавливаем порт
app.set('port', process.env.PORT || 3000);

//подлючаем путь к  главной странице
app.get('/', function(req, res){
  res.render('index');
});

// пользовательская страница 404
app.use(function(req, res){
  res.status(404);
  res.render('404');
});

// пользовательская страница 500
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express запущен на http://localhost:' + app.get('port'));
});