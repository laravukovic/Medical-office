import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Admin = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    }
})

export default mongoose.model('Admmin', Admin, 'admin');