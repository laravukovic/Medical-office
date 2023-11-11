import express from 'express';
import { SpecializationController } from '../controllers/specialization.controller';
const specializationRouter = express.Router();

specializationRouter.route('/getAllSpecializations').get(
    (req, res) => new SpecializationController().getAllSpecializations(req, res)
)

specializationRouter.route('/addSpecialization').post(
    (req, res) => new SpecializationController().addSpecialization(req, res)
)

export default specializationRouter;