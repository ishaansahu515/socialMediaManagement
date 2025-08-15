# SMMS Pro - Social Media Management Services

A full-stack React application with MongoDB authentication and Razorpay payment integration for social media management services.

## Features

- 🔐 Secure JWT authentication with HTTP-only cookies
- 💳 Razorpay payment integration for subscription plans
- 📊 MongoDB database for user and subscription management
- 🎨 Beautiful responsive UI with Tailwind CSS
- 🔒 Password hashing with bcrypt
- 📱 Mobile-first responsive design

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Razorpay for payments
- Cookie-parser for session management

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Razorpay account for payment processing

### Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

# Backend
MONGODB_URI=mongodb://localhost:27017/smms_pro
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB (if running locally):
```bash
mongod
```

3. Start the backend server:
```bash
npm run server
```

4. In a new terminal, start the frontend:
```bash
npm run dev
```

### Razorpay Setup

1. Create a Razorpay account at https://razorpay.com
2. Get your Key ID and Key Secret from the dashboard
3. Add them to your `.env` file
4. Enable required payment methods in your Razorpay dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment and activate subscription
- `GET /api/payments/subscription` - Get user subscription status

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/my-contacts` - Get user's contact submissions

## Subscription Plans

- **Starter**: ₹1,999/month
- **Growth**: ₹3,499/month  
- **Pro Boost**: ₹4,999/month

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens stored in HTTP-only cookies
- CORS protection
- Input validation and sanitization
- Secure payment signature verification

## Development

### Running in Development Mode

Frontend:
```bash
npm run dev
```

Backend with auto-reload:
```bash
npm run dev:server
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.