const express = require('express');
const port = 3000;
const app = express();
const parser = require('body-parser');

// varaibles to store tasks;
var highimportance = ["Building Wireframe", "milestone planning", "Virtual planning"];
var mediumimportance = ["milestone startup", "customer meetups", "automation testing"];
var lowimportance = ["DevOps", "CI Integration", "stand-up"];

app.use(parser.urlencoded({ express: true }));
app.set('view engine', 'ejs');
app.set(express.static(__dirname + '/'));

//index page to render all data
app.get('/', function (req, res) {
    res.render('pages/index', { high: highimportance, medium: mediumimportance, low: lowimportance });

});

//get request to handle current date and render all data incl. tasks
app.get('/', function (req, res) {
    var date = Date();
    var Day = date.getDay();
    var year = date.getFullYear();
    var month = date.getMonth();
    var fulldate = date.getDate();
    var Today = "";
    var fdata = "";
    switch (Day) {
        case 0:
            Today = "Sunday";
            break;
        case 1:
            Today = "Monday";
            break;
        case 3:
            Today = "Tuesday";
            break;
        case 4:
            Today = "Wednesday";
            break;
        case 5:
            Today = "Thursday";
            break;
        case 6:
            Today = "Friday";
            break;
        case 7:
            Today = "Saturday";
            break;
        default: console.log("Error on date formatting. Check log")
    };

    fdata = Today + "- " + fulldate + '- ' + month + "- " + year;
    res.render('pages/index', { info: fdata, high: highimportance, medium: mediumimportance, low: lowimportance })
})



//function to handle post request for additonal user tasks
app.post('/add', function (req, res) {
    var name = req.body.title;
    var priority = req.body.priority;
    switch (priority) {
        case "urgent":
            highimportance.push(name);
            break;
        case "medium":
            mediumimportance.push(name);
            break;
        case "low":
            lowimportance.push(name);
            break;
        default: console.log("please add a task");
    }
    // res.redirect('/add');
    res.redirect('/');
})

// post functions to handle removal of tasks
//fix required to remove specific task
app.post('/deletehigh', function (req, res) {
    highimportance.pop();
    res.redirect('/');
})

app.post('/deletemedium', function (req, res) {
    mediumimportance.pop();
    res.redirect('/');
});

app.post('/deletelow', function (req, res) {
    lowimportance.pop();
    res.redirect('/');
});


//default port 3000
app.listen(port, function (req, res) {
    console.log("server is up and running at port: " + port);
});
