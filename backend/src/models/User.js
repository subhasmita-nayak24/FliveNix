import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        // minlength: 6
    },
    username: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
 export default  mongoose.model('User', userSchema);

