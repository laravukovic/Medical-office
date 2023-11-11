import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Examination = new Schema({
    name: {
        type: String
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    },
    specialization: {
        type: String
    },
    branch: {
        type: String
    },
    doctors: {
        type: Array
    },
    accepted: {
        type: Boolean
    }
})

export default mongoose.model('Examination', Examination, 'examinations');