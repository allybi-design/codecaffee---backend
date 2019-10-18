const express = require("express");
const sql = require("mysql");
const router = express.Router();


// SET CONNECTION TO SQL
const con = sql.createConnection({
  host: "127.0.0.1",
  database: "codeCafe_schema",
  user: "root",
  password: "password"
});

// CONNECT TO SQL
con.connect(err => {
  if (err) {
    console.error(`NOT CONNECTED to DB  - ${err.stack}`);
    return;
  }
  console.log(`Connected to DB - on thread:${con.threadId}`);
});

// GET /getOrders 
router.get("/getOrders", (req, res) => {
  const str = "SELECT * FROM cartDB";

  con.query(str, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({ error: true });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
});

// POST  /postOrder
router.post("/postOrder", (req, res) => {
  const sql = `INSERT INTO cartDB ( coffeeName, coffeePrice, coffeeSize, caffeine, milktype) VALUES ( "${req.body.coffeeName}", "${req.body.coffeePrice}", "${req.body.coffeeSize}", "${req.body.caffeine}", "${req.body.milktype}")`;

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(`${result} - data inserted`);
    res.status(200).send(result);
  });
});

router.delete("/delOrder/:id", (req, res) => {
  console.log(req.params.id)
  
  const sql = "DELETE FROM cartDB WHERE orderId="+req.params.id;
  con.query(sql, (err, result)=> {
     if (err) throw err;
     console.log(`${result} - data inserted`);
     res.status(200).send("DELETED");
  })
  
})

module.exports = router;
