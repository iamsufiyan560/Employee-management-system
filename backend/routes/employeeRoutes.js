import express from "express";
import { addEmployee, getEmployees } from "../controller/employeeController.js";

const router = express.Router();

router.post("/addEmployee", addEmployee);
router.get("/getAllEmployess", getEmployees);

export default router;
