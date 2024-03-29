import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import searchRouter from './routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use('/', cors(), searchRouter);
//app.get('/', cors(), function(req, res) {
//  res.json({message: 'Hello, World!'});
//});

app.listen(3001, () => console.log('Listening on port 3001.'));
