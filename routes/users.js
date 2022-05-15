var express = require('express');
// const app = require('../app');
var router = express.Router();
var con = require('../config/config');
/* GET users listing. */
router.get('/', function (req, res, next) {
  if (!req.session.user) {
    return res.redirect('/users/userLogin')
  } else {
    var sql = "select * from product"
    sql3 = "select * from offer order by id DESC"
    var sql2 = "select userMail, count(*) as total FROM cart where userMail=?;"
    if (req.session.user) {
      var email = req.session.user.email;
    }
    var user = req.session.user;
    con.query(sql, (err, result) => {
      if (err) {
        res.redirect('/users/error')
        console.log(err)
      }
      else {
        console.log(result)
        let product = result;
        con.query(sql2, [email], (err, result) => {
          if (err) {
            console.log(err)
            res.redirect('/users/error')
          }
          else {
            con.query(sql3, (err, offer) => {
              if (err) {
                console.log(err)
              } else {
                var CartTotal = result[0].total;
                console.log(result)
                console.log("products===============", product)
                console.log(CartTotal)
                console.log(offer)
                var obj1 = offer[0].img;
                console.log(obj1)
                var obj2 = offer[1].img;
                var obj3 = offer[2].img;
                res.render('user/home', { product, user, CartTotal, obj1, obj2, obj3 });
              }
            })
          }
        })
      }
    })
  }
});
router.get('/userLogin', function (req, res, next) {
  res.render("user/userLogin", { homepage: true })
})

router.get('/userReg', function (req, res, next) {
  var msg = ""
  res.render("user/userReg", { msg, homepage: true })
})

router.get("/myorders", (req, res) => {
  var user = req.session.user;
  var email = req.session.user.email;

  var sql = "SELECT product.Price,product.Image,product.Description,product.id,orders.email,orders.status FROM product INNER JOIN orders ON product.id = orders.Product_id AND orders.email=?;"
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err)
      res.redirect('/users/error')
    }
    else {
      console.log("hhhhhhhhhhhhhhhhh", result)

      res.render('user/myorders', { product: result, user, homepage: true })
    }
  })
})

router.get("/cart/:mail", (req, res) => {
  sql = "SELECT product.Price,product.sellerID,product.Image,product.Description,product.id,cart.userMail, cart.qnty,cart.Id FROM product INNER JOIN cart ON product.id = cart.Product_id AND cart.userMail=?;"
  con.query(sql, [req.params.mail], (err, result) => {
    if (err) {
      console.log(err)
      res.redirect('/users/error')
    }
    else {
      console.log(result)
      if (result.length == 0) result = false;
      var user = req.session.user;
      res.render('user/cart', { homepage: true, product: result, user })
    }
  })


})
router.post('/Ulogin', (req, res) => {
  console.log(req.body);
  var email = req.body.email;
  var pass = req.body.password;
  var sql = "select * from user where email=? and pass=?"
  con.query(sql, [email, pass], (err, result) => {
    if (err) {
      console.log(err);
      res.redirect('/users/error')
    }
    else {
      if (result.length > 0) {
        console.log("login successfull")
        req.session.user = result[0];
        console.log("session", req.session.user)
        res.redirect('/users')
      } else {
        console.log("login error")
        var msg = "Invalid username or Password"
        res.render('user/userLogin', { msg, homepage: true });
      }
    }
  })
})
// console.log(req.body.mail)
router.post('/Ureg', (req, res) => {
  console.log(req.body);
  data = req.body;
  var email = req.body.email;
  var sql1 = "select * from user where email=?"
  var sql2 = "insert into user set ?"
  con.query(sql1, [email], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      if (result.length > 0) {
        console.log("This email id has been already taken.")
        var msg = "This email id has been already taken."
        res.render('user/userReg', { msg, homepage: true })
      }
      else {
        con.query(sql2, data, (err, result) => {
          if (err) {
            console.log(err)
          }
          else {
            var msg = "Login to continue"
            console.log("success")
            res.redirect('/users')
          }
        })
      }
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/users')
})
router.get('/jobs', (req, res) => {
  var user = req.session.user;
  sql = "select * from seller"
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.render('user/jobs', { jobs: result, user, homepage: true })
    }
  })
})
router.get('/update/:email', (req, res) => {
  var email = req.params.email;
  console.log(email);
  var sql = "select * from user where email= ?"
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      var userData = result[0];
      res.render('user/userEdit', { userData })
    }
  })
})
router.post('/updateInfo', (req, res) => {
  var data = req.body;
  console.log(data);
  var id = req.body.id;
  var sql2 = `update user set ? where id=${id}`
  con.query(sql2, data, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      var sql3 = `select * from user where id=${id}`
      con.query(sql3, (err, row) => {
        if (err) {
          console.log(err)
        }
        else {
          req.session.user = row[0];
          res.redirect('/users/')
        }

      })

    }
  })
})
router.get("/addtoCart/:Pid", (req, res) => {
  if (req.session.user) {
    var Pid = req.params.Pid;
    var email = req.session.user.email;
    var qdata;
    sql = "select * from cart where userMail= ? and Product_id= ?";
    sql2 = "update cart set qnty = ? where userMail = ? and Product_id= ?";
    sql3 = "  INSERT INTO cart (userMail, Product_id) VALUES (?,?);"
    con.query(sql, [email, Pid], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result.length > 0) {
          console.log("this product is already added");
          console.log(result);
          qdata = result[0].qnty + 1;
          con.query(sql2, [qdata, email, Pid], (err, result) => {
            if (err) {
              console.log(err)
            } else {
              res.redirect('/users/')
            }
          })


        } else {
          console.log("cart not added")
          con.query(sql3, [email, Pid], (err, result) => {
            if (err) {
              console.log(err)
            } else {
              res.redirect('/users/')
            }
          })


        }
      }
    })
  } else {
    res.render("user/userLogin", { homepage: true })
  }
})

router.get("/remove/:Id", (req, res) => {
  var id = req.params.Id;
  console.log(id)
  sql = "DELETE FROM cart where Id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect('/users')
    }
  })
})


// res.render('user/payment',{homepage:true,product:result[0],user,total_amount})
router.get("/qnty_increment/:Id", (req, res) => {
  var id = req.params.Id;
  console.log(id)
  var mail = req.session.user.email;
  console.log(mail)
  sql = "update cart set qnty = ? where userMail = ? and Id= ?"
  sql2 = "select * from cart where userMail = ? and Id  = ?"
  sql3 = "SELECT product.Price,product.sellerID,product.id,product.Image,product.Description,cart.userMail, cart.qnty,cart.Id FROM product INNER JOIN cart ON product.id = cart.Product_id AND cart.userMail=?;"

  con.query(sql2, [mail, id], (err, result1) => {
    if (err) {
      console.log(err)
    }
    else {
      var q = result1[0].qnty + 1;
      con.query(sql, [q, mail, id], (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          con.query(sql3, [mail], (err, row) => {
            if (err) {
              console.log(err)
            }
            else {
              console.log(row)
              var user = req.session.user;

              res.render('user/cart', { homepage: true, product: row, user })
              console.log(row)
            }
          })
        }
      })
    }
  })
})
router.get("/qnty_decrement/:Id", (req, res) => {
  var id = req.params.Id;
  console.log(id)
  var mail = req.session.user.email;
  console.log(mail)
  sql = "update cart set qnty = ? where userMail = ? and Id= ?"
  sql2 = "select * from cart where userMail = ? and Id  = ?"
  sql3 = "SELECT product.Price,product.id,product.sellerID,product.Image,product.Description,cart.userMail, cart.qnty,cart.Id FROM product INNER JOIN cart ON product.id = cart.Product_id AND cart.userMail=?;"

  con.query(sql2, [mail, id], (err, result1) => {
    if (err) {
      console.log(err)
    }
    else {
      var q = result1[0].qnty - 1;
      con.query(sql, [q, mail, id], (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          con.query(sql3, [mail], (err, row) => {
            if (err) {
              console.log(err)
            }
            else {
              console.log(row)
              var user = req.session.user;
              res.render('user/cart', { homepage: true, product: row, user })
              console.log(row)
            }
          })
        }
      })
    }
  })
})
router.get('/buynow/:id/:price/:q/:seller', (req, res) => {
  if (req.session.user) {
    var pid = req.params.id;
    var sellerid = req.params.seller;
    console.log(pid)
    var email = req.session.user.email;
    console.log(email)
    var price = req.params.price;
    var user = req.session.user;
    total = price * req.params.q;
    console.log(total)
    res.render('user/payment', { homepage: true, email, pid, total, sellerid })
  } else {
    res.render("user/userLogin", { homepage: true })
  }
})

router.post('/payment', (req, res) => {
  console.log(req.body)
  var email = req.session.user.email;
  var Pid = req.body.Product_id;
  var amount = req.body.amount;
  var sellerid = req.body.sellerid;
  var data = {
    email: email,
    Product_id: Pid,
    amount: amount,
    sellerid: sellerid
  }

  console.log("to oreders,", data)
  console.log(data)
  sql = "insert into orders set ?"
  // sql="SELECT product.Price,product.Image,product.Description,orders.email,orders.Product_id FROM product INNER JOIN orders ON product.id = orders.Product_id AND orders.email=?;"
  con.query(sql, data, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect('/users')
    }
  })
})

router.get('/applayJobs/:mail', (req, res) => {
  var sellerMail = req.params.mail;
  var userMail = req.session.user.email;
  sql = "insert into jobs set ?"
  var data = {
    sellerMail,
    userMail

  }
  con.query(sql, data, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log("inserted to jobs")
      res.redirect('/users/')
    }
  })
})
router.get('/error', (req, res) => {
  res.render('user/uerror', { homepage: true })
})
router.get('/blogView', (req, res) => {
  // sql5="SELECT  * from blog and SUM(set_Like) as sum FROM likes;"
  var user = req.session.user;

  sql = "select * from blog "
  var likesTotal;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(err)

      res.render('user/blogview', { blog: result, user, homepage: true })

    }
  })
})


router.get('/like/:id', (req, res) => {
  var usermail = req.session.user.email;
  var pid = req.params.id;
  var data = {
    usermail: usermail,
    pid: pid

  }
  sql = "select * from likes where usermail = ? and pid = ?"
  con.query(sql, [usermail, pid], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length > 0) {
        var message = "Liked"
        //already liked
        console.log("liked already")
        res.redirect('/users/blogView')

      } else {
        sql2 = "insert into likes set ?"
        con.query(sql2, data, (err, row) => {
          if (err) {
            console.log(err)
          } else {
            console.log("liked now")
            var getsum = "SELECT SUM(set_Like) as sum FROM likes where  pid = ? ;"
            con.query(getsum, [pid], (err, getLikes) => {
              if (err) {
                console.log(err)
              } else {
                var likes = getLikes[0].sum;
                console.log(getLikes)
                var updateSql = "update blog set likes = ? where id = ?"
                con.query(updateSql, [likes, pid], (err, result) => {
                  if (err) {
                    console.log(err)
                  } else {
                    res.redirect('/users/blogView')
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
module.exports = router;
