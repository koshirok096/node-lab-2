
// Nodejs | CommonJS (no express)

// const http = require('http');

// const server = http.createServer((req, res) => {
// });

// server.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });

// exoress | ESM

import express from "express";
import fs from "fs";

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello Node!</h1><a href="read-message">Read Message</a> <a href="write-message">Write Message</a>');
});

app.get('/read-message', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(`Messages: <br>${data}<br><a href="/">Back to Home</a>`);
      }
    });
  });
  
app.get('/write-message', (req, res) => {
    const formContent = `
      <form method="POST" action="/write-message">
        <input type="text" name="message" placeholder="Enter Something" />
        <button type="submit">Submit</button>
      </form>
    `;
    res.send(formContent);
});  

app.post('/write-message', (req, res) => {
    let buffers = [];
  
    req.on('data', (chunk) => {
      buffers.push(chunk);
    });
  
    req.on('end', () => {
      const buffer = Buffer.concat(buffers);
      const message = decodeURIComponent(buffer.toString().replace('message=', ''));
      
      fs.appendFile('messages.txt', message + '\n', (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.send(`Submitted message: ${message} <a href="/">Back to Home</a>`);
        }
      });
    });
  });
  

  app.listen(8000, () => {
      console.log('Server is running on port 8000');
});

