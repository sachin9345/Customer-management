const express = require('express');
const { createCustomer, getCustomerById } = require('../controllers/customersController');


const router = express.Router();

router.route('/newcustomers').post(createCustomer);
router.route('/newcustomers/:customerId').get(getCustomerById);

module.exports = router