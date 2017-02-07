var app = require('express')();

app.set('port', process.env.PORT || 3000);

// пользовательская страница 404
app.use(function(req, res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Не найдено, если вы видите это сообщение свяжитесь со мной nikolay.salinder@gmail.com');
});

// пользовательская страница 500
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - ошибка сервера, но мы это исправим! Отправьте это сообщение администратору' + err.stack);
});

app.listen(app.get('port'), function(){
  console.log( 'Express запущен на http://localhost:' + app.get('port'));
});