import mongoose from "mongoose"

const CartModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                required: false
            },
            quantity: {
                type: Number,
                required: false
            },
            variant: {
                type: String,
                required: false
            }
        }
    ]
})

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartModel)
export default Cart