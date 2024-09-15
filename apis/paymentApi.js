const express=require('express')
const paymentApi=express.Router()

const paymentService=require('../services/paymentService')
const {validatePayment}=require('../middleware/paymentMiddelWare')


paymentApi.get('/',paymentService.getPayment);
paymentApi.get('/:id',paymentService.getPaymentById)

paymentApi.post('/',validatePayment,paymentService.createPayment)
paymentApi.put('/:id',validatePayment,paymentService.updatedPayment)
paymentApi.delete('/:id',paymentService.deletePayment)

module.exports=paymentApi;