require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(require('./routes'))


mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/trivia-maker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected to database'))
mongoose .set('debug', true)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost${PORT}`);
})

