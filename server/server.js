const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.send(('hello from the server'));
});
app.get('/gamepage', function (req, res){
    console.log('gamepage')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost${PORT}`);
})