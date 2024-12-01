let Hall = require('./../models/hallmodel');
const catchasync = require("../utils/catchasync");


exports.getallhalls = catchasync(async (req, res) => {
  let user = await Hall.find()
  res.json({
    status: 'success',
    result: user.length,
    data: user
  })
})
exports.createhall = catchasync(async (req, res) => {
    let user = await Hall.create(req.body)
    res.json({
      status: 'success',
      result: user.length,
      data: user
    })
  })
  exports.gethallbyid = catchasync(async (req, res) => {
    let user = await Hall.findById(req.params.id)
    res.json({
      status: 'success',
      result: user.length,
      data: user
    })
  })
  exports.updatehall = catchasync(async (req, res) => {
    let user = await Hall.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.json({
      status: 'success',
      result: user.length,
      data: user
    })
  })
  exports.deletehall = catchasync(async (req, res) => {
    let user = await Hall.findByIdAndDelete(req.params.id)
    res.json({
      status: 'success',
      result: user.length,
      data: user
    })
  })