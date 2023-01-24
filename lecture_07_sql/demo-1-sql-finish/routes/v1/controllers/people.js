import express from 'express';
var router = express.Router();


router.get('/', function(req, res, next) {
  let nameSearch = req.query.nameSearch
  nameSearch = nameSearch ? nameSearch : ""

  // TO fix the sql injection vulnerability, do this instead:
  // req.models.db.all(`SELECT * FROM people WHERE first_name = ?`, nameSearch,
  req.models.db.all(`SELECT * FROM people WHERE first_name = "${nameSearch}"`,
    (err, allRows) => {
      if(err){
        console.log("db error: " + err)
        res.send("db error" + err)
        return
      }
      if(!allRows){
        return ""
      }
      let matchingPeople = allRows.map(
        row => `${row.first_name} ${row.last_name}`
      ).join("\n")
      
      res.send(matchingPeople)
    }
  )
});
  

export default router;
