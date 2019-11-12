const EmployeeModel = require('../models/employee.model');
const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res, next) => {
    const employees = await EmployeeModel.find();
    res.json(employees);
};

employeeCtrl.createEmployee = async (req, res, next) => {
try {
    const employee = new EmployeeModel({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });  
     await employee.save();
    res.json({status: 'Employee created'}); 
    }
    catch (err) {
        next(err);
      }
};

employeeCtrl.getEmployee = async (req, res, next) => {
    const { id } = req.params;
    const employee = await EmployeeModel.findById(id);
    res.json(employee);
};

employeeCtrl.editEmployee = async (req, res, next) => {
    const { id } = req.params;
    const employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    await EmployeeModel.findByIdAndUpdate(id, {$set: employee}, {new: true});
    res.json({status: 'Employee Updated'});
};

employeeCtrl.deleteEmployee = async (req, res, next) => {
    await EmployeeModel.findByIdAndRemove(req.params.id);
    res.json({status: 'Employee Deleted'});
};

module.exports = employeeCtrl;