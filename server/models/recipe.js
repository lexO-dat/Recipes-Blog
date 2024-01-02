const mongoose = require('mongoose');

const recipeschema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    description: {
        type: String,
        required: 'This field is required'
    },
    email: {
        type: String,
        required: 'This field is required'
    },
    ingredients: {
        type: Array,
        required: 'This field is required'
    },
    category: {
        type: String,
        enum: ['Platos Vegetarianos', 'Aperitivos y Tapas', 'Almuerzos', 'Desayunos', 'Repostería', 'Platos Veganos', 'Cenas', 'Postres', 'Comida Fría', 'Comida Caliente', 'Comida Rápida'],
        required: 'This field is required'
    },
    img: {
        type: String,
        required: 'This field is required'
    }
});

recipeschema.index({name: 'text', description: 'text'});

module.exports = mongoose.model('recipe', recipeschema);