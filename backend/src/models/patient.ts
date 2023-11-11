import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Patient = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    img: {
        type: String
    },
    status: {
        type: String
    },
    type: {
        type: String
    }
})

export default mongoose.model('Patient', Patient, 'patients');