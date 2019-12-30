import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('users', userSchema);