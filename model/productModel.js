const mongoose = require('mongoose')

const productScheme = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter the Product"]
    },
    quantity : {
        type : Number,
        required : true,
        default : 0
    },
    price : {
        type : Number,
        required : true,
        default : 0
    },
    
       
    
}
)

const Product = mongoose.model("product",productScheme)

module.exports = Product