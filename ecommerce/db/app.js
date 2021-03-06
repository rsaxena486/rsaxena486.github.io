//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine" , "ejs");

mongoose.connect("mongodb://localhost:27017/secretsUserDB" , {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
  name : String,
  username : String,
  password : String
});

const User = new mongoose.model("User" , userSchema);

app.get("/" , function(req , res){
  res.render("home");
});

app.get("/login" , function(req , res){
  res.render("login");
});

app.get("/register" , function(req , res){
  res.render("register");
});

app.post("/register" , function(req , res){
  const username = req.body.username;
      User.findOne({username: req.body.username}, function(err, userfound) {
        if (err) {
            alert(err)
            if (user) {
                alert('this username is already exist. Please try login.')
                console.log('there was a user');
                return false;

            }
        }
    });
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      const newUser = new User({
        name : req.body.name,
        username : req.body.username,
        password : hash
        });
        User.findOne
        newUser.save((err) => {
          if(err){
            console.log(err);
           }else{
            res.render("secrets");
          }
      });
  });
});

app.post("/login" , function(req , res){
    const username = req.body.username;
    const password = req.body.password;
  User.findOne({username : username},(err , founduser) => {
   if(err){
     console.log(err);
   }else{
     if(founduser){
      bcrypt.compare(password, founduser.password, function(err, result) {
        if(result === true){
          res.render("secrets");
        }
    });
     }
   }
  });
});

app.listen(3000 , function(){
  console.log("Server is running on port 3000");
});
