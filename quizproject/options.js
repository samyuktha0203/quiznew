function function1(selected) {
    const todo = {
        "questionno": "1", "Answer": selected
    };
    fetch('http://localhost:3000/option', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
}