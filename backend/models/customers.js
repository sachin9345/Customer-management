const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  loans: [{
    loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan' },
    loanType: String,
    amount: Number,
    status: String
  }],
  totalDueAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewCustomers', customersSchema);
