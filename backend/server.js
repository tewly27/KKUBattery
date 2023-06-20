const express = require("express");
// const Pool = require('pg').Pool;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const https = require('https');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
axios.defaults.withCredentials = true
app.use(cors({
  origin: '*'
}));



// const https = require('https');




//////////////////
// const pool = new Pool({
//   host: 'local_pgdb',
//   // host: 'localhost',
//   database: 'admin',
//   user: 'admin',
//   password: 'k304298',
//   port: 5432,
// });
// pool.connect();
//////////////////

app.use(express.static(__dirname + "/fontend"));
app.use('/:tagID', express.static(__dirname + "/fontend"));


const g2 = ["seconds", "minutes", "hours", "days", "weeks", "months", "year"];



const formData = new FormData();
formData.append('username', 'VP');
formData.append('password', '123456');

axios({
  method: 'post',
  url: 'https://iot.jiabaida.com/api/login',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary()
  },
  data: formData
})
  .then(function (response) {
    axios.defaults.headers.Cookie = response.headers["set-cookie"][0];
    // console.log(response);
    console.log(response.headers["set-cookie"][0]);
  });

app.post('/batinfo/:tagId', (req, res) => {
  try {
    var id = req.params.tagId

    sample = 1
    sub = 1
    num_sample = 60
    if (req.body.sub != null) {
      sub = req.body.sub
    }
    if (req.body.sample != null) {
      sample = req.body.sample
    }
    if (req.body.num_sample != null) {
      num_sample = req.body.num_sample
    }
    if (req.body.id != null) {
      id = req.body.id
    }
    var cells = " ";


    sq =
      "select avg(voltage) voltage,round(avg(current)::numeric,2)current " +
      ", date_trunc('" + g2[sample] + "', date+time) + round(extract(seconds FROM time) / " + sub + ")*" + sub + " * interval '1 second' datetime , " +
      "avg(temp1)temp1,avg(temp2)temp2,avg(temp3)temp3, " +
      "avg(temp4)temp4,round(avg(cycle)::numeric,2)cycle,round(avg(SOC)::numeric,2)SOC,round(avg(remaincap)::numeric)remaincap " +

      " from public.battery " +
      "where id = " + id +
      " group by datetime " +
      "order by datetime desc limit  " + num_sample;
    // console.log(sq)
    // pool.query(
    //   sq,
    //   (err, res2) => {

    //     res.json(res2);
    //   })
  } catch (error) {
    console.error(error)
  }
})

app.get('/readJBD/:tagId', (req, res) => {
  // default
  var imei = '0868755123660953'
  // var imei = '0868755123661050'
  // console.log(req.params.tagId)
  if (req.params.tagId) {
    imei = req.params.tagId
  }
  try {
    axios({
      method: 'get',

      url: 'https://iot.jiabaida.com/api/device/queryPaging?query=%7B%22currentPage%22%3A1%2C%22pageSize%22%3A20%2C%22paramMap%22%3A%7B%22selectCustomerId%22%3A2079849%2C%22imei%22%3A' + imei + '%2C%22isIncludingSub%22%3A0%2C%22status%22%3Anull%2C%22siteName%22%3Anull%2C%22rentStatus%22%3Anull%2C%22deviceGroupIdList%22%3A%5B%5D%2C%22deviceModelId%22%3Anull%2C%22iccid%22%3Anull%2C%22rentExpireDate%22%3Anull%2C%22offlineHours%22%3A0%2C%22offlineStartTime%22%3Anull%2C%22offlineEndTime%22%3Anull%2C%22rentTel%22%3Anull%2C%22transferBatchNo%22%3A%22%22%2C%22statusLabel%22%3Anull%2C%22alarmType%22%3Anull%2C%22activateTimedown%22%3Anull%2C%22activateTimeup%22%3Anull%2C%22rentStartTimedown%22%3Anull%2C%22rentStartTimeup%22%3Anull%2C%22rentStartTime%22%3A%22descending%22%2C%22name%22%3A%22%22%2C%22activateTime%22%3Anull%2C%22lastHeartbeatDate%22%3Anull%2C%22gpsTypeId%22%3Anull%2C%22reportManageId%22%3Anull%7D%7D'
      , withCredentials: true
      , headers: {
        'accept-encoding': 'gzip, deflate'
      },
    })
      .then(function (response) {
        // console.log(response.data)
        res.send(response.data)
      });



  } catch (error) {

  }
})

app.get('/readGPS/:tagId', (req, res) => {
  // default
  var deviceIds = '80577'
  // var did = '0868755123661050'
  // console.log(req.params.tagId)
  if (req.params.tagId) {
    deviceIds = req.params.tagId
  }
  try {
    axios({
      method: 'get',

      url: 'https://iot.jiabaida.com/api/device/gpsLocation?deviceIds=' + deviceIds
      , withCredentials: true
      , headers: {
        'accept-encoding': 'gzip, deflate'
      },
    })
      .then(function (response) {
        // console.log(response.data)
        res.send(response.data)
      });



  } catch (error) {

  }
})


app.post('/addData', (req, res) => {
  // users.push(req.body)
  let json = req.body
  // console.log(json)

  // if (isNaN(Number(req.body.id))) {
  //   return res.status(400).json({ err: "Numbers only, please!" });
  // }
  try {

    // pool.connect();
    // pool.query(
    //   "INSERT INTO public.battery (id, date, time, voltage, current, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, avg_cell, max_cell, min_cell, soc, remaincap, fcc, cycle, temp1, temp2, temp3, temp4, c_fet, d_fet, protectstatus, balancestatus) " +
    //   "(2,'18/05/2023','13:50:10',50.49,7.47,3.867,3.887,3.885,3.886,3.883,3.887,3.884,3.885,3.884,3.883,3.886,3.885,3.89,3.884,3.89,3.867,67,27000,40000,0,37.5,37.5,37.4,37.1,'ON','ON',null,0)"
    //   , (err, res2) => {
    //     // pool.end();
    //   })
    res.send(`Add data completed.`)
  } catch (error) {

  }
})

const options = {
  key: fs.readFileSync(__dirname + "/ssl_private.key"),
  cert: fs.readFileSync(__dirname + "/ssl.crt")
};

const server = https.createServer(options, app);

server.listen(8443, function () {
  console.log('Listening on port ' + server.address().port);
});

app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});

