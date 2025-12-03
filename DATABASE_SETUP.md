# Database Setup - Payment Tracking

## Issue
The payment tracking feature requires additional columns in your Supabase `orders` table. If you're seeing errors about missing columns, follow these steps.

## Quick Fix: Add Payment Columns

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **Table Editor**
3. Select the `orders` table
4. Click **Add Column** and add these columns:

   **Column 1: payment_status**
   - Name: `payment_status`
   - Type: `text`
   - Default Value: `'unpaid'`
   - Nullable: No

   **Column 2: payment_method**
   - Name: `payment_method`
   - Type: `text`
   - Nullable: Yes
   - No default value

   **Column 3: payment_date**
   - Name: `payment_date`
   - Type: `timestamptz` (timestamp with timezone)
   - Nullable: Yes
   - No default value

### Option 2: Using SQL Editor

Run this SQL in your Supabase SQL Editor:

```sql
-- Add payment tracking columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid',
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_date TIMESTAMPTZ;

-- Update existing orders to have 'unpaid' status
UPDATE orders 
SET payment_status = 'unpaid' 
WHERE payment_status IS NULL;
```

## Verify Setup

After adding the columns:

1. Refresh your application
2. Try marking an order as "Paid"
3. The payment status should update correctly

## Current Workaround

If you can't add the columns right now, the app will:
- Store payment status in the `notes` field as `[PAYMENT:PAID]` or `[PAYMENT:UNPAID]`
- Display payment status based on notes
- Show a warning message about missing columns

However, for full functionality, **please add the payment columns** as described above.

## Troubleshooting

### Error: "column does not exist"
- Make sure you added all three columns: `payment_status`, `payment_method`, `payment_date`
- Check column names match exactly (case-sensitive in some databases)
- Refresh your browser after adding columns

### Payment status not updating
- Check browser console (F12) for errors
- Verify columns were added correctly
- Try refreshing the page

### Still having issues?
1. Check Supabase logs for errors
2. Verify your table name is `orders` (not `order`)
3. Make sure you have write permissions on the table

---

**Note:** The app will work without these columns (using notes as fallback), but for the best experience, please add them to your database.




