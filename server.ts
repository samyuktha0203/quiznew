"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

var mysql = require('mysql');

app.use(express.static('quizproject'))

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "samyuktha",
    database: "sam2"
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    con.query("Select * from userandanswer", function (err, result, fields) {
        if (err)
            throw err;
        console.log(result);
    });
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

const fs = require('fs');
//const dir = 'C:/Github/QuizNew/quiznew/questions';
const dir = './questions';
var ran
fs.readdir(dir, (err, files) => {
    console.log(files.length);
    ran = files.length;
});

const todo = [{
    "questionno": "1",
    "question": "who is the author of harry potter?",
    "option1": "jkrowling",
    "option2": "rknarayan",
    "option3": "carolyn",
    "option4": "charles"
},
{
    "questionno": "2",
    "question": "who invented javascript?",
    "option1": "brendan",
    "option2": "sheryl",
    "option3": "douglas",
    "option4": "john"
},
{
    "questionno": "3",
    "question": "what is india's national sport?",
    "option1": "hockey",
    "option2": "cricket",
    "option3": "football",
    "option4": "tennis"
}
];

const ques = {
    "questionno": "1", "Answer": "Blue"
}

const answerbank = [{
    "questionno": "1",
    "option1": "option1",
}, {
    "questionno": "2",
    "option1": "option1",
},
{
    "questionno": "3",
    "option1": "option1"
    },
    {
        "questionno": "4",
        "option1": "option2"
    },
    {
        "questionno": "5",
        "option1": "option1"
    },
    {
        "questionno": "6",
        "option1": "option1"
    },
    {
        "questionno": "7",
        "option1": "option1"
    },
    {
        "questionno": "8",
        "option1": "option1"
    },
    {
        "questionno": "9",
        "option1": "option3"
    },
    {
        "questionno": "10",
        "option1": "option4"
    }];

app.post('/option', (req, res) => {
    console.log(req.body);
    con.query("INSERT INTO userandanswer(username, questionno , answer) VALUES('" + req.body.username + "','" + req.body.questionno + "','" + req.body.option1 + "')", function (err, result, fields) {
        if (err)
            throw err;
        console.log(result);
    });
    let fil = answerbank.filter(questions => questions.questionno == req.body.questionno);
    console.log(fil[0].option1);
    //var red = JSON.stringify(req.body) != JSON.stringify(fil[0]) ? 'incorrect' : 'correct';
    //console.log(red);
    //res.send({ "answer": red });
    if (req.body.option1 == fil[0].option1)
    {
        //console.log(req.body.questionno);
        //var qno = Number(req.body.questionno) + 1
        //console.log(qno);
        //let fil2 = todo.filter(questions => questions.questionno == qno.toString());
        //console.log(fil2);
        //res.send({ "question": fil2 });
        let x = Math.floor((Math.random() * ran) + 1);
        console.log(x);
        while (req.body.qb.includes(x)) {
            //console.log("whilein")
            x = Math.floor((Math.random() * ran) + 1);
           
        }
        console.log(req.body.qb);
        var z = req.body.qb.push(x);
        console.log(req.body.qb)
        var rawdata = fs.readFileSync(dir + '/q' + x + '.json');
        var student = JSON.parse(rawdata);
        student.qb = req.body.qb

        res.send({ "question": student });
    }
    else
    {
        res.send({ "question": "incorrect" });
    }
});

app.get('/quesone', (req, res) => {
    //let fil1 = todo.filter(questions => questions.questionno == "1");
    //console.log(fil1);
    //res.send({"question": fil1});
    console.log("1");
    let x = Math.floor((Math.random() * ran) + 1);
    console.log(x);
    let rawdata = fs.readFileSync(dir + '/q' + x + '.json');
    let student = JSON.parse(rawdata);
    console.log(student);
    student.qb = [x];
    console.log(student);
    res.send({ "question": student });
 });
   
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
