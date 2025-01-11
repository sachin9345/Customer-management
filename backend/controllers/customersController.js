const NewCustomers = require('../models/customers');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');


exports.createCustomer = catchAsyncError(async (req, res, next) => {
    const Newcustomer = await NewCustomers.create(req.body);

    res.status(201).json({
        success: true,
        message: "Customer created successfully",
        Newcustomer
    });
});

exports.getCustomerById = catchAsyncError(async (req, res, next) => {
    const Newcustomer = await Newcustomer.findOne({ customerId: req.params.id });

    if (!Newcustomer) {
        return next(new ErrorHandler('Customer not found', 404));
    }

    res.status(200).json({
        success: true,
        Newcustomer
    });
});