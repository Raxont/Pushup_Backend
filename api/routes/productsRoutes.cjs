// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const ProductsController = require('../controllers/productsController.cjs');

const router = express.Router();
const productsController = new ProductsController();

router.get('/search', (req, res) => productsController.searchProducts(req, res));
router.get('/', (req, res) => productsController.getProducts(req, res));
router.get('/:id',(req, res) => productsController.getProductsById(req, res));
router.get('/category/:categoria', (req, res) => productsController.getProductsByCategory(req, res));
router.get('/discounts/:categoria', (req, res) => productsController.getProductsByCategoryForDiscounts(req, res));
router.get('/favourites/:id/:categoria', (req, res) => productsController.getFavouriteProducts(req, res));
router.post('/', (req, res) => productsController.createProducts(req, res));
router.put('/:id', (req, res) => productsController.updateProducts(req, res));
router.delete('/:id', (req, res) => productsController.deleteProducts(req, res));

module.exports = router;