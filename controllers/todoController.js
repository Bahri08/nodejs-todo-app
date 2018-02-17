const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
var db = JSON.parse(fs.readFileSync('mlab.json', 'utf8'));
console.log(db);


//Connect to the database
mongoose.connect('mongodb://'+db.db_user+':'+db.db_pwd+'@ds121118.mlab.com:21118/mytodo-db-8');
console.log('Connected to the TODO database..');

//Create a schema..
var todoSchema = new mongoose.Schema({
    item: String,
});

//Create a Todo Model
var Todo = mongoose.model('Todo', todoSchema);

//Create a new Object (Todo) and save it
// var itemOne=Todo({item:'Test Todo'}).save(function (err) {
//     if (err) 
//         throw err;
//     console.log('Item Saved');

// });


//var data = [{ item: 'Code' }, { item: 'Eat' }, { item: 'Chill' }, { item: 'Sleep' }];


const urlEncoded = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        //Get data from MongoDB and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlEncoded, function (req, res) {
        var newItem=Todo(req.body).save(function (err,data) {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function (req, res) {
        //Delete the requested item from MongoDB
        Todo.find({item:req.params.item.replace(/\-/g,' ')}).remove(function (err,data) {
            if(err) throw err;
            res.json(data);
        })

        // data = data.filter(function (todo) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });


}