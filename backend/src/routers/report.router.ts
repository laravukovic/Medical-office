import express from 'express';
import { ReportController } from '../controllers/report.controller';
const reportRouter = express.Router();

reportRouter.route('/getUser').post(
    (req, res) => new ReportController().getUser(req, res)
)

reportRouter.route('/insertReport').post(
    (req, res) => new ReportController().insertReport(req, res)
)

reportRouter.route('/deleteUserReport').post(
    (req, res) => new ReportController().deleteUserReport(req, res)
)

export default reportRouter;