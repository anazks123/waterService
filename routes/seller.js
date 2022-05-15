var express = require('express');
var router = express.Router();
var con=require('../config/config');
var nodemailer = require('nodemailer');
/* GET home page. */


router.get('/',(req,res)=>{
    res.render('seller/sellerLogin',{homepage:true})
})
router.get('/delete/:id',(req,res)=>{
  var id = req.params.id;
  var sql="delete from product where id = ?"
  con.query(sql,[id],(err,row)=>{
    if(err){
      console.log(err)
    }else{
        res.redirect('/seller/sellerHome/')
    }
  })
  // res.render('seller/sellerLogin',{homepage:true})
})
router.get('/sellerHome',(req,res)=>{
    var sql="select * from product where sellerID = ?"
    var id= req.session.user.id;
    sql2= "select * from offer"
  con.query(sql,[id],(err,result)=>{
    if(err){
      console.log(err)
    }
    else{

      con.query(sql2,(err,row)=>{
        var user = req.session.user;
        console.log(row)
        res.render('seller/sellerHome',{result,user,offer:row});
      })
 
    }
  })
})
router.get('/register',(req,res)=>{
    res.render('seller/sellerRegister')
})
 router.post('/register',(req,res)=>{
    console.log(req.body);
    data=req.body;
    var email=req.body.email;
    var sql1="select * from seller where email=?"
    var sql2="insert into seller set ?"
    con.query(sql1,[email],(err,result)=>{
    if(err){
        console.log(err)
      }
      else{
        if(result.length>0){
          console.log("This email id has been already taken.")
          var msg="This email id has been already taken."
          res.render('user/userReg',{msg,homepage:true})
        }
        else{
          con.query(sql2,data,(err,result)=>{
            if(err){
              console.log(err)
            } 
            else{
              var msg="Login to continue"
              console.log("success")
              res.redirect('/sellerhome')
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
    var sql="select * from seller where email=? and password=?"
    con.query(sql,[email,pass],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        if(result.length > 0){
            console.log("login successfull")
            req.session.user=result[0];
            res.redirect('/seller/sellerHome')
        }else{
          console.log("login error")
        }
      }
    })
  })



  router.post('/addProduct',function(req,res){
    var image_name;
    if(!req.files) return res.status(400).send("no files were uploaded.");
    
    var file=req.files.uploaded_image;
    var image_name = file.name;
    let sql="INSERT INTO product SET ?";
    
    console.log(file)
    console.log(image_name);
    if(file.mimetype =="image/jpeg" || file.mimetype =="image/png" || file.mimetype =="image/gif"
    ){
      file.mv("public/images/product/"+file.name,function(err){
        if(err) return res.status(500).send(err);
        console.log(image_name);
    
    let data={
     
      Product_name:req.body.name,
      Description:req.body.description,
      Price:req.body.price,
      Image:image_name,
      sellerID:req.session.user.id
    }; 
    console.log(data)
    con.query(sql,data,(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/seller/sellerHome')

      }
    })
    }) 
    } 
    })



    router.get("/orders",(req,res)=>{
      var user=req.session.user;
      var email=req.session.user.id;
    
      var sql="SELECT product.Price,product.Image,product.Description,product.id,orders.status,orders.email,orders.amount,orders.id FROM product INNER JOIN orders ON product.id = orders.Product_id AND orders.sellerid=?;"
      con.query(sql,[email],(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          var sql2='select * from boy where status = "free"'
          con.query(sql2,(err,result2)=>{
            if(err){
              console.log(err)
            }else{
              res.render('seller/orders',{product:result,user,homepage:true,data:result2})
            }
          })
    
        }
      })
    })
    router.get('/placeOrder/:id/:mail',(req,res)=>{
      var id = req.params.id;
      var mail = req.params.mail;
      sql = "update orders set status = 'order placed' where id = ?"
      con.query(sql,[id],(err,result)=>{
        if(err){
          console.log(err)
        }else{


          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'anazksunil2@gmail.com',  
              pass: 'Sindhumnjw813',
            },
            tls:{
              rejectUnauthorized : false,
            },
          });
          let mailOptions = {
            from: 'seed cartTeam',
            to: mail,
            subject: 'Order Placed',
            text: `your Order is placed now item will reach you as soon as possible stay happy with seedcart thank you!!!!`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.redirect('/seller/sellerHome')
        }
      })
    })


    router.get('/shipped/:id/:mail',(req,res)=>{
      var id = req.params.id;
      var mail = req.params.mail;
      sql = "update orders set status = 'Shipped' where id = ?"
      con.query(sql,[id],(err,result)=>{
        if(err){
          console.log(err)
        }else{



          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'greencartkottayam@gmail.com',
              pass: 'ashwinbabu@123',
            },
            tls:{
              rejectUnauthorized : false,
            },
          });
          let mailOptions = {
            from: 'seed cartTeam',
            to: mail,
            subject: 'Shipped',
            text: `your Order is shipped now item will reach you as soon as possible stay happy with seedcart thank you!!!!`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.redirect('/seller/sellerHome')
        }
      })
    })
    router.get('/logout',(req,res)=>{
      req.session.destroy()
      res.redirect('/seller')
    })

    router.get('/deliver/:id/:mail',(req,res)=>{
      var mail = req.params.email;
      var id = req.params.id;
      sql = "update orders set status = 'deliver today' where id = ?"
      con.query(sql,[id],(err,result)=>{
        if(err){
          console.log(err)
        }else{

          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'anazksunil2@gmail.com',
              pass: 'Sindhumnjw813',
            },
            tls:{
              rejectUnauthorized : false,
            },
          });
          let mailOptions = {
            from: 'seed cartTeam',
            to: mail,
            subject: 'Delever today',
            text: `your Order will Deliver today item will reach you as soon as possible stay happy with seedcart thank you!!!!`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.redirect('/seller/sellerHome')
        }
      })
    })

router.post('/addblog',(req,res)=>{
var image_name;
if(!req.files) return res.status(400).send("no files were uploaded.");

var file=req.files.image;
var image_name = file.name;
let sql="INSERT INTO blog SET ?";

console.log(file)
console.log(image_name);
if(file.mimetype =="image/jpeg" || file.mimetype =="image/png" || file.mimetype =="image/gif"
){
  file.mv("public/images/blogs/"+file.name,function(err){
    if(err) return res.status(500).send(err);
    console.log(image_name);

let data={
 
  sellerID:req.session.user.id,
  discription:req.body.discription,
  img:image_name,
}; 
console.log(data)
con.query(sql,data,(err,result)=>{
  if(err){
    console.log(err)
  }else{
    res.redirect('/seller/sellerHome')

  }
})
}) 
} 
    })
    router.get('/blogView',(req,res)=>{
      // sql5="SELECT  * from blog and SUM(set_Like) as sum FROM likes;"
      var user = req.session.user;

      sql="select * from blog "
      var likesTotal;
        con.query(sql,(err,result)=>{
        if(err){
          console.log(err)
        }else{
           console.log(err)
         
         res.render('seller/blogs',{blog:result,user})
    
        }
      })
    })


    router.get('/like/:id',(req,res)=>{
      var usermail = req.session.user.email;
      var pid = req.params.id;
      var data = {
        usermail:usermail,
        pid:pid

      }
      sql="select * from likes where usermail = ? and pid = ?"
      con.query(sql,[usermail,pid],(err,result)=>{
        if(err){
          console.log(err)
        }else{
          if(result.length>0){
              var message = "Liked"
              //already liked
              console.log("liked already")
              res.redirect('/seller/blogView')
            
          }else{
              sql2 = "insert into likes set ?"
              con.query(sql2,data,(err,row)=>{
                if(err){
                  console.log(err)
                }else{
                    console.log("liked now")
                    var getsum="SELECT SUM(set_Like) as sum FROM likes where  pid = ? ;"
                    con.query(getsum,[pid],(err,getLikes)=>{
                      if(err){
                        console.log(err)
                      }else{
                        var likes = getLikes[0].sum;
                        console.log(getLikes)
                        var updateSql = "update blog set likes = ? where id = ?"
                        con.query(updateSql,[likes,pid],(err,result)=>{
                          if(err){
                            console.log(err)
                          }else{
                            res.redirect('/seller/blogView')
                          }
                        })
                      }
                    })
                    // res.redirect('/seller/blogView')
                }
              })
          }
        }
      })
      
    })


    router.get('/application',(req,res)=>{
      sql="select * from jobs"
      var user = req.session.user;
      con.query(sql,(err,result)=>{
        if(err){
          console.log(err)
        }else{
          console.log(result)
          res.render('seller/application',{applications:result,user,homepage:true})
        }
      })
    })

    router.get('/invite/:mail/seller',(req,res)=>{
      var usermail = req.params.mail;
      var seller = req.params.seller;
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'anazksunil2@gmail.com',
          pass: 'Sindhumnjw813',
        },
        tls:{
          rejectUnauthorized : false,
        },
      });
      let mailOptions = {
        from: 'seed cartTeam',
        to: usermail,
        subject: 'Invitation',
        text: `you are invited by ${seller} to join with our team plese contact to the given mail with your biodata thank you!!!!!`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
    })
  router.post('/addoffer',(req,res)=>{
    var image_name;
    if(!req.files) return res.status(400).send("no files were uploaded.");
    
    var file=req.files.uploaded_image;
    var image_name = file.name;
    let sql="INSERT INTO offer SET ?";
    
    console.log(file)
    console.log(image_name);
    if(file.mimetype =="image/jpeg" || file.mimetype =="image/png" || file.mimetype =="image/gif"
    ){
      file.mv("public/images/offer/"+file.name,function(err){
        if(err) return res.status(500).send(err);
        console.log(image_name);
    
    let data={
     
      mail:req.session.user.email,
      img:image_name
    }; 
    console.log(data)
    con.query(sql,data,(err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/seller/sellerHome')

      }
    })
    }) 
    } 
    })
    router.post('/addboy',(req,res)=>{
      var id = req.body.id;
      var bid = req.body.boyid;
      var sql ="update orders  set boy = ? where id = ?"
      con.query(sql,[bid,id],(err,row)=>{
          if(err){
              console.log(err)
          }else{
              res.redirect('/seller/sellerHome')
          }
      })
      })
module.exports = router;

