# E-Commerce Platform

A full-stack e-commerce platform built with Next.js, Node.js, Express, MongoDB, and Stripe payment integration.

## Features

- 🔐 **User Authentication**: Register, login, JWT-based authentication
- 🛍️ **Product Management**: CRUD operations for products with categories and reviews
- 🛒 **Shopping Cart**: Add/remove items, quantity management
- 💳 **Payment Integration**: Stripe payment processing with webhooks
- 📦 **Order Management**: Order creation, tracking, and status updates
- 👤 **User Profiles**: Profile management and order history
- 🎨 **Responsive UI**: Modern, mobile-friendly interface
- 🔒 **Security**: Input validation, rate limiting, CORS protection

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Query** for data fetching
- **Stripe Elements** for payment forms
- **Headless UI** for accessible components

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Stripe** for payment processing
- **Express Validator** for input validation
- **Helmet** for security headers
- **Rate Limiting** for API protection

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe account for payment processing

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrMajharul/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   **Backend (.env in server directory):**
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   PORT=5001
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

   **Frontend (.env.local in client directory):**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5001) and frontend development server (port 3000).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/reviews` - Add product review
- `GET /api/products/categories/list` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders (or all orders for admin)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/pay` - Update order payment status
- `PUT /api/orders/:id/deliver` - Mark order as delivered (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/confirm-payment` - Confirm payment
- `POST /api/payments/webhook` - Stripe webhook handler
- `POST /api/payments/create-refund` - Create refund

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)
- `GET /api/users/stats/overview` - Get user statistics (admin only)

## Database Schema

### User
- Personal information (name, email, password)
- Role-based access (user/admin)
- Address and contact information
- Email verification status

### Product
- Product details (name, description, price, images)
- Inventory management (stock, SKU)
- Categorization and tagging
- Reviews and ratings system
- Featured products

### Order
- Order items with product details
- Shipping address
- Payment information and status
- Order tracking and delivery status
- Refund management

## Stripe Integration

The platform integrates with Stripe for secure payment processing:

1. **Payment Intents**: Create secure payment intents for orders
2. **Webhooks**: Handle payment status updates automatically
3. **Refunds**: Process refunds through the admin panel
4. **Security**: PCI-compliant payment handling

## Security Features

- **Authentication**: JWT-based authentication with secure token handling
- **Authorization**: Role-based access control (user/admin)
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Security Headers**: Helmet.js for security headers
- **Password Security**: Bcrypt password hashing

## Development

### Project Structure
```
ecommerce-platform/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/          # API client and utilities
│   │   ├── store/        # Zustand stores
│   │   └── types/        # TypeScript types
├── server/                # Express.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── index.js          # Server entry point
└── package.json          # Root package.json
```

### Available Scripts
- `npm run dev` - Start both frontend and backend in development mode
- `npm run client` - Start only the frontend
- `npm run server` - Start only the backend
- `npm run build` - Build the frontend for production
- `npm run start` - Start the backend in production mode

## Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Configure environment variables for production
3. Deploy to your preferred platform (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Update API URLs in environment variables

### Stripe Webhooks
1. Configure webhook endpoints in your Stripe dashboard
2. Use ngrok or similar for local webhook testing
3. Set up production webhook URLs for live payments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
