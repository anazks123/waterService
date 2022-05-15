var express = require('express');
// const app = require('../app');
var router = express.Router();
var con=require('../config/config');
router.get('/',(req,res)=>{
    res.render('boy/boyLogin')
})
router.get('/reg',(req,res)=>{
    res.render('boy/boyReg')
})
router.post('/register',(req,res)=>{
    console.log(req.body);
    data=req.body;
    var email=req.body.email;
    var sql1="select * from boy where email=?"
    var sql2="insert into boy set ?"
    con.query(sql1,[email],(err,result)=>{
    if(err){
        console.log(err)
      }
      else{
        if(result.length>0){
          console.log("This email id has been already taken.")
          var msg="This email id has been already taken."
          res.render('boy/userReg',{msg,homepage:true})
        }
        else{
          con.query(sql2,data,(err,result)=>{
            if(err){
              console.log(err)
            } 
            else{
              var msg="Login to continue"
              console.log("success")
              res.redirect('/boy/')
            }
          })
        }
      }
    })
 })



 router.post('/userLogin',(req,res)=>{
    console.log(req.body);
    var email=req.body.email;
    var pass=req.body.password;
    var sql="select * from boy where email=? and password=?"
    con.query(sql,[email,pass],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        if(result.length > 0){
            console.log("login successfull")
            req.session.user=result[0];
            res.redirect('/boy/boyhome')
        }else{
          console.log("login error")
        }
      }
    })
  })
  router.get('/boyhome',(req,res)=>{
      var user = req.session.user;
      var id = req.session.user.id;
      var sql ="select * from orders where boy = ?"
      con.query(sql,[id],(err,row)=>{
          if(err){
              console.log(err)
          }else{
            res.render('boy/boyhome',{user,data:row})
          }
      })
  })
  router.get('/pickUP/:id',(req,res)=>{
    var id = req.params.id;
    sql = "update orders set orderStatus = 'pickedup' where id = ?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/boy/boyhome/')
      }
    })
  })
  router.get('/closed/:id',(req,res)=>{
    var id = req.params.id;
    sql = "update orders set orderStatus = 'closed' where id = ?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/boy/boyhome/')
      }
    })
  })

  router.get('/avail/:id',(req,res)=>{
    var id = req.params.id;
    sql = "update boy set status = 'fee' where id = ?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/boy/boyhome/')
      }
    })
  })
  router.get('/bussy/:id',(req,res)=>{
    var id = req.params.id;
    sql = "update boy set status = 'bussy' where id = ?"
    con.query(sql,[id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/boy/boyhome/')
      }
    })
  })
  
  router.get('/logout',(req,res)=>{
      req.session.destroy()
      res.redirect('/boy/')
  })
module.exports = router;