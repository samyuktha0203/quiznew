"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('quizproject'))

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());

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
    }];

app.post('/option', (req, res) => {
    console.log(req.body.questionno);
    let fil = answerbank.filter(questions => questions.questionno == req.body.questionno);
    console.log(fil);
    var red = JSON.stringify(req.body) != JSON.stringify(fil[0]) ? 'incorrect' : 'correct';
    console.log(red);
    //res.send({ "answer": red });
    if (red == "correct") {
        //console.log(req.body.questionno);
        var qno = Number(req.body.questionno) + 1
        console.log(qno);
        let fil2 = todo.filter(questions => questions.questionno == qno.toString());
        console.log(fil2);
        res.send({ "question": fil2 });
    }
    else {
        res.send({ "question": "incorrect" });
    }
});

app.get('/quesone', (req, res) => {
    let fil1 = todo.filter(questions => questions.questionno == "1");
    console.log(fil1);
    res.send({"question": fil1});
});