# GrowthApex Backend System

A simple backend system for handling contact form submissions from the GrowthApex website with email notifications.

## Features

- ✅ Simple Express.js server
- ✅ Contact form API endpoint
- ✅ JSON-based data storage
- ✅ Email notifications via SMTP
- ✅ Basic validation
- ✅ CORS enabled
- ✅ Health check endpoint
- ✅ Admin endpoint to view submissions
- ✅ Smooth form animations
- ✅ Responsive form layout

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure email (optional):**
   - Copy `env.example` to `.env`
   - Fill in your email credentials:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=your-email@gmail.com
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Server will start on:** `http://localhost:3001`

## Email Configuration

### Gmail Setup:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the generated password in `EMAIL_PASS`

### Other Email Providers:
- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Use your provider's SMTP settings

## API Endpoints

### POST `/api/contact`
Handles contact form submissions and sends email notifications.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "phone": "+1 555-123-4567",
  "goals": "Increase social media presence"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We will contact you within 24 hours.",
  "submissionId": "1703123456789"
}
```

### GET `/api/submissions`
Returns all form submissions (for admin purposes).

**Response:**
```json
{
  "success": true,
  "submissions": [
    {
      "id": "1703123456789",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Example Corp",
      "phone": "+1 555-123-4567",
      "goals": "Increase social media presence",
      "date": "2023-12-21T10:30:56.789Z",
      "status": "new"
    }
  ]
}
```

### GET `/api/health`
Health check endpoint with email configuration status.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2023-12-21T10:30:56.789Z",
  "emailConfigured": true
}
```

## Data Storage

- Submissions are stored in `submissions.json`
- Each submission includes:
  - Unique ID
  - Form data (name, email, company, phone, goals)
  - Timestamp
  - Status (new, contacted, etc.)

## Frontend Integration

The frontend forms are now handled by `shared.js` which:
- Automatically detects contact forms
- Sends data to the backend API
- Shows loading states and success/error messages
- Handles form validation
- Provides smooth animations and interactions

## Form Features

### Smooth Animations:
- Input focus effects with scaling and glow
- Label animations on focus
- Button hover and click effects
- Staggered form group animations
- Typing feedback with color changes

### Responsive Layout:
- Compact country code selector
- Phone number field next to country code
- Mobile-optimized touch targets
- Proper spacing and alignment

## File Structure

```
src/
├── server.js              # Main backend server
├── package.json           # Dependencies
├── env.example            # Email configuration template
├── .env                   # Email configuration (create from env.example)
├── submissions.json       # Data storage (created automatically)
├── shared.js             # Frontend form handling
├── index.html            # Homepage with contact form
├── contact.html          # Contact page
└── README.md             # This file
```

## Development

- The server uses CORS to allow frontend requests
- All form submissions are logged to console
- Email notifications are sent for each submission
- Data is stored in JSON format for simplicity
- No database required - perfect for simple deployments

## Deployment

This simple backend can be deployed to:
- Heroku
- Vercel
- Railway
- Any Node.js hosting platform

Just make sure to:
1. Install dependencies
2. Set the correct port (use `process.env.PORT` for production)
3. Configure email settings in environment variables
4. Ensure the `submissions.json` file is writable

## Troubleshooting

### Email Not Working:
- Check your `.env` file configuration
- Verify your email provider's SMTP settings
- Ensure 2FA is enabled and app password is generated
- Check server logs for email errors

### Form Not Submitting:
- Verify the server is running on port 3001
- Check browser console for CORS errors
- Ensure form has correct `id="contactForm"` or `id="contact-form"`
- Check network tab for API call failures 