const express=require('express');
const todoController=require('./controllers/todoController');
var app=express();


//Set up View Engine
app.set('view engine','ejs');

//Static files
app.use(express.static('./public'));


//Fire controller
todoController(app);

//Fire up the serve
app.listen(3000);
console.log('Server up and listening to port 3000...');
