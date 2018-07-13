const express = require("express");
const path = require("path");
const app = express();
app.set('port', 3333)
app.use(express.static(__dirname + "/"));

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname, "/bisheng-motion-theme/map.html"));
});

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'));
console.log("http://127.0.0.1:" + app.get('port'));
module.exports = app;
