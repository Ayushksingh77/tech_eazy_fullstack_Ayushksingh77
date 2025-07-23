import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [parcels, setParcels] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    deliveryAddress: '',
    contactNumber: '',
    size: '',
    weight: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all parcels
  const fetchParcels = async () => {
    try {
      const response = await axios.get('/api/parcels');
      setParcels(response.data.data);
    } catch (error) {
      console.error('Error fetching parcels:', error);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing parcel
        await axios.put(`/api/parcels/${editingId}`, formData);
      } else {
        // Create new parcel
        await axios.post('/api/parcels', formData);
      }
      // Reset form and refresh parcel list
      setFormData({
        customerName: '',
        deliveryAddress: '',
        contactNumber: '',
        size: '',
        weight: ''
      });
      setEditingId(null);
      fetchParcels();
    } catch (error) {
      console.error('Error saving parcel:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (parcel) => {
    setFormData({
      customerName: parcel.customerName,
      deliveryAddress: parcel.deliveryAddress,
      contactNumber: parcel.contactNumber,
      size: parcel.size,
      weight: parcel.weight
    });
    setEditingId(parcel.id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this parcel?')) {
      try {
        await axios.delete(`/api/parcels/${id}`);
        fetchParcels();
      } catch (error) {
        console.error('Error deleting parcel:', error);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Zero Mile Delivery System</h1>
      </header>
      
      <main className="container">
        <section className="form-section">
          <h2>{editingId ? 'Edit Parcel' : 'Add New Parcel'}</h2>
          <form onSubmit={handleSubmit} className="parcel-form">
            <div className="form-group">
              <label>Customer Name:</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Delivery Address:</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Size:</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="X-Large">X-Large</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  min="0.1"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Parcel' : 'Add Parcel'}
            </button>
            
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setFormData({
                    customerName: '',
                    deliveryAddress: '',
                    contactNumber: '',
                    size: '',
                    weight: ''
                  });
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>
        
        <section className="parcel-list">
          <h2>Parcel List</h2>
          {parcels.length === 0 ? (
            <p>No parcels found. Add a new parcel to get started.</p>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Size</th>
                    <th>Weight (kg)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parcels.map((parcel) => (
                    <tr key={parcel.id}>
                      <td>{parcel.trackingNumber}</td>
                      <td>{parcel.customerName}</td>
                      <td>{parcel.deliveryAddress}</td>
                      <td>{parcel.size}</td>
                      <td>{parcel.weight}</td>
                      <td>
                        <span className={`status-badge ${parcel.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {parcel.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(parcel)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(parcel.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
