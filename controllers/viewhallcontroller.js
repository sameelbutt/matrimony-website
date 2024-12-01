const catchAsync = require('../utils/catchAsync');
const Hall = require('../models/hallmodel');

exports.gethomepage = catchAsync(async (req, res, next) => {
    const events = await Hall.find();
    
    res.render('hall', { events, event: events[0] }); // Pass the first event as 'event'
  });
  
exports.getdetails = catchAsync(async (req, res, next) => {
  const event = await Hall.findOne({slug:req.params.slug});
  
  res.render('details', { event}); // 
});
exports.gethallogin=(req,res)=>{
  res.render('halllogin',{
    
  })
}
exports.gethalsignup=(req,res)=>{
  res.render('signuphall',{
    
  })
}