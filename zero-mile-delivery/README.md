# Zero Mile Delivery System

A comprehensive logistics solution for managing last-mile parcel delivery from a central warehouse.

## Features

- **Vendor Portal**: Vendors can submit parcel lists
- **Parcel Management**: CRUD operations for parcels
- **Real-time Tracking**: Track parcel status updates
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Built with Node.js and Express
- **Modern Frontend**: Built with React

## Project Structure

```
zero-mile-delivery/
├── backend/         # Node.js/Express backend
│   ├── src/         # Source files
│   ├── package.json # Backend dependencies
│   └── README.md    # Backend documentation
├── frontend/        # React frontend
│   ├── src/         # Source files
│   ├── public/      # Static files
│   ├── package.json # Frontend dependencies
│   └── README.md    # Frontend documentation
├── .gitignore      # Git ignore file
└── README.md       # This file
```

## Prerequisites

- Node.js (v14 or later)
- npm (comes with Node.js)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will open in your default browser at `http://localhost:3000`

## API Documentation

### Endpoints

- `POST /api/parcels` - Create a new parcel
- `GET /api/parcels` - Get all parcels
- `GET /api/parcels/:trackingNumber` - Get a specific parcel
- `PUT /api/parcels/:id` - Update a parcel
- `DELETE /api/parcels/:id` - Delete a parcel

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
NODE_ENV=development
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
