const express = require('express');
const { createCustomer, getAllCustomers, getCustomerByIdOrName, updateCustomer, deleteCustomer, getCustomersByLoanType, getCustomersByCollectionPersonId } = require('../controllers/customerController');
const router = express.Router();

router.route('/new/addcustomer').post(createCustomer);
router.route('/customers').get(getAllCustomers); 
router.route('/customers/:query').get(getCustomerByIdOrName); 
router.route('/customers/:customerId').get(updateCustomer); 
router.route('/customers/:customerId').delete(deleteCustomer); 
router.route('/customerss/fil').get(getCustomersByLoanType); 
router.route('/emp/fil').get(getCustomersByCollectionPersonId);



module.exports = router