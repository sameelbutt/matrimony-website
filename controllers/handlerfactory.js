let catchAsync = require('../utils/catchasync');
exports.deleteprofileone=Model=>catchAsync (async(req,res,next)=>{
    let doc=await Model.findByIdAndDelete(req.params.id)
    if(!doc){
        return res.status(200).json({
            status:'fail'
          
        }) 
    }
res.status(200).json({
    status:'pas',
    data:null
})
})
exports.updateprofileone=Model=>catchAsync (async(req,res,next)=>{
    let doc=await Model.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:ture
    })
    if(!doc){
        return res.status(200).json({
            status:'fail'
          
        }) 
    }
res.status(200).json({
    status:'pas',
    data:doc
})
})
exports.createprofileone=Model=>catchAsync (async(req,res,next)=>{
    let doc=await Model.create(req.body)
    if(!doc){
        return res.status(200).json({
            status:'fail'
          
        }) 
    }
res.status(200).json({
    status:'pas',
    data:doc
})
})
exports.allprofiles=Model=>catchAsync (async(req,res,next)=>{
    let doc=await Model.find()
    if(!doc){
        return res.status(200).json({
            status:'fail'
          
        }) 
    }
res.status(200).json({
    status:'pas',
    data:doc
})
})
exports.singleprofile=Model=>catchAsync (async(req,res,next)=>{
    let doc=await Model.findById(req.params.id)
    if(!doc){
        return res.status(200).json({
            status:'fail'
          
        }) 
    }
res.status(200).json({
    status:'pas',
    data:doc
})
})