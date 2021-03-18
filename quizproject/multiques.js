var one, two, timer
function function1(selected) {
    const todo = {
        "username": username,
        "questionno": one,
        "option1": selected,
        "qb":two
    };
 
    fetch('http://localhost:3000/option', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(submitjson => {
            console.log(submitjson);
                quiz(submitjson)
                username;
                one = submitjson.question.questionno;
                two = submitjson.question.qb;
                clearInterval(timer);
                time();
        })
}