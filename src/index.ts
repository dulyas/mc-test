
import "module-alias/register";


import { startApp } from "@/services/express";
import connectDatabase from "@/services/db";
import app from "@/services/express";



connectDatabase()
startApp()


export default app
