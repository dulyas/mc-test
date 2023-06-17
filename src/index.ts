import "module-alias/register";
import { startApp } from "@/services/express";
import connectDatabase from "@/services/db";



connectDatabase()
startApp()


