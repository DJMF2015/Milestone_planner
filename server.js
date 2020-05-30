const express = require('express');
const port = 3000;
const app = express();
const parser = require('body-parser');

var list = ["Building GUI"];


app.use(parser.urlencoded({express: true}));
app.set('view engine', 'ejs');
app.set(express.static(__dirname + '/'));

app.get('/', function(req, res){
     res.render('index', {listoftasks: list});
});


app.post('/', function(req, res){
    var task = req.body.name;
    var category = req.body.category;
    list.push(task);
    
    res.redirect('/add');
})



app.listen(port, function(req, res){
    console.log("server is up and runnning at port: " + port);
});
