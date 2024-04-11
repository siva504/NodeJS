const express = require('express');
const router = express.Router();
const customerRoutes = require('./customerRoutes');

router.use('/Customer_Details', customerRoutes);

module.exports = router;
