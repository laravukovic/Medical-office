import express from 'express';
import { AdminController } from '../controllers/admin.controller';
const adminRouter = express.Router();

adminRouter.route('/getUsername').post(
    (req, res) => new AdminController().getUsername(req, res)
)

adminRouter.route('/getUser').post(
    (req, res) => new AdminController().getUser(req, res)
)

adminRouter.route('/changePassword').post(
    (req, res) => new AdminController().changePassword(req, res)
)

export default adminRouter;