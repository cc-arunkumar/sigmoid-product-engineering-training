const moongoose = require('mongoose');

const productSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true

    },
    stock: {
        type: Number
    }
}, { timestamps: true });

module.exports = moongoose.model('Product', productSchema);

