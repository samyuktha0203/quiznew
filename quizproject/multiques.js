var one, timer
function function1(selected) {
    const todo = {
        "questionno": one,
        "option1": selected
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
            console.log(submitjson)
            if (submitjson.question =="incorrect") {
                alert("incorrect answer")
            }
            else {
                quiz(submitjson)
                one = submitjson.question[0].questionno;
                clearInterval(timer);
                time();
            }
        })
}