////引入mongoose模块
var db = require('mongoose');

var express = require('express');

var bodyParser = require('body-parser');

var app = express()

//// 链接数据库 mongodb 协议, localhost 主机ip, student_db 数据库名称
db.connect('mongodb://localhost/spider_db');

var Book = db.model('book', {
  title: { type: String, required: true },
  cate: { type: String, default: "" },
  img: { type: String, default: "" },
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now }
})

app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//浏览器访问地址  http://localhost:3000/api/book/1
app.get('/api/book/:page', (req, res) => {
  var page = req.params.page;
  page = Number(page) || 1;
  var pageSize = 16;
  Book.find().count((err, totalCount) => {
    if (err) {
    }
    else {
      ///总页数
      var pageCount = Math.ceil(totalCount / pageSize);
      if (pageCount < page) {
        res.json({ status: "n", msg: "已到最后一页" })
      }
      else {
        Book.find().skip((page - 1) * pageSize).limit(pageSize).exec((err, data) => {
          if (err) {
            res.json({ status: "n", msg: "返回数据失败" })
          }
          else {
            res.json({ status: "y", msg: "返回数据成功", data: data })
          }
        })
      }
    }
  })
})

app.all('/admin/*', (req, res, next) => {
  console.log('这个页面访问了管理后台的路径')
  next()
})
app.get('/home/login', (req, res) => {
  console.log('这个是登陆页面')
  res.send('用户登陆')
})
app.get('/admin/student', (req, res) => {
  res.send('学生信息管理')
})
app.get('/admin/student_user', (req, res) => {
  res.send('管理员信息管理')
})
app.get('/admin/student_class', (req, res) => {
  res.send('班级信息管理')
})
app.listen(3000, function () {
  console.log('服务器运行中...')
})
