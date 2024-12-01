const mongoose = require('mongoose');
let slugify=require('slugify')
const hallSchema = new mongoose.Schema({
  name: String,
  address: String,
  capacity: Number,
  price: Number,
  description:String,
  mainImage: String,
  images:[String],
  slug:String,

});
hallSchema.pre('save',async function(next){
  
  this.slug = slugify(`${this.name} `, { lower: true });
  

  next();

})

module.exports = mongoose.model('Hall', hallSchema);