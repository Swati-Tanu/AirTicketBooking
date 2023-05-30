const mongoose = require("mongoose");
const {Schema} = mongoose

const bookingSchema = mongoose.Schema({
   user : { type: Schema.Types.ObjectId, ref: 'User' },
   flight : { type: Schema.Types.ObjectId, ref: 'Flight' }
})

const bookingModel = mongoose.model("Booking", bookingSchema)

module.exports={
    bookingModel
}