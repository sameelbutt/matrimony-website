let Users = require('./../models/usersmodel');
const catchasync = require('../utils/catchasync');

exports.getallusers = catchasync(async (req, res) => {
  let user = await Users.find()
  res.json({
    status: 'success',
    result: user.length,
    data: user
  })
})
// exports.createusers = catchasync(async (req, res) => {
//     let user = await Users.create(req.body)
//     res.json({
//       status: 'success',
//       result: user.length,
//       data: user
//     })
//   })
  exports.getusersbyid = catchasync(async (req, res) => {
    let user = await Users.findById(req.params.id)
    res.json({
      status: 'success',
      result: user.length,
      data: user
    })
  })
  exports.updateusers = catchasync(async (req, res) => {
    let user = await Users.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.json({
      status: 'success',
      result: user.length,
      data: user
    })
  })
 
  
  exports.deleteusers = catchasync(async (req, res) => {
    let user = await Users.findByIdAndDelete(req.params.id)
    res.json({
      status: 'success',
      result: user.length,
      data: user
    })
  })