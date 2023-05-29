const express = require("express");
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(cors({
  origin: '*'
}));
//////////////////
const client = new Client({
  host: 'local_pgdb',
  database: 'admin',
  user: 'admin',
  password: 'k304298',
  port: 5432,
});

//////////////////
// app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.send("Hello! Node.js");
});

app.get('/users', (req, res) => {
  try {
    var id = 1
    // if (isNaN(Number(req.body.id))) {
    //   return res.status(400).json({ err: "Numbers only, please!" });
    // }
    // id = red.body.id
    // const client = new Client({
    //   host: 'local_pgdb',
    //   database: 'admin',
    //   user: 'admin',
    //   password: 'k304298',
    //   port: 5432,
    // });
    client.connect();
    client.query(
      'select voltage,current,date,time from public.battery where id = '+id+'  order by (date + time) desc limit 100;',
      (err, res2) => {
        res.json(res2);
        client.end();
      })
  } catch (error) {
    
  }

})


app.post('/users', (req, res) => {
  // users.push(req.body)
  let json = req.body
  console.log(json)

  // if (isNaN(Number(req.body.id))) {
  //   return res.status(400).json({ err: "Numbers only, please!" });
  // }
  try {
    // const client = new Client({
    //   host: 'local_pgdb',
    //   database: 'admin',
    //   user: 'admin',
    //   password: 'k304298',
    //   port: 5432,
    // });
    client.connect();
    client.query(
      'INSERT INTO public.battery (id, date, time, voltage, current, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11, cell12, cell13, avg_cell, max_cell, min_cell, soc, remaincap, fcc, cycle, temp1, temp2, temp3, temp4, c_fet, d_fet, protectstatus, balancestatus) ' +
      'VALUES (1,"18/05/2023","13:50:10",50.49,7.47,3.867,3.887,3.885,3.886,3.883,3.887,3.884,3.885,3.884,3.883,3.886,3.885,3.89,3.884,3.89,3.867,67,27000,40000,0,37.5,37.5,37.4,37.1,"ON","ON",null,0);',
      (err, res2) => {
        client.end();
      })
    res.send(`Add data completed.`)
  } catch (error) {
    
  }
})


app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});

