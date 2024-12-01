// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Hall = require('./../models/hallmodel'); 
const HallUsers = require('./../models/usersmodel');
const Booking = require('./../models/bookingmodel');

const catchasync = require("../utils/catchasync");
exports.hallbookdate = catchasync(async (req, res) => {
    let {hallid,date,userid}=req.body

    let existingdate=  await Booking.findOne({hall:hallid,date:date})
    if(existingdate){
        return res.status(400).json({message:"Date is already booked"})
    }
    let book=await Booking.create({
        hall: hallid,
        user: userid,
        date: date
    })
    book = await Booking.findById(book._id);
 res.status(200).json({
    status: 'success',
    data: book
 })

  })

  exports.getcheckout = catchasync(async (req, res, next) => {
    const stripe = require('stripe')('sk_test_51PfrbuKJMD78Orv2Ot0DiYjooq55JYcF4woH1IbHMx1XgwXXmBIrd1u3BQCF1ybM6DZoAxjMtAHWcCW04bG1ksAE00qLLhKmWm');
    let hall = await Hall.findById(req.params.id);
  
    console.log('Hall found:', hall);
   
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/allevents`,
      cancel_url: `${req.protocol}://${req.get('host')}/`,
      customer_email: req.user.email,
      client_reference_id: req.params.id,
      line_items: [
        {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: hall.name,
              description: hall.description,
              images: [`https://partner.bookirea.com/img/marquees800x400/1533799027/5b6bf3c4997a5.jpg`],
            },
            unit_amount: hall.price * 100, // Stripe expects amount in cents
          },
          quantity: 1
        }
      ]
    });

    console.log('Stripe session created:', session);
  
    res.status(200).json({
      status: 'success',
      session
    });
  });
