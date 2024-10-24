// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const PaymentsController = require('../controllers/paymentsController.cjs');

const router = express.Router();
const paymentsController = new PaymentsController();

router.get('/search', (req, res) => paymentsController.searchPayments(req, res));
router.get('/', (req, res) => paymentsController.getPayments(req, res));
router.get('/:id', (req, res) => paymentsController.getPaymentsById(req, res));
router.post('/', (req, res) => paymentsController.createPayments(req, res));
router.put('/:id', (req, res) => paymentsController.updatePayments(req, res));
router.delete('/:id', (req, res) => paymentsController.deletePayments(req, res));

module.exports = router;