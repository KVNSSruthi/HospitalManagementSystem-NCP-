var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('html'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insert(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('thankyou.html')

})

app.post("/login",(req,res)=>{
    var uname = req.body.uname;
    var pwd = req.body.pwd;

    var data = {
        "uname": uname,
        "pwd" : pwd
    }

    db.collection('loginusers').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index.html')

})



app.post("/admit",(req,res)=>{
    var aname = req.body.aname;
    var aemail = req.body.aemail;
    var aadd = req.body.aadd;
    var yes = req.body.yes;
    var no = req.body.no;
    var prob = req.body.prob;
    var data = {
        "aname": aname,
        "aemail": aemail,
        "aadd": aadd,
        "yes": yes,
        "no": no,
        "prob" : prob
    }

    db.collection('admit').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('thankyou.html')

})
app.put('/login', (req, res, next) => {
    const thing = new Thing({
      _id: req.params.id,
      uname: req.body.uname,
      pwd: req.body.pwd,
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.delete('/login', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('register.html');
}).listen(3000);

//db.COLLECTION_NAME.update({SELECTION_CRITERIA}, {$set:{UPDATED_DATA}}, { upsert: <boolean>,
   // multi: <boolean>,
    //writeConcern: <document>,
    //collation: <document>,
    //arrayFilters: [ <filterdocument1>, ... ],
   // hint:  <document|string>        
  //})

  //db.movies.deleteOne( { name: "sruthi" } )

console.log("Listening on PORT 3000");