let express = require("express");
let router = express.Router();
let {users} = require('../models/users');
router.get("/employees", async (req, res)=>{
    let result = await users.find();
    res.send(result);
})
// open post ,amn => choose get method 
// localhost:3000/api/hr/employees

router.delete("/deleteemp/:id", async (req, res)=> {
    let result = await users.findByIdAndDelete(req.params.id);
    if (result) {
        res.send("emp record delete success");
    }
})

router.post("/assign-task", (req, res)=>{
    res.send("assign task page called");
})

router.get("/tasks", (req, res)=>{
    res.send("tasks called");
})

router.get("/notifications", (req, res)=>{
    res.send("notifications called");
})

module.exports = router;
