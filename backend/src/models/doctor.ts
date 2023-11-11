import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Doctor = new Schema({
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
    license: {
        type: String
    },
    specialization: {
        type: String
    },
    branch: {
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

export default mongoose.model('Doctor', Doctor, 'doctors');