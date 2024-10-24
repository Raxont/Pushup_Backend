
const { validationResult } = require('express-validator');
const PaymentsModel = require('../models/pagosModel.cjs');

class PaymentsController {
    constructor() {
        this.paymentsModel = new PaymentsModel();
    }

    async getPayments(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const payments = await this.paymentsModel.getPayments();
            res.status(200).json(payments);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getPaymentsById(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const payments = await this.paymentsModel.getPaymentsById(req.params.id);
            res.status(200).json(payments);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createPayments(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const payments = await this.paymentsModel.createPayments(req.body);
            res.status(201).json(payments);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updatePayments(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const payments = await this.paymentsModel.updatePayments(req.params.id, req.body);
            res.status(200).json(payments);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deletePayments(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const payments = await this.paymentsModel.deletePayments(req.params.id);
            // Este código indica que la solicitud fue exitosa y que el recurso ha sido eliminado, pero no hay contenido adicional para enviar en la respuesta.
            res.status(204).json(payments);
            // En algunos casos, 200 OK también puede ser utilizado si la respuesta incluye información adicional o confirmación sobre la eliminación. Sin embargo, 204 No Content es la opción más estándar para indicar que un recurso ha sido eliminado y no hay contenido adicional en la respuesta.
            // res.status(200).json(payments);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
        
    }
    
    async searchPayments(req, res) {
        try {
            const paymentss = await this.paymentsModel.searchPaymentssByName(req.query.name);
            res.json(paymentss);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PaymentsController;