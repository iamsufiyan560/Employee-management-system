import Employee from "../models/EmployeeModel.js";

export const addEmployee = async (req, res) => {
  const { name, department, address } = req.body;

  try {
    if (!name || !department || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newEmployee = await Employee.create({
      name,
      department,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding employee",
      error: error.message, // Return error message to the client (optional)
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = 10; // Number of employees per page
    const skip = (page - 1) * limit; // Calculate how many records to skip

    // Fetch employees with pagination and populate the department field
    const employees = await Employee.find()
      .populate("department")
      .limit(limit)
      .skip(skip);

    // Get total number of employees (for pagination metadata)
    const totalEmployees = await Employee.countDocuments();

    res.status(200).json({
      employees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
