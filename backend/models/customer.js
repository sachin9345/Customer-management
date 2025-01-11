const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true}, 
  customerName: { type: String, required: true },
  loanType: { type: String, required: true },
  amountOfLoan: { type: Number, required: true },
  numberOfDues: { type: Number, required: true },
  dueAmount: { type: Number, required: true },
  dueReceivedAmount: { type: Number, required: true },
  dateOfReceipt: { type: Date, required: true },
  collectionPersonName: { type: String, required: true },
  collectionPersonId: { type: String, required: true }, 
  pendingDues: { type: Number, default: 0 },
});
//sachin
customerSchema.pre('save', function(next) {
  this.pendingDues = (this.numberOfDues * this.dueAmount) - this.dueReceivedAmount;
  next();
});

module.exports = mongoose.model('Customer', customerSchema);
