// Gestiona las peticiones HTTP y las respuestas, delegando la lógica de negocio a los servicios.
const { validationResult } = require("express-validator");
const RequestModel = require("../models/pedidosModel.cjs");

class RequestController {
  constructor() {
    this.requestModel = new RequestModel();
  }

  async getRequests(req, res) {
    try {
      const requests = await this.requestModel.getRequests();
      res.status(200).json(requests);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }
  async getRequestsByUserId(req, res) {
    try {
      const requests = await this.requestModel.getRequestsByUserId(
        req.params.id
      );
      res.status(200).json(requests);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async getRequest(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const request = await this.requestModel.getRequestById(req.params.id);
      res.status(200).json(request);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async createRequest(req, res) {
    try {
      await this.validations(req, res);

      const { usuarioId, carrito, aPagar, cuponCode } = req.body;

      const request = await this.requestModel.createRequest(
        usuarioId,
        carrito,
        aPagar,
        cuponCode
      );
      res.status(201).json(request);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async updateRequest(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const request = await this.requestModel.updateRequest(
        req.params.id,
        req.body
      );
      res.status(200).json(request);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async deleteRequest(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      const request = await this.requestModel.deleteRequest(req.params.id);
      res.status(204).json(request);
    } catch (error) {
      const errorObj = JSON.parse(error.message);
      res.status(errorObj.status).json({ message: errorObj.message });
    }
  }

  async searchRequests(req, res) {
    try {
      const requests = await this.requestModel.searchRequestsByName(
        req.query.name
      );
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //este metodo se encarga de verificar la validacion del express validator de modo que no se repita el codigo cada vez que se necesite hacer esto
  async validations(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
  }
}

module.exports = RequestController;
