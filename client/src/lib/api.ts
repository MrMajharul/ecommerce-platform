import axios, { AxiosResponse } from 'axios';
import { ApiResponse, PaginatedResponse, User, Product, Order, AuthState } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', credentials),
  
  getProfile: () =>
    api.get<ApiResponse<{ user: User }>>('/auth/me'),
  
  updateProfile: (userData: Partial<User>) =>
    api.put<ApiResponse<{ user: User }>>('/auth/profile', userData),
  
  changePassword: (passwords: { currentPassword: string; newPassword: string }) =>
    api.post<ApiResponse<null>>('/auth/change-password', passwords),
};

// Products API
export const productsAPI = {
  getProducts: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    featured?: boolean;
    sort?: string;
  }) =>
    api.get<PaginatedResponse<Product>>('/products', { params }),
  
  getProduct: (id: string) =>
    api.get<ApiResponse<{ product: Product }>>(`/products/${id}`),
  
  createProduct: (productData: Partial<Product>) =>
    api.post<ApiResponse<{ product: Product }>>('/products', productData),
  
  updateProduct: (id: string, productData: Partial<Product>) =>
    api.put<ApiResponse<{ product: Product }>>(`/products/${id}`, productData),
  
  deleteProduct: (id: string) =>
    api.delete<ApiResponse<null>>(`/products/${id}`),
  
  addReview: (productId: string, review: { rating: number; comment?: string }) =>
    api.post<ApiResponse<{ product: Product }>>(`/products/${productId}/reviews`, review),
  
  getCategories: () =>
    api.get<ApiResponse<{ categories: string[] }>>('/products/categories/list'),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData: {
    orderItems: Array<{ product: string; quantity: number }>;
    shippingAddress: any;
    paymentMethod?: string;
  }) =>
    api.post<ApiResponse<{ order: Order }>>('/orders', orderData),
  
  getOrders: (params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Order>>('/orders', { params }),
  
  getOrder: (id: string) =>
    api.get<ApiResponse<{ order: Order }>>(`/orders/${id}`),
  
  updateOrderPayment: (id: string, paymentResult: any) =>
    api.put<ApiResponse<{ order: Order }>>(`/orders/${id}/pay`, { paymentResult }),
  
  updateOrderDelivery: (id: string) =>
    api.put<ApiResponse<{ order: Order }>>(`/orders/${id}/deliver`),
  
  updateOrderStatus: (id: string, status: string, trackingNumber?: string) =>
    api.put<ApiResponse<{ order: Order }>>(`/orders/${id}/status`, { status, trackingNumber }),
};

// Payments API
export const paymentsAPI = {
  createPaymentIntent: (orderId: string) =>
    api.post<ApiResponse<{ clientSecret: string; paymentIntentId: string }>>('/payments/create-payment-intent', { orderId }),
  
  confirmPayment: (paymentIntentId: string) =>
    api.post<ApiResponse<{ order: Order }>>('/payments/confirm-payment', { paymentIntentId }),
  
  createRefund: (orderId: string, amount?: number, reason?: string) =>
    api.post<ApiResponse<{ refund: any }>>('/payments/create-refund', { orderId, amount, reason }),
};

// Users API
export const usersAPI = {
  getUsers: (params?: { page?: number; limit?: number }) =>
    api.get<PaginatedResponse<User>>('/users', { params }),
  
  getUser: (id: string) =>
    api.get<ApiResponse<{ user: User }>>(`/users/${id}`),
  
  updateUser: (id: string, userData: Partial<User>) =>
    api.put<ApiResponse<{ user: User }>>(`/users/${id}`, userData),
  
  deleteUser: (id: string) =>
    api.delete<ApiResponse<null>>(`/users/${id}`),
  
  getUserStats: () =>
    api.get<ApiResponse<{ stats: any }>>('/users/stats/overview'),
};

export default api;
