import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Specialization = new Schema({
    specialization: {
        type: String
    },
    branch: {
        type: String
    }
})

export default mongoose.model('Specialization', Specialization, 'specializations');