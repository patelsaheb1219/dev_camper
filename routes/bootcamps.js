const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: `Show All Bootcamps` })
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, message: `Get Bootcamp ${req.params.id}` })
});

router.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, message: `Create new Bootcamp` })
});

router.put('/:id', (req, res) => {
  res.status(200).json({ success: true, message: `Update Bootcamp ${req.params.id}` })
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, message: `Delete Bootcamp ${req.params.id}` })
});

module.exports = router;