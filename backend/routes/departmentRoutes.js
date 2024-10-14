import express from "express";
import {
  addDepartments,
  getDepartments,
} from "../controller/departmentController.js";

const router = express.Router();

router.post("/addDepartments", addDepartments);
router.get("/getAlldepartments", getDepartments);

export default router;
