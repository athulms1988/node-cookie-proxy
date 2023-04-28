const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser())
const bodyParser = require("body-parser");
const request = require("request");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.get('/test', async (req, res) => {
  request.post({
    url: 'https://ec2-52-66-238-83.ap-south-1.compute.amazonaws.com/api/v4/users/login', 
    body: JSON.stringify({
      "login_id": req.query.user,
      "password": req.query.password
  })
  }, function (err, resp) {
    if(err) {

    } else {
      if(resp.statusCode == 200) {
        res.cookie('MMUSERID', JSON.parse(resp.body).id, { maxAge: 606024 * 30, secure: true });
        res.cookie('MMAUTHTOKEN', resp.headers.token, { maxAge: 606024 * 30, httpOnly: true, secure: true});
        res.redirect('http://ec2-52-66-238-83.ap-south-1.compute.amazonaws.com/login');
      }
    }
  });
});

app.listen(8000, () =>
  console.log(`Proxy API Server Running On Port!`)
);