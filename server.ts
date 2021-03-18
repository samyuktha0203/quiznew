"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express = require('express');
const router = express.Router();
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
    //con.query("Select * from userandanswer", function (err, result, fields) {
    //    if (err)
    //        throw err;
    //    console.log(result);
    //});
});

app.use(bodyParser.urlencoded({ extended: true }));

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
    console.log("test")
    console.log(req.body);
    let ansstat;
    let fil = answerbank.filter(questions => questions.questionno == req.body.questionno);
    //console.log(fil[0].option1);
    //var red = JSON.stringify(req.body) != JSON.stringify(fil[0]) ? 'incorrect' : 'correct';
    //console.log(red);
    //res.send({ "answer": red });
    if (req.body.option1 == fil[0].option1)
    {
        ansstat = "correct";
        //console.log(req.body.questionno);
        //var qno = Number(req.body.questionno) + 1
        //console.log(qno);
        //let fil2 = todo.filter(questions => questions.questionno == qno.toString());
        //console.log(fil2);
        //res.send({ "question": fil2 }); 
    }
    else
    {
        ansstat = "incorrect";
        //res.send({ "question": "incorrect" });
    }

    con.query("INSERT INTO userandanswer(username, questionno, answer, status) VALUES('" + req.body.username + "','" + req.body.questionno + "','" + req.body.option1 + "','" + ansstat + "')", function (err, result, fields) {
        if (err)
            throw err;
       // console.log(result);
    });

    let x = Math.floor((Math.random() * ran) + 1);
   // console.log(x);
    //if (req.body.qb.length < ran) {
    //    while (req.body.qb.includes(x)) {
    //        //console.log("whilein")
    //        x = Math.floor((Math.random() * ran) + 1);
    //    }
    //    console.log(req.body.qb);
    //    var z = req.body.qb.push(x);
    //    console.log(req.body.qb)
    place(req.body.qb, res)
    console.log(req.body.qb)
        //var rawdata = fs.readFileSync(dir + '/q' + x + '.json');
        //var student = JSON.parse(rawdata);
        //student.qb = req.body.qb
        //res.send({ "question": student });
    
});

function place(qb, res) {
    let x = Math.floor((Math.random() * ran) + 1);
    console.log("qb")
    console.log(qb)
    if (qb.length < ran) {
        let x = Math.floor((Math.random() * ran) + 1);
        while (qb.includes(x)) {
            //console.log("whilein")
            x = Math.floor((Math.random() * ran) + 1);
        }
        console.log(qb);
        var z = qb.push(x);
        console.log(qb)
        var rawdata = fs.readFileSync(dir + '/q' + x + '.json');
        var student = JSON.parse(rawdata);
        student.qb = qb;
        res.send({ "question": student });
    }
    else {
        //res.sendFile('HTMLPage1.html', { root: './quizproject' })

        //console.log("redirect")
        res.send({ "ref": "blue" }); 
        //res.redirect(303, '/HTMLPage1.html');
          //res.redirect('/test');
        //res.writeHead(302, { location: '/HTMLPage1.html' });
        //res.end();
    }
}
app.post('/quesone', (req, res) => {
    //let fil1 = todo.filter(questions => questions.questionno == "1");
    //console.log(fil1);
    //res.send({"question": fil1});
    //console.log("1");
    let x = Math.floor((Math.random() * ran) + 1);
    console.log(x);
    let rawdata = fs.readFileSync(dir + '/q' + x + '.json');
    let student = JSON.parse(rawdata);
    console.log(student);
    student.qb = [x];
    console.log(student);
    //res.send({ "question": student });
    //console.log(req.body.username);
    con.query("SELECT * FROM userandanswer where username='" + req.body.username + "'", function (err, result, fields) {
        if (err)
            throw err;
        console.log(req.body.username);
        console.log(result);
        if (result === undefined || result.length == 0) {
            //console.log("c")
            x = Math.floor((Math.random() * ran) + 1);
            console.log(x);
            rawdata = fs.readFileSync(dir + '/q' + x + '.json');
            student = JSON.parse(rawdata);
            console.log(student);
            student.qb = [x];
            console.log(student);
            res.send({ "question": student });
        }
        else {
            var arr=[];
            //console.log("S")
            result.forEach(function (item) {
                //console.log(item.questionno);
                arr.push(item.questionno);
            })
            console.log(arr);
           
            console.log(x);
            place(arr, res);
            console.log(arr);
        }
    });
});

//app.get('/test', (req, res) => {
//    console.log("redirect")
//    res.sendFile(__dirname +'/quizproject/HTMLPage1.html');
//    //res.redirect('/HTMLPage1.html');
//});

app.post('/count', (req, res) => {
    con.query("SELECT count(*) as answer FROM userandanswer where status='correct' and username='" + req.body.username + "'", function (err, result, fields) {
        if (!err) {
            console.log(req.body)
            console.log(result);
            //res.send({"key": [{ "correct": result }, { "ran": ran }]})
            res.send({ "correct": result[0].answer, "totalscore": ran });
        } else {
            console.log(err);
        }
    })
});

var ar = [];
app.get('/join', (req, res) => {
    //console.log(dir)
    let filenames = fs.readdirSync(dir);
    filenames.forEach((file) => {
        var rawdata = fs.readFileSync(dir + '/' + file);
        //console.log("File:", file);
        let fil = JSON.parse(rawdata);
        // console.log(fil);
        ar.push(fil)
    })
    //console.log(ar)
});

app.get('/selected', (req, res) => {
    con.query("SELECT questionno,answer FROM userandanswer", function (err, result, fields) {
        if (!err) {
            console.log(result);
        } else {
            console.log(err);
        }
    })
});

var ar1 = [];
app.get('/viewtable', (req, res) => {
    con.query("SELECT questionno,answer,status FROM userandanswer", function (err, result, fields) {
        if (!err) {
            //console.log(result);
            //result.forEach(function (item) {
            //    //console.log(item.status)
            //})
            ar1 = ar.map(function (item) {
                //console.log(item.questionno)
                let correctans = answerbank.filter(answers => answers.questionno == item.questionno);
                let selectedans = result.filter(selanswers => selanswers.questionno == item.questionno);
                let status = result.filter(stat => stat.questionno == item.questionno);
                //console.log(status[0].status)
                //console.log(selectedans[0].answer);

                //console.log(correctans[0].option1);
                //console.log(item[correctans[0].option1])

                return { "question": item.question, "answer": item[correctans[0].option1], "selectedanswer": item[selectedans[0].answer], "status": status[0].status};
            });
            console.log(ar1);
        }
        else {
            console.log(err);
        }
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});