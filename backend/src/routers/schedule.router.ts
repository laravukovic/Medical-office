import express from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
const scheduleRouter = express.Router();

scheduleRouter.route('/getDoctor').post(
    (req, res) => new ScheduleController().getDoctor(req, res)
)

scheduleRouter.route('/addSchedule').post(
    (req, res) => new ScheduleController().addSchedule(req, res)
)

scheduleRouter.route('/getUser').post(
    (req, res) => new ScheduleController().getUser(req, res)
)

scheduleRouter.route('/deleteSchedule').post(
    (req, res) => new ScheduleController().deleteSchedule(req, res)
)

scheduleRouter.route('/getNoReportSchedule').post(
    (req, res) => new ScheduleController().getNoReportSchedule(req, res)
)

scheduleRouter.route('/updateReport').post(
    (req, res) => new ScheduleController().updateReport(req, res)
)

scheduleRouter.route('/deleteUserSchedule').post(
    (req, res) => new ScheduleController().deleteUserSchedule(req, res)
)

scheduleRouter.route('/deleteDoctorSchedule').post(
    (req, res) => new ScheduleController().deleteDoctorSchedule(req, res)
)

export default scheduleRouter;