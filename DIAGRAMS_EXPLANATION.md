# Wash Connect - Diagrams Explanation

## Overview
This document explains all the system diagrams created for the Wash Connect laundry management application.

---

## 1. Context Diagram (Level 0 DFD)

### Purpose
The Context Diagram shows the system as a single process and identifies all external entities that interact with it.

### Components
- **External Entities**:
  - **Admin**: Staff who manage orders, customers, reports, payments, and system configuration
  - **Customer**: End user who receives SMS notifications and digital receipts
  - **SMS Gateway**: Third-party service used to send SMS messages to customer phones
- **System**: Wash Connect System (shown as one process)
- **Data Store**: Supabase Database

### Data Flows
- **From Admin to System**: Create Orders, Manage Customers, View Reports, Track Payments, Configure Notification Rules, Login
- **From System to Admin**: Display Information, Reports, Dashboard Data, Notification/receipt logs
- **From System to SMS Gateway**: Send SMS messages (order status updates, receipt links)
- **From SMS Gateway to Customer**: Deliver SMS notifications
- **From Customer to System**: Open digital receipt links and view order status in the app
- **Between System and Database**: Store/Retrieve Data

### Explanation
This is the highest-level view of the system. It doesn't show internal processes, only the system boundary and external interactions. It answers: "Who uses the system and what do they do with it?"

---

## 2. Use Case Diagram (UCD)

### Purpose
Shows all the ways users (actors) interact with the system through use cases.

### Components
- **Actors**:
  - **Admin**: Main system user who manages operations and initiates notifications/receipts
  - **Customer**: Receives SMS notifications and views digital receipts
- **Use Cases**: Authentication, order/customer management, reporting, notifications, and receipt-related actions

### Use Cases
1. **Authentication**: Login to System (Admin)
2. **Order Management**: Create Order, Edit Order, Update Order Status, Mark Payment (Admin)
3. **Customer Management**: Add Customer, Edit Customer, Delete Customer (Admin)
4. **Analytics**: View Dashboard (Admin)
5. **Reports**: Generate Weekly/Monthly/Custom Reports, Export to CSV, Print Report (Admin)
6. **Search & Filter**: Search Orders, Filter Orders (Admin)
7. **Notification Configuration**: Configure SMS templates and triggers (Admin)
8. **Send Notifications**: Trigger SMS notifications when order status or payment changes (Admin/System)
9. **Generate Digital Receipt**: Generate receipt view for completed orders (Admin/System)
10. **Send Receipt Link**: Send digital receipt link via SMS (Admin/System)
11. **Receive SMS Notification**: Customer receives SMS notification on their phone (Customer)
12. **View Digital Receipt**: Customer opens link and views receipt details (Customer)

### Relationships
- **Uses**: Create Order uses Add Customer (if customer doesn't exist)
- **Extends**: Export Report extends Generate Report use cases
- **Extends**: Edit Order extends Update Order Status

### Explanation
This diagram helps understand all the features available to users and how they relate to each other. It's useful for requirements documentation and user training.

---

## 3. Data Flow Diagram - Level 1

### Purpose
Breaks down the system into major processes and shows how data flows between processes, data stores, and external entities.

### Processes
1. **1.0 Authentication Process**: Handles user login and authentication
2. **2.0 Order Management**: Creates, updates, and manages orders
3. **3.0 Customer Management**: Manages customer information
4. **4.0 Payment Processing**: Handles payment status updates
5. **5.0 Report Generation**: Generates various reports
6. **6.0 Dashboard Analytics**: Calculates dashboard statistics

### Data Stores
- **D1: Orders**: Stores all order records
- **D2: Customers**: Stores customer information
- **D3: Users**: Stores user/authentication data

### Data Flows
- **Admin → Processes**: User inputs (order details, customer info, payment updates, report requests)
- **Processes → Data Stores**: Data storage operations (INSERT, UPDATE)
- **Data Stores → Processes**: Data retrieval operations (SELECT)
- **Processes → Admin**: Outputs (confirmations, reports, dashboard data)

### Explanation
This diagram shows the internal structure of the system. It answers: "How does data move through the system?" It's useful for understanding system design and identifying where data transformations occur.

---

## 4. Entity Relationship Diagram (ERD)

### Purpose
Shows the database structure, including entities (tables), attributes (columns), and relationships between entities.

### Entities

#### USERS
- **Primary Key**: id
- **Unique Key**: username
- **Attributes**: password, role, created_at
- **Purpose**: Stores system users who can login

#### CUSTOMERS
- **Primary Key**: id
- **Attributes**: name, phone, address, created_at, updated_at
- **Purpose**: Stores customer information

#### ORDERS
- **Primary Key**: id
- **Foreign Key**: customer_id (references CUSTOMERS.id)
- **Attributes**: 
  - Basic: service_type, weight_kg, price, notes
  - Arrays: add_ons (text array)
  - Status: status, payment_status, payment_method, payment_date
  - Timestamps: created_at, updated_at
- **Purpose**: Stores all laundry orders

### Relationships
1. **USERS → ORDERS**: One-to-Many
   - One user can create many orders
   - Relationship: "creates"

2. **CUSTOMERS → ORDERS**: One-to-Many
   - One customer can place many orders
   - Relationship: "places"
   - Foreign key: customer_id in ORDERS table

### Explanation
This diagram is essential for database design. It shows:
- What data is stored (entities)
- What properties each entity has (attributes)
- How entities relate to each other (relationships)
- Data integrity constraints (primary keys, foreign keys)

---

## 5. System Architecture Diagram

### Purpose
Shows the overall system architecture including all layers: presentation, application, and data.

### Layers

#### Presentation Layer
- **User Interface**: HTML/CSS/JavaScript frontend
- **Electron**: Desktop application wrapper
- **Purpose**: User interaction and display

#### Application Layer
- **Express.js**: REST API server
- **API Routes**: Endpoints for orders, customers, reports
- **Business Logic**: Price calculation, data validation, business rules
- **Purpose**: Application logic and API handling

#### Data Layer
- **Supabase Client**: Database SDK
- **PostgreSQL**: Relational database
- **Tables**: orders, customers, users
- **Purpose**: Data persistence

#### External Services
- **Chart.js**: Visualization library
- **Purpose**: Chart rendering

### Data Flow
1. User interacts with UI (Electron app)
2. Frontend sends HTTP request to Express server
3. Express routes to appropriate handler
4. Business logic processes request
5. Supabase client queries PostgreSQL
6. Data flows back through layers
7. UI updates with results

### Explanation
This diagram shows the "big picture" of how the system is structured. It's useful for:
- Understanding system design
- Planning deployments
- Identifying integration points
- Documentation for developers

---

## 6. Component Interaction Diagram (Sequence Diagram)

### Purpose
Shows the sequence of interactions between components during a specific operation (order creation example).

### Components
- User
- Frontend UI
- Express API
- Business Logic
- Supabase DB

### Sequence Flow
1. User fills order form
2. User clicks "Create Order"
3. UI sends POST request to API
4. API validates input
5. Business logic calculates price
6. Business logic inserts order into database
7. Database returns created order
8. Response flows back to UI
9. UI shows success notification
10. UI refreshes orders list
11. UI updates dashboard

### Explanation
This diagram shows the step-by-step flow of a specific operation. It's useful for:
- Understanding how features work
- Debugging issues
- Documenting processes
- Training developers

---

## How to Use These Diagrams

### For Documentation
- Include in project documentation
- Use in presentations
- Share with stakeholders

### For Development
- Reference during coding
- Use for system design discussions
- Guide new team members

### For Maintenance
- Understand system structure
- Identify areas for improvement
- Plan system enhancements

---

## Diagram Conventions Used

### Symbols
- **Rectangle**: Process/System
- **Circle**: External Entity
- **Open Rectangle**: Data Store
- **Arrow**: Data Flow
- **Diamond**: Decision Point (in some diagrams)
- **Double Line**: Entity (in ERD)
- **Crow's Foot**: Many relationship (in ERD)

### Colors
- **Blue (#4318FF)**: Primary system color
- **Light Blue**: Secondary elements
- **White**: Background/Neutral

---

## Notes

- All diagrams are created using Mermaid.js for web rendering
- ASCII versions provided for text-based documentation
- Diagrams can be exported to PDF by printing the HTML file
- Diagrams are scalable and can be modified as the system evolves

---

**Version**: 1.0  
**Last Updated**: November 2025

