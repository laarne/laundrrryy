# Wash Connect - Complete Application Documentation

**Version:** 1.0.0  
**Author:** John Michael  
**Date:** November 2025

---

## Table of Contents

1. [Application Overview](#application-overview)
2. [System Architecture](#system-architecture)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Code Explanation](#code-explanation)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [How It Works](#how-it-works)
10. [Setup & Installation](#setup--installation)
11. [Usage Guide](#usage-guide)

---

## Application Overview

**Wash Connect** is a comprehensive laundry management system designed to help laundry businesses manage orders, customers, payments, and generate reports. The application is built as an Electron desktop app with a modern web-based interface.

### Key Capabilities

- **Order Management**: Create, edit, and track laundry orders
- **Customer Management**: Add, edit, and manage customer information
- **Payment Tracking**: Mark orders as paid/unpaid with payment methods
- **Customer Notifications**: Send SMS updates to customers based on their mobile number (e.g., when orders are ready)
- **Digital Receipts**: Generate digital receipts for completed orders that can be viewed via link or printed
- **Analytics Dashboard**: View daily and monthly income statistics
- **Reports**: Generate weekly, monthly, and custom date range reports
- **Mobile Support**: Responsive design works on mobile devices

---

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│           Electron Desktop Application           │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐      ┌──────────────┐       │
│  │   Frontend   │◄────►│   Backend    │       │
│  │  (HTML/CSS/  │      │  (Express.js) │       │
│  │   JavaScript)│      │              │       │
│  └──────────────┘      └──────┬───────┘       │
│                                │                │
│                                ▼                │
│                         ┌──────────────┐       │
│                         │   Supabase   │       │
│                         │   Database   │       │
│                         └──────────────┘       │
└─────────────────────────────────────────────────┘
```

### Components

1. **Frontend** (`frontend/`)
   - HTML structure
   - CSS styling
   - JavaScript for interactivity
   - Chart.js for visualizations

2. **Backend** (`backend/server.js`)
   - Express.js REST API
   - Supabase integration
   - Business logic (pricing, calculations)
   - Data validation

3. **Database** (Supabase)
   - PostgreSQL database
   - Tables: `orders`, `customers`, `users`

4. **Electron** (`main.js`)
   - Desktop app wrapper
   - Auto-starts backend server
   - Opens browser window

---

## Features

### 1. Dashboard
- **Today's Income**: Total revenue for current day
- **Today's Orders**: Number of orders created today
- **Month Income**: Total revenue for current month
- **Status Overview**: Count of orders by status (Pending, Washing, Ready, Completed, Cancelled)

### 2. Order Management
- **Create Orders**: 
  - Select customer (searchable)
  - Choose service type (Wash & Fold, Wash & Iron, Dry Clean)
  - Enter weight (minimum 6kg)
  - Add optional notes
  - Select add-ons (Fabcon, Extra Powder)
  - Automatic price calculation

- **View Orders**: 
  - Table view with all order details
  - Search and filter functionality
  - Status badges
  - Payment status indicators

- **Edit Orders**: 
  - Modify service type, weight, add-ons, notes
  - Automatic price recalculation

- **Update Status**: 
  - Change order status (Pending → Washing → Ready → Completed)
  - Cancel orders

- **Payment Tracking**: 
  - Mark orders as paid/unpaid
  - Track payment method (cash, card, online)
  - Payment date recording

### 3. Customer Notifications & Digital Receipts
**Current prototype implementation is frontend-only (no real SMS is sent, no backend integration yet).**

- **SMS Notifications (Prototype + Design):**
  - UI button in the Orders list opens a \"Send SMS Notification\" modal.
  - The modal auto-fills customer name, phone (if found), and a message preview based on order details.
  - Clicking **Send (Prototype)** only shows a toast; it does **not** call any external SMS API.
  - Design goal for a full system: use the customer's mobile number stored in the `customers` table and integrate with an SMS gateway provider (e.g., Twilio, Vonage, local telco API) to send real messages when order status changes (e.g., Ready, Completed).

- **Digital Receipts (Prototype + Design):**
  - UI button in the Orders list opens a **Digital Receipt** modal showing:
    - Customer info, order ID and date
    - Service, weight, add-ons, price
    - Order status and payment status
  - The modal allows printing via the browser/Electron window (e.g., \"Save as PDF\").
  - Design goal for a full system: generate a permanent receipt view/link that can be sent via SMS or email and saved as a PDF file.

### 4. Customer Management
- **Add Customers**: Name, phone, address
- **Edit Customers**: Update customer information
- **Delete Customers**: Remove customers with confirmation
- **Search Customers**: Quick search when creating orders

### 5. Reports & Analytics
- **Weekly Report**: Last 7 days
- **Monthly Report**: Current month
- **Custom Date Range**: Select start and end dates
- **Report Features**:
  - Total sales summary
  - Order count
  - Status breakdown
  - Daily sales chart
  - Orders list
  - Export to CSV
  - Print functionality

---

## Technology Stack

### Frontend
- **HTML5**: Structure and markup
- **CSS3**: Styling with CSS variables and modern layouts
- **JavaScript (ES6+)**: Client-side logic
- **Chart.js 4.4.0**: Data visualization

### Backend
- **Node.js**: Runtime environment
- **Express.js 4.19.2**: Web framework
- **Supabase Client 2.43.4**: Database client
- **express-validator 7.0.1**: Input validation
- **dotenv 16.3.1**: Environment variables

### Desktop App
- **Electron 30.0.0**: Desktop application framework
- **electron-builder 24.13.3**: App packaging

---

## Project Structure

```
laundry-app/
├── backend/
│   ├── server.js          # Main Express server
│   └── data/              # (Legacy - not used)
│       ├── customers.json
│       └── orders.json
├── frontend/
│   ├── index.html         # Main HTML file
│   ├── app.js             # Frontend JavaScript
│   ├── styles.css         # All styling
│   └── icon.png           # App icon
├── main.js                # Electron entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment template
└── .gitignore             # Git ignore rules
```

---

## Code Explanation

### 1. Backend Server (`backend/server.js`)

#### Configuration

```javascript
require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase connection
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
```

**Explanation**: 
- Loads environment variables from `.env` file
- Creates Express app instance
- Connects to Supabase database using credentials from environment variables

#### Pricing Configuration

```javascript
const PRICING = {
    'Wash & Fold': 160,  // Base price for first 6kg
    'Wash & Iron': 200,  // Base price for first 6kg
    'Dry Clean': 250     // Base price for first 6kg
};

const EXCESS_RATE = 20;  // 20 Pesos per additional kg
const MIN_WEIGHT = 6;    // Minimum kilos
const ADDON_PRICE = 10;  // Price per add-on
```

**Explanation**: 
- Defines base prices for each service type
- Excess weight charged at ₱20 per kg over 6kg
- Add-ons cost ₱10 each

#### Order Creation Endpoint

```javascript
app.post('/api/orders', [
    body('customer_id').notEmpty(),
    body('service_type').isIn(['Wash & Fold', 'Wash & Iron', 'Dry Clean']),
    body('weight_kg').isFloat({ min: MIN_WEIGHT, max: 100 }),
    body('add_ons').optional().isArray(),
    body('notes').optional().trim().escape()
], validate, async (req, res) => {
    // Price calculation logic
    const basePrice = PRICING[service_type] || 0;
    const weight = parseFloat(weight_kg);
    
    // Calculate excess weight cost
    let excessCost = 0;
    if (weight > MIN_WEIGHT) {
        excessCost = (weight - MIN_WEIGHT) * EXCESS_RATE;
    }
    
    // Calculate add-ons cost
    let addonsCost = 0;
    if (add_ons && Array.isArray(add_ons)) {
        addonsCost = add_ons.length * ADDON_PRICE;
    }
    
    // Total price
    const totalPrice = basePrice + excessCost + addonsCost;
    
    // Insert into database
    const { data, error } = await supabase
        .from('orders')
        .insert([{ 
            customer_id, 
            service_type, 
            weight_kg: weight, 
            price: totalPrice, 
            notes: notes || '',
            add_ons: add_ons || [], 
            status: 'pending'
        }])
        .select()
        .single();
});
```

**Explanation**:
1. **Validation**: Uses express-validator to validate input
2. **Price Calculation**:
   - Gets base price for service type
   - Calculates excess weight cost if weight > 6kg
   - Adds add-ons cost (₱10 each)
   - Sums all costs
3. **Database Insert**: Saves order to Supabase with calculated price

#### Reports Endpoint

```javascript
app.get('/api/reports', async (req, res) => {
    const { type, startDate, endDate } = req.query;
    
    // Calculate date range based on type
    let start, end;
    switch (type) {
        case 'weekly':
            end = new Date();
            start = new Date();
            start.setDate(start.getDate() - 7);
            break;
        case 'monthly':
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date();
            break;
        case 'custom':
            start = new Date(startDate);
            end = new Date(endDate);
            break;
    }
    
    // Fetch orders in date range
    const { data: orders } = await supabase
        .from('orders')
        .select('*, customer:customers(name)')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
    
    // Calculate statistics
    const totalSales = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0);
    
    // Group sales by date for chart
    const dailySales = {};
    orders.forEach(order => {
        const date = new Date(order.created_at);
        const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        if (!dailySales[dateKey]) dailySales[dateKey] = 0;
        dailySales[dateKey] += parseFloat(order.price) || 0;
    });
    
    // Return report data
    res.json({
        totalSales,
        totalOrders: orders.length,
        statusCounts: { /* ... */ },
        orders: formattedOrders,
        chartData: { labels, values }
    });
});
```

**Explanation**:
1. **Date Range**: Calculates start/end dates based on report type
2. **Data Fetching**: Gets orders within date range from Supabase
3. **Statistics**: Calculates total sales, order counts, status breakdowns
4. **Chart Data**: Groups sales by date for visualization
5. **Response**: Returns formatted report data

### 2. Frontend (`frontend/app.js`)

#### Application Initialization

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000/api';
    
    // DOM elements
    const loginScreen = document.getElementById('login-screen');
    const appContainer = document.getElementById('app-container');
    const views = {
        dashboard: document.getElementById('dashboard-view'),
        orders: document.getElementById('orders-view'),
        customers: document.getElementById('customers-view'),
        reports: document.getElementById('reports-view')
    };
});
```

**Explanation**: 
- Waits for DOM to load
- Defines API endpoint URL
- Caches DOM elements for performance

#### Navigation System

```javascript
function switchView(viewName) {
    // Hide all views
    Object.values(views).forEach(el => el.classList.add('hidden'));
    
    // Remove active class from all buttons
    Object.values(navBtns).forEach(el => el.classList.remove('active'));
    
    // Show selected view
    views[viewName].classList.remove('hidden');
    
    // Highlight selected button
    navBtns[viewName].classList.add('active');
    
    // Load data for view
    if (viewName === 'dashboard') loadDashboardData();
    if (viewName === 'orders') loadOrders();
    if (viewName === 'customers') loadCustomers();
}
```

**Explanation**:
- Single-page application pattern
- Shows/hides views using CSS classes
- Updates navigation button states
- Loads data when switching views

#### Order Loading and Display

```javascript
async function loadOrders() {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '<tr><td colspan="9">Loading...</td></tr>';
    
    try {
        const res = await fetch(`${API_URL}/orders`);
        const orders = await res.json();
        
        allOrders = orders; // Store for filtering
        displayOrders(orders);
    } catch (err) {
        showToast('Failed to load orders', 'error');
    }
}

function displayOrders(orders) {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const tr = document.createElement('tr');
        const addOnsDisplay = order.add_ons?.join(', ') || '-';
        const paymentStatus = order.payment_status || 'unpaid';
        
        tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer_name}</td>
            <td>${order.service_type}</td>
            <td>${order.weight_kg} kg</td>
            <td>${addOnsDisplay}</td>
            <td>₱${order.price.toFixed(2)}</td>
            <td>${paymentBadge}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>
                <select onchange="updateStatus('${order.id}', this.value)">
                    <option value="pending">Pending</option>
                    <option value="washing">Washing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                </select>
                <button onclick="markPayment('${order.id}', 'paid')">Mark Paid</button>
                <button onclick="openEditOrderModal('${order.id}')">Edit</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
```

**Explanation**:
1. **Fetch Data**: Gets orders from API
2. **Store for Filtering**: Saves orders for search/filter functionality
3. **Render Table**: Creates table rows dynamically
4. **Interactive Elements**: Adds dropdowns and buttons for actions

#### Toast Notification System

```javascript
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
```

**Explanation**:
- Creates notification elements dynamically
- Shows different icons based on type
- Auto-dismisses after 4 seconds
- Smooth animations for show/hide

#### Chart Rendering

```javascript
function updateChart(chartData) {
    const canvas = document.getElementById('sales-chart');
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart
    if (salesChart) {
        salesChart.destroy();
    }
    
    // Format date labels
    const formattedLabels = chartData.labels.map(date => {
        const [year, month, day] = date.split('-');
        const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    // Create Chart.js instance
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: formattedLabels,
            datasets: [{
                label: 'Daily Sales (₱)',
                data: chartData.values,
                borderColor: '#4318FF',
                backgroundColor: 'rgba(67, 24, 255, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₱' + value.toFixed(0);
                        }
                    }
                }
            }
        }
    });
}
```

**Explanation**:
1. **Canvas Setup**: Gets 2D rendering context
2. **Chart Cleanup**: Destroys previous chart instance
3. **Label Formatting**: Converts dates to readable format
4. **Chart Creation**: Uses Chart.js to render line chart
5. **Styling**: Custom colors and formatting

### 3. Electron Main Process (`main.js`)

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Start backend server automatically
require('./backend/server.js');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "Wash Connect System",
        icon: "frontend/icon.png",
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    // Wait for server to start, then load app
    setTimeout(() => {
        win.loadURL('http://localhost:3000');
    }, 1500);
}

app.whenReady().then(createWindow);
```

**Explanation**:
1. **Server Startup**: Requires server.js to start Express server
2. **Window Creation**: Creates Electron browser window
3. **Delayed Load**: Waits 1.5 seconds for server to start
4. **URL Loading**: Loads localhost:3000 in the window

---

## Database Schema

### Orders Table

```sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT REFERENCES customers(id),
    service_type TEXT NOT NULL,
    weight_kg DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    add_ons TEXT[],  -- Array of strings
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'unpaid',  -- Optional
    payment_method TEXT,                   -- Optional
    payment_date TIMESTAMPTZ,             -- Optional
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields**:
- `id`: Unique order identifier
- `customer_id`: Foreign key to customers table
- `service_type`: Type of service (Wash & Fold, Wash & Iron, Dry Clean)
- `weight_kg`: Order weight in kilograms
- `price`: Calculated total price
- `notes`: Optional notes/instructions
- `add_ons`: Array of selected add-ons
- `status`: Order status (pending, washing, ready, completed, cancelled)
- `payment_status`: Payment status (paid, unpaid) - optional
- `payment_method`: How payment was made - optional
- `payment_date`: When payment was made - optional
- `created_at`: Order creation timestamp
- `updated_at`: Last update timestamp

### Customers Table

```sql
CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Fields**:
- `id`: Unique customer identifier
- `name`: Customer full name
- `phone`: Contact phone number
- `address`: Customer address
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

### Users Table (for authentication)

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Endpoints

### Authentication

**POST** `/api/login`
- **Body**: `{ username, password }`
- **Response**: `{ success: true, user: {...} }`
- **Description**: Authenticates user and returns user data

### Customers

**GET** `/api/customers?search=term`
- **Query**: `search` (optional) - search by name
- **Response**: Array of customers
- **Description**: Get all customers, optionally filtered by search term

**POST** `/api/customers`
- **Body**: `{ name, phone, address }`
- **Response**: Created customer object
- **Description**: Create new customer

**PUT** `/api/customers/:id`
- **Body**: `{ name?, phone?, address? }`
- **Response**: Updated customer object
- **Description**: Update customer information

**DELETE** `/api/customers/:id`
- **Response**: `{ message: 'Customer deleted successfully' }`
- **Description**: Delete customer

### Orders

**GET** `/api/orders`
- **Response**: Array of orders with customer names
- **Description**: Get all orders

**POST** `/api/orders`
- **Body**: `{ customer_id, service_type, weight_kg, notes?, add_ons? }`
- **Response**: Created order object
- **Description**: Create new order (price calculated automatically)

**PUT** `/api/orders/:id`
- **Body**: `{ service_type?, weight_kg?, add_ons?, notes? }`
- **Response**: Updated order object
- **Description**: Update order (price recalculated)

**PATCH** `/api/orders/:id/status`
- **Body**: `{ status }`
- **Response**: Updated order object
- **Description**: Update order status

**PATCH** `/api/orders/:id/payment`
- **Body**: `{ payment_status, payment_method?, payment_date? }`
- **Response**: Updated order object
- **Description**: Update payment information

### Analytics

**GET** `/api/analytics/summary`
- **Response**: `{ today: {...}, month: {...}, statusCounts: {...} }`
- **Description**: Get dashboard statistics

### Reports

**GET** `/api/reports?type=weekly|monthly|custom&startDate=&endDate=`
- **Query Parameters**:
  - `type`: Report type (required)
  - `startDate`: Start date for custom reports (ISO format)
  - `endDate`: End date for custom reports (ISO format)
- **Response**: `{ totalSales, totalOrders, statusCounts, orders, chartData }`
- **Description**: Generate report with statistics and chart data

---

## How It Works

### Order Creation Flow

```
1. User fills out order form
   ↓
2. Frontend validates input (weight >= 6kg)
   ↓
3. Frontend sends POST request to /api/orders
   ↓
4. Backend validates data (express-validator)
   ↓
5. Backend calculates price:
   - Base price (service type)
   - Excess weight cost (if weight > 6kg)
   - Add-ons cost (₱10 each)
   ↓
6. Backend inserts order into Supabase
   ↓
7. Backend returns created order
   ↓
8. Frontend shows success toast
   ↓
9. Frontend refreshes orders list
   ↓
10. Frontend updates dashboard
```

### Price Calculation Example

**Order Details**:
- Service: Wash & Fold (₱160 base)
- Weight: 8 kg
- Add-ons: Fabcon, Powder (2 items)

**Calculation**:
```
Base Price:        ₱160.00
Excess Weight:     (8 - 6) × ₱20 = ₱40.00
Add-ons:           2 × ₱10 = ₱20.00
─────────────────────────────
Total:             ₱220.00
```

### Report Generation Flow

```
1. User selects report type (Weekly/Monthly/Custom)
   ↓
2. If Custom: User selects date range
   ↓
3. User clicks "Generate Report"
   ↓
4. Frontend sends GET request to /api/reports
   ↓
5. Backend calculates date range
   ↓
6. Backend fetches orders in date range
   ↓
7. Backend calculates:
   - Total sales
   - Order counts
   - Status breakdown
   - Daily sales grouped by date
   ↓
8. Backend returns report data
   ↓
9. Frontend displays:
   - Summary cards
   - Status cards
   - Chart (Chart.js)
   - Orders table
   ↓
10. User can export to CSV or print
```

### Payment Tracking Flow

```
1. User clicks "Mark Paid" button
   ↓
2. Frontend sends PATCH request to /api/orders/:id/payment
   ↓
3. Backend updates payment_status to 'paid'
   ↓
4. Backend sets payment_date to current timestamp
   ↓
5. Backend sets payment_method (default: 'cash')
   ↓
6. If payment columns don't exist:
   - Store in notes field as [PAYMENT:PAID]
   ↓
7. Backend returns updated order
   ↓
8. Frontend refreshes orders list
   ↓
9. Payment badge updates to "Paid"
```

---

## Setup & Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Supabase account and project
- Git (optional)

### Step 1: Clone/Download Project

```bash
# If using git
git clone <repository-url>
cd "laundry app for improvments"

# Or extract downloaded ZIP file
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Express.js
- Supabase client
- Electron
- Other dependencies

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_key_here
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123
```

### Step 4: Set Up Database

1. Go to Supabase Dashboard
2. Create tables (see Database Schema section)
3. Add payment columns (optional but recommended):
```sql
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid',
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMPTZ;
```

### Step 5: Run Application

**Development Mode:**
```bash
npm start
```

This will:
1. Start Express server on port 3000
2. Open Electron window
3. Load application

**Build for Distribution:**
```bash
npm run dist
```

Creates installer in `dist/` folder.

---

## Usage Guide

### Creating an Order

1. Navigate to "Orders List" tab
2. Fill out the form:
   - Search and select customer
   - Choose service type
   - Enter weight (minimum 6kg)
   - Add notes (optional)
   - Select add-ons (optional)
3. Click "Create Order"
4. Order appears in table with calculated price

### Managing Orders

- **Update Status**: Use dropdown in Actions column
- **Mark as Paid**: Click "Mark Paid" button
- **Edit Order**: Click "Edit" button, modify details, click "Save Changes"

### Viewing Reports

1. Navigate to "Reports" tab
2. Select report type:
   - **Weekly**: Last 7 days
   - **Monthly**: Current month
   - **Custom**: Select date range
3. Click "Generate Report"
4. View:
   - Summary statistics
   - Status breakdown
   - Sales trend chart
   - Orders list
5. Export or print if needed

### Managing Customers

1. Navigate to "Customers" tab
2. **Add**: Fill form and click "Save Customer"
3. **Edit**: Click "Edit" button, modify, save
4. **Delete**: Click "Delete" button, confirm

---

## Key Features Explained

### Automatic Price Calculation

The system automatically calculates order prices based on:
- Service type base price
- Weight (excess over 6kg charged at ₱20/kg)
- Add-ons (₱10 each)

No manual calculation needed - reduces errors.

### Search and Filter

- **Search**: Type in search box to find orders by customer name, ID, or service
- **Filter by Status**: Dropdown to show only specific statuses
- **Filter by Service**: Dropdown to show only specific service types
- **Clear**: Reset all filters

### Responsive Design

- **Desktop**: Full sidebar navigation
- **Tablet**: Adjusted layout
- **Mobile**: Horizontal navigation, stacked forms, scrollable tables

### Toast Notifications

Replaces browser alerts with:
- Beautiful animations
- Color-coded types (success, error, warning, info)
- Auto-dismiss after 4 seconds
- Manual close option

### Chart Visualization

- Line chart showing daily sales trends
- Interactive tooltips
- Responsive sizing
- Fills missing dates with zero values

---

## Security Considerations

### Current Implementation

- Environment variables for sensitive data
- Input validation on backend
- Input sanitization (XSS prevention)
- SQL injection prevention (Supabase handles this)

### Recommendations for Production

1. **Password Hashing**: Currently passwords are stored in plain text. Use bcrypt:
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
```

2. **HTTPS**: Use SSL/TLS certificates
3. **Rate Limiting**: Prevent API abuse
4. **Authentication Tokens**: Use JWT instead of session-based auth
5. **CORS**: Restrict allowed origins
6. **Input Validation**: Already implemented with express-validator

---

## Troubleshooting

### Common Issues

**1. "Server error" on login**
- Check if backend is running
- Verify Supabase credentials in `.env`
- Check Supabase project is active

**2. Orders not saving**
- Check database connection
- Verify `orders` table exists
- Check browser console for errors

**3. Chart not showing**
- Verify Chart.js library loaded (check Network tab)
- Check browser console for errors
- Ensure report has data in date range

**4. Payment status not working**
- Add payment columns to database (see DATABASE_SETUP.md)
- Or use notes fallback (already implemented)

**5. Mobile access issues**
- Ensure backend server is accessible on network
- Check firewall settings
- Verify IP address is correct

---

## Future Enhancements

### Potential Features

1. **Customer Portal**: Allow customers to log in, track orders, and download receipts directly
2. **Inventory Management**: Track supplies (detergent, fabric softener)
3. **Employee Management**: Multiple users with roles
4. **Advanced Reports**: Revenue by service type, customer analytics
5. **Offline Mode**: Work without internet connection
6. **Barcode Scanning**: Quick order lookup
7. **Email Integration**: Send order confirmations and receipts via email
8. **Multi-location Support**: Manage multiple laundry branches

---

## Support & Maintenance

### Logs

- **Backend**: Check terminal/console where server is running
- **Frontend**: Browser console (F12)
- **Supabase**: Dashboard → Logs

### Updates

1. Pull latest code
2. Run `npm install` to update dependencies
3. Check `.env` file matches new requirements
4. Test all features

### Backup

- Supabase automatically backs up database
- Export data regularly using Reports → Export CSV
- Keep `.env` file secure (contains credentials)

---

## Conclusion

Wash Connect is a comprehensive laundry management system that streamlines order processing, customer management, and business analytics. The application uses modern web technologies to provide a user-friendly interface with powerful backend capabilities.

The codebase is well-structured, making it easy to extend and maintain. Key features like automatic price calculation, payment tracking, and comprehensive reporting help laundry businesses operate more efficiently.

For questions or issues, refer to:
- `IMPROVEMENTS.md` - List of improvements made
- `MOBILE_SETUP.md` - Mobile access instructions
- `DATABASE_SETUP.md` - Database configuration guide

---

**Document Version**: 1.0  
**Last Updated**: November 2025  
**Maintained By**: Development Team


