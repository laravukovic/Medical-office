import express from 'express';
import { PatientController } from '../controllers/patient.controller';
const patientRouter = express.Router();

patientRouter.route('/getUsername').post(
    (req, res) => new PatientController().getUsername(req, res)
)

patientRouter.route('/getUser').post(
    (req, res) => new PatientController().getUser(req, res)
)

patientRouter.route('/getEmail').post(
    (req, res) => new PatientController().getEmail(req, res)
)

patientRouter.route('/changePassword').post(
    (req, res) => new PatientController().changePassword(req, res)
)

patientRouter.route('/getAllPatients').get(
    (req, res) => new PatientController().getAllPatients(req, res)
)

patientRouter.route('/deletePatient').post(
    (req, res) => new PatientController().deletePatient(req, res)
)

patientRouter.route('/getRequests').get(
    (req, res) => new PatientController().getRequests(req, res)
)

patientRouter.route('/updateRequest').post(
    (req, res) => new PatientController().updateRequest(req, res)
)

patientRouter.route('/getAcceptedPatients').get(
    (req, res) => new PatientController().getAcceptedPatients(req, res)
)

export default patientRouter;

