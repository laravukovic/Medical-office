import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Report = new Schema({
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
    specialization: {
        type: String
    },
    branch: {
        type: String
    },
    reason: {
        type: String
    },
    diagnosis: {
        type: String
    },
    therapy: {
        type: String
    },
    next: {
        type: String
    }
})

export default mongoose.model('Report', Report, 'reports');
