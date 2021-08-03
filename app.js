const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const admin = require("firebase-admin");

const serviceAccount = require("./crud-89cd3-firebase-adminsdk-j7o5m-14119e3036.json");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://crud-89cd3-default-rtdb.firebaseio.com/"
});

const fireData = admin.database();

app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get('/crud-api', (req, res) => {
   fireData.ref().on('value', (snapshot) => {
      res.send({
         'success': true,
         'result': snapshot.val(),
         'message': '資料讀取成功',
      });
      res.end();
   });
})

app.get('/', (req, res) => {
   res.send('123')
})

// app.post('/crud-api', (req, res) => {
//    const content = req.body;
//    console.log(content);
//    const contentRef = fireData.ref().push();
//    contentRef.set({ ...content })
//    .then(() => {
//       fireData.ref().once('value', (snapshot) => {
//          res.send({
//             'success': true,
//             'result': snapshot.val(),
//             'message': '資料新增成功',
//          });
//          res.end();
//       })
//    })
// })

// app.delete('/crud-api/:id', (req, res) => {
//    const id = req.params.id;
//    fireData.ref().child(id).remove()
//    .then(() => {
//       fireData.ref().once('value', (snapshot) => {
//          res.send({
//             'success': true,
//             'result': snapshot.val(),
//             'message': '資料刪除成功',
//          });
//          res.end();
//       })
//    })
// })

// app.put('/crud-api/:id', (req, res) => {
//    const content = req.body;
//    const id = req.params.id;
//    fireData.ref().child(id).set(content)
//    .then(() => {
//       fireData.ref().once('value', (snapshot) => {
//          res.send({
//             'success': true,
//             'result': snapshot.val(),
//             'message': '資料編輯成功',
//          });
//          res.end();
//       })
//    })
// })

const port = process.env.PORT || 3000;
app.listen(port);