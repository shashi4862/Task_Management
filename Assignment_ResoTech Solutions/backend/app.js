const express = require('express');
const app=express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//IMPORT ROUTES
const taskM = require('./routes/task_M');
const auth = require('./routes/AuthRoute');


//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({
    limit:"5mb"
}));
app.use(bodyParser.urlencoded({
    limit:"5mb",
    extended: true
}));

app.use(cors());

//Route Middleware
app.use('/api', taskM);
app.use('/auth', auth);

//PORT
const port = 8000;
app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})
