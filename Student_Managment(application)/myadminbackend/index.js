var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient; 
var ObjectId = require('mongodb').ObjectId;
var path = require('path');
const { Collection } = require('mongodb');

var app = express();
// "CORS” stands for Cross-Origin Resource Sharing. It allows you to make requests from one website to another website in the browser
app.use(cors());

// Now we need to create object for MongoClient
var client = new MongoClient('mongodb+srv://aman29:TryYourBest@cluster0.pxfu8.mongodb.net/school29?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true});
var connection;
client.connect((err,db)=>{
    if(!err){
        connection=db;
        console.log("database connected successfully");
    }
    else{
        console.log("Error Occured");
    }
})
// Now let's create api for crud
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.sendFile('index.html')
});
app.get('/list-students',(req,res)=>{
    var studentCollection = connection.db('school29').collection('student78');
    studentCollection.find().toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs});
        }
        else{
            res.send({status:"failed",data:err});
        }
    })
});
app.get('/student-by-Id', (req, res) => {
    // console.log("inside api");
    var studentCollection = connection.db('school29').collection('student78');
    studentCollection.find({_id:ObjectId(req.query.id)}).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs });
        }
        else {
            res.send({ status: "failed", data: err });
        }
    })
});
app.get('/delete-student', (req,res)=>{
    var studentCollection = connection.db('school29').collection('student78');
    studentCollection.remove({_id:ObjectId(req.query.id)},(err,result)=>{
        if(!err){
            res.send({status:"ok",data:"student data deleted succesfully"});
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
});
app.post('/create-student',bodyParser.json(), (req,res)=>{
    var studentCollection = connection.db('school29').collection('student78');
    studentCollection.insert(req.body,(err,result)=>{
        if(!err){
            res.send({status:"ok",data:"student created Successfully"});
        }
        else{
            res.send({status:"failed", data:err})
        }
    })
});
app.post('/update-student',bodyParser.json(),(req,res)=>{
    var studentCollection = connection.db('school29').collection('student78');
    studentCollection.update({_id:ObjectId(req.body._id)},{$set:{name:req.body.name,age:req.body.age,marks:req.body.marks,email:req.body.email,city:req.body.city}},(err,result)=>{
        if(!err){
            res.send({status:"ok",data:"Student Updated Successfully"});
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
})

// now start the server
app.listen(3000,()=>{
    console.log("Server is started on port 3000 ");
});