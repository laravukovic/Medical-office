import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Schedule = new Schema({
    name: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    user: {
        type: String
    },
    doctor: {
        type: String
    },
    branch: {
        type: String
    },
    report: {
        type: Boolean
    }
})

export default mongoose.model('Schedule', Schedule, 'schedules');