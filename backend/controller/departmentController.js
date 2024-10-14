import Department from "../models/Department.js";

export const addDepartments = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newDepartment = await Department.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Department added successfully",
      department: newDepartment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding employee",
      error: error.message, // Return error message to the client (optional)
    });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
