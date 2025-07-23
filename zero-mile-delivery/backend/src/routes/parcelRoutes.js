const express = require('express');
const router = express.Router();
const ParcelService = require('../services/parcelService');

// Create a new parcel
router.post('/', (req, res) => {
  try {
    const parcel = ParcelService.createParcel(req.body);
    res.status(201).json({
      success: true,
      data: parcel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all parcels
router.get('/', (req, res) => {
  try {
    const parcels = ParcelService.getAllParcels();
    res.status(200).json({
      success: true,
      count: parcels.length,
      data: parcels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Get parcel by tracking number
router.get('/:trackingNumber', (req, res) => {
  try {
    const parcel = ParcelService.getParcelByTrackingNumber(req.params.trackingNumber);
    
    if (!parcel) {
      return res.status(404).json({
        success: false,
        error: 'Parcel not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: parcel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Update a parcel
router.put('/:id', (req, res) => {
  try {
    const updatedParcel = ParcelService.updateParcel(req.params.id, req.body);
    
    if (!updatedParcel) {
      return res.status(404).json({
        success: false,
        error: 'Parcel not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedParcel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// Delete a parcel
router.delete('/:id', (req, res) => {
  try {
    const success = ParcelService.deleteParcel(req.params.id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Parcel not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
