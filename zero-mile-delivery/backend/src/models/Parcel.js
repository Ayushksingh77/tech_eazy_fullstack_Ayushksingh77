const { v4: uuidv4 } = require('uuid');

class Parcel {
  constructor({ customerName, deliveryAddress, contactNumber, size, weight }) {
    this.id = uuidv4();
    this.trackingNumber = `ZM-${Date.now()}`;
    this.customerName = customerName;
    this.deliveryAddress = deliveryAddress;
    this.contactNumber = contactNumber;
    this.size = size;
    this.weight = weight;
    this.status = 'Received at Warehouse';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Parcel;
