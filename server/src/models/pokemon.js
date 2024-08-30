import {Schema,model} from 'mongoose';

const pokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

export default model('Pokemon', pokemonSchema);