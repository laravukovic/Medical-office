import express from 'express';
import { ExaminationController } from '../controllers/examination.controller';
const examinationRouter = express.Router();

examinationRouter.route('/getBranch').post(
    (req, res) => new ExaminationController().getBranch(req, res)
)

examinationRouter.route('/getExamination').post(
    (req, res) => new ExaminationController().getExamination(req, res)
)

examinationRouter.route('/getDoctorsExaminations').post(
    (req, res) => new ExaminationController().getDoctorsExaminations(req, res)
)

examinationRouter.route('/addDoctorToExamination').post(
    (req, res) => new ExaminationController().addDoctorToExamination(req, res)
)

examinationRouter.route('/removeDoctorFromExamination').post(
    (req, res) => new ExaminationController().removeDoctorFromExamination(req, res)
)

examinationRouter.route('/insertExamination').post(
    (req, res) => new ExaminationController().insertExamination(req, res)
)

examinationRouter.route('/getRequests').get(
    (req, res) => new ExaminationController().getRequests(req, res)
)

examinationRouter.route('/updateRequest').post(
    (req, res) => new ExaminationController().updateRequest(req, res)
)

examinationRouter.route('/deleteRequest').post(
    (req, res) => new ExaminationController().deleteRequest(req, res)
)

examinationRouter.route('/getBySpecialization').post(
    (req, res) => new ExaminationController().getBySpecialization(req, res)
)

examinationRouter.route('/updatePrice').post(
    (req, res) => new ExaminationController().updatePrice(req, res)
)

examinationRouter.route('/addExamination').post(
    (req, res) => new ExaminationController().addExamination(req, res)
)

examinationRouter.route('/getAllExaminations').get(
    (req, res) => new ExaminationController().getAllExaminations(req, res)
)

export default examinationRouter;