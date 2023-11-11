import * as express from 'express';
import Admin from '../models/admin'

export class AdminController {
    getUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        
        Admin.findOne({"username":username}, (err, client)=>{
          if(err) console.log(err);
          else res.json(client);
        })
      }
    
      getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        
        Admin.findOne({"username":username, "password":password}, (err, client)=>{
          if(err) console.log(err);
          else res.json(client);
        })
      }
    
      changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
      
        Admin.collection.updateMany({"username":username},{$set:{"password": password }})
      }
}