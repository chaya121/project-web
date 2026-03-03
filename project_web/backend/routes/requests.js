const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const auth = require("../middleware/authMiddleware");

router.post("/",auth, async (req,res)=>{
  const request = await Request.create({
    user: req.user.id,
    type: req.body.type,
    detail: req.body.detail
  });
  res.json(request);
});

router.get("/",auth, async (req,res)=>{

  if(req.user.role === "admin"){
    const requests = await Request.find()
      .populate("user","name")
      .sort({createdAt:-1});
    return res.json(requests);
  }

  const requests = await Request.find({user:req.user.id})
    .sort({createdAt:-1});
  res.json(requests);
});

router.put("/:id",auth, async (req,res)=>{

  if(req.user.role !== "admin")
    return res.status(403).json({message:"Forbidden"});

  const updated = await Request.findByIdAndUpdate(
    req.params.id,
    { status:"approved" },
    { new:true }
  );

  res.json(updated);
});

module.exports = router;