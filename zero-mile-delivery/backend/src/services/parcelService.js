const Parcel = require('../models/Parcel');

// In-memory storage
let parcels = [];

class ParcelService {
  // Create a new parcel
  static createParcel(parcelData) {
    const parcel = new Parcel(parcelData);
    parcels.push(parcel);
    return parcel;
  }

  // Get all parcels
  static getAllParcels() {
    return [...parcels];
  }

  // Get parcel by tracking number
  static getParcelByTrackingNumber(trackingNumber) {
    return parcels.find(p => p.trackingNumber === trackingNumber);
  }

  // Update parcel
  static updateParcel(id, updateData) {
    const index = parcels.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    parcels[index] = {
      ...parcels[index],
      ...updateData,
      updatedAt: new Date()
    };
    
    return parcels[index];
  }

  // Delete parcel
  static deleteParcel(id) {
    const index = parcels.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    parcels.splice(index, 1);
    return true;
  }
}

module.exports = ParcelService;
