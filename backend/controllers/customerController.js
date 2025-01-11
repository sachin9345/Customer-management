const Customer = require('../models/customer');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

exports.createCustomer = catchAsyncError(async (req, res, next) => {
  const { customerId, customerName, loanType, amountOfLoan, numberOfDues, dueAmount, dueReceivedAmount, dateOfReceipt, collectionPersonName, collectionPersonId } = req.body;

  if (!customerId || !collectionPersonId) {
    return next(new ErrorHandler('Customer ID and Collection Person ID are required', 400));
  }

  const customer = await Customer.create({
    customerId,
    customerName,
    loanType,
    amountOfLoan,
    numberOfDues,
    dueAmount,
    dueReceivedAmount,
    dateOfReceipt,
    collectionPersonName,
    collectionPersonId
  });

  res.status(201).json({
    success: true,
    message: 'Customer created successfully',
    customer
  });
});


exports.getAllCustomers = catchAsyncError(async (req, res, next) => {
  const customers = await Customer.find();

  if (!customers || customers.length === 0) {
    return next(new ErrorHandler('No customers found', 404));
  }

  res.status(200).json({
    success: true,
    count: customers.length,
    customers
  });
});


exports.getCustomerByIdOrName = catchAsyncError(async (req, res, next) => {
  const query = req.params.query;

  let customers;
  if (query.startsWith('RVN')) {
   
    customers = await Customer.find({ customerId: query });
  } else {
 
    customers = await Customer.find({ customerName: query });
  }

  if (!customers || customers.length === 0) {
    return next(new ErrorHandler('Customer not found', 404));
  }

  res.status(200).json({
    success: true,
    customers
  });
});



exports.updateCustomer = catchAsyncError(async (req, res, next) => {
  let customer = await Customer.findOne({ customerId: req.params.customerId });

  if (!customer) {
    return next(new ErrorHandler('Customer not found', 404));
  }

  customer = await Customer.findOneAndUpdate({ customerId: req.params.customerId }, req.body, { new: true });

  res.status(200).json({
    success: true,
    message: 'Customer updated successfully',
    customer
  });
});


// Delete a customer
exports.deleteCustomer = catchAsyncError(async (req, res, next) => {
  const customer = await Customer.findOneAndDelete({ customerId: req.params.customerId });

  if (!customer) {
    return next(new ErrorHandler('Customer not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Customer deleted successfully'
  });
});


//sachin
exports.getCustomersByLoanType = catchAsyncError(async (req, res, next) => {
  const { loanType } = req.query;

  if (!loanType) {
      return next(new ErrorHandler('Loan type is required for filtering', 400));
  }

  const customers = await Customer.find({ loanType });

  if (!customers || customers.length === 0) {
      return next(new ErrorHandler(`No customers found with the loan type: ${loanType}`, 404));
  }

  res.status(200).json({
      success: true,
      count: customers.length,
      customers
  });
});

exports.getCustomersByCollectionPersonId = catchAsyncError(async (req, res, next) => {
  const { collectionPersonId } = req.query; 

  
  if (!collectionPersonId) {
      return next(new ErrorHandler('Collection Person ID is required', 400));
  }

  const customers = await Customer.find({ collectionPersonId });


  if (customers.length === 0) {
      return res.status(404).json({
          success: false,
          message: 'No customers found for the given Collection Person ID',
      });
  }
//sachin
  return res.status(200).json({
      success: true,
      customers,
  });
});

