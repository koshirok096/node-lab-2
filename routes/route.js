import { express } from "express";
// import { Router } from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('Root');
});

app.get('/read-message', (req, res) => {
    res.send('Read the message');
});

app.get('/write-message', (req, res) => {
    res.send('Write the message');
});

