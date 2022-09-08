import * as bodyParser from "body-parser"
import { verify } from "crypto"
import * as express from "express"
import { signIn, signUp } from "./controller/authController"
import { createTask, getUserSpecifiedTask, setTaskCompletedToTrue } from "./controller/taskController"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { verifyToken } from "./middleware/auth_check_middleware"
import { createTaskItem, getUserTasks } from "./repository/task_db_repository"
import { checkUserExist, createUser } from "./repository/user_db_repository"
import { router } from "./routes/routes"
AppDataSource.initialize().then(async () => {
 
   // create express app
   const app = express()

   app.use(bodyParser.json())
   app.use(router);
   
   





   app.listen(3000, () => {
      console.log("running at the port : http://localhost:3000/");
   })


}).catch(error => console.log(error))
