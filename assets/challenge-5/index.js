const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
let users = require('./users.json');

app.set('view engine', 'ejs');

app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
    response.render('index');
});

app.get('/ch-4', (request, response) => {
    response.render('ch-4');
});

/*
    {
        id: 2
        username: 'username2',
        password: 'password2
    }
*/

app.post('/login', (request, response) => {
    const { username, password } = request.body;
    const user = users.find(user => user.username === username);
    if (user) {
        if(user.password === password) {
            response.status(200).json({ status: 'logged-in', ...user });
            
        } else {
            response.status(403).json({ status: 'invalid-password' });
        }
    } else {
        response.status(404).json({ status: 'no-username' });
    }
})

app.listen(port, () => {
    console.log('Aplikasi berhasil dijalankan dengan port: ', port);
});