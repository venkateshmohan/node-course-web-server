const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
//setting ports by heroku for setting environment variable
const port= process.env.PORT || 3000;
var app=express(); //creating an express app
//Partials are registered for creating a part of code and then using it in another code
hbs.registerPartials(__dirname+'/views/partial')
app.set('view engine','hbs');
//Middleware to configure express server automatically
app.use(express.static(__dirname+'/public'));
//Helpers are used to create functions and use it dynamically! Refactoring & Reusability feature
//request method and url of expressjs website and callback err is used while appending file with contents
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log= `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
     if(err)
        console.log('Unable to connect to server.log');
  });
  next();
});
//Maintenance page is created using express middleware
/*app.use((req,res,next)=>{
    res.render('maintenance.hbs');
})*/
hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
   return text.toUpperCase();
})
//HTTP route handler to do a GET request and function to send response
app.get('/',(req,res)=>{
    //res.send('Hello express server');
    /*res.send({
      name:'Venky',
      likes:['singing','sleeping']
    });*/
    res.render('home.hbs',{
      pageTitle:'Homepage',
      welcomeMessage:'Welcome to my Homepage',
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
      pageTitle:'About page',
      currentDate: new Date().getDate()
    });
});
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
         pageTitle:'Projects'
    })
})
app.get('/bad',(req,res)=>{
    res.send({errorMessage:'Unable to handle request'
});
});
app.listen(port,()=>{
   console.log(`server is up on port ${port}`);
});
