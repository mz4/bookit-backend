const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const todoModel = require('./models/bookmark');
const bodyParser = require('body-parser');
const schema = require('./schema');
const cors = require('cors')
const app = express();
app.use(cors())
const MONGO_URI = 'mongodb+srv://mat123:ciao123@clustera-wovoo.mongodb.net/test?retryWrites=true&w=majority'
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));  

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  res.redirect('/graphql');
});

app.listen(4000, () => {
  console.log('Listening at 4000');
});
