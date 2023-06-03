const express = require("express");
const Pool = require('pg').Pool;
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const fs = require('fs');
const { log } = require("console");
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(cors({
  origin: '*'
}));

//////////////////
const pool = new Pool({
  host: 'local_pgdb',
  // host: 'localhost',
  database: 'admin',
  user: 'admin',
  password: 'k304298',
  port: 5432,
});
pool.connect();
//////////////////

// app.set('view engine', 'html');
app.use(express.static(__dirname +"/fontend"));
app.use('/:tagID',express.static(__dirname +"/fontend"));

// app.get("/a/:tagId", (req, res) => {
//   // res.sendFile(__dirname +"/fontend/index.html");
//   fs.readFile("./fontend/index.html", 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('aaa'+ req.params.tagId)
//     data = data.replace('<script>var batID = 1;</script>', '<script>var batID = ' + (req.params.tagId ? req.params.tagId : 1) + ';</script>'); //MODIFY THE FILE AS A STRING HERE
//     res.send(data)
//   });
  



// });

// app.get('/batinfo/:tagId', (req, res) => {
//   try {
//     var id = req.params.tagId
//     sample = 100

//     if (req.body.sample) {
//       sample = req.body.sample
//     }

//     // console.log(req.body)
//     pool.query(
//       'select voltage,current,date,time,temp1,temp2,temp3,temp4,cycle,SOC,remaincap from public.battery where id = ' + id + '  order by (date + time) desc limit ' + sample,
//       (err, res2) => {
//         res.json(res2);
//       })
//   } catch (error) {

//   }
// })

app.post('/batinfo/:tagId', (req, res) => {
  try {
    var id = req.params.tagId
    sample = 100

    if (req.body.sample) {
      sample = req.body.sample
    }

    // console.log(req.body)
    pool.query(
      "select voltage,current,TO_CHAR(date,'YYYY-MM-DD') date,time,temp1,temp2,temp3,temp4,cycle,SOC,remaincap from public.battery where id = " + id + "  order by (date + time) desc limit " + sample,
      (err, res2) => {
        res.json(res2);
      })
  } catch (error) {

  }
})

app.post('/addData', (req, res) => {
  // users.push(req.body)
  let json = req.body
  console.log(json)

  // if (isNaN(Number(req.body.id))) {
  //   return res.status(400).json({ err: "Numbers only, please!" });
  // }
  try {

    pool.connect();
    pool.query(
      'INSERT INTO public.battery (id, date, time, voltage, current, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, avg_cell, max_cell, min_cell, soc, remaincap, fcc, cycle, temp1, temp2, temp3, temp4, c_fet, d_fet, protectstatus, balancestatus) ' +
      'VALUES (1,"18/05/2023","13:50:10",50.49,7.47,3.867,3.887,3.885,3.886,3.883,3.887,3.884,3.885,3.884,3.883,3.886,3.885,3.89,3.884,3.89,3.867,67,27000,40000,0,37.5,37.5,37.4,37.1,"ON","ON",null,0);',
      (err, res2) => {
        // pool.end();
      })
    res.send(`Add data completed.`)
  } catch (error) {

  }
})


app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});

