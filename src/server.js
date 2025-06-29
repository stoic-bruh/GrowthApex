const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Data file path
const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.json');

// Ensure submissions file exists
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
}

// Email configuration
const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
  auth: {
    user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

// Create email transporter
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(emailConfig);

// Function to send email notification
async function sendEmailNotification(submission) {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
            console.log('❌ Email configuration missing:');
            console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Missing');
            console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Missing');
            console.log('EMAIL_TO:', process.env.EMAIL_TO ? 'Set' : 'Missing');
            return;
        }

        console.log('📧 Attempting to send email notification...');
        console.log('From:', process.env.EMAIL_USER);
        console.log('To:', process.env.EMAIL_TO);

        const mailOptions = {
            from: `"GrowthApex Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `🚀 New Lead: ${submission.name} - ${submission.company || 'No Company'}`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New GrowthApex Lead</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f8f9fa; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 30px; text-align: center; }
                        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
                        .header p { margin: 10px 0 0; opacity: 0.9; font-size: 16px; }
                        .content { padding: 30px; }
                        .section { margin-bottom: 25px; }
                        .section-title { color: #374151; font-size: 18px; font-weight: 600; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
                        .info-item { background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #8b5cf6; }
                        .info-label { color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 600; margin-bottom: 5px; }
                        .info-value { color: #111827; font-size: 16px; font-weight: 500; }
                        .goals-section { background: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #bae6fd; }
                        .goals-text { color: #0c4a6e; line-height: 1.6; margin: 0; }
                        .meta-section { background: #fef3c7; padding: 15px; border-radius: 8px; border: 1px solid #fbbf24; }
                        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                        .meta-item { text-align: center; }
                        .meta-label { color: #92400e; font-size: 11px; text-transform: uppercase; font-weight: 600; }
                        .meta-value { color: #92400e; font-size: 14px; font-weight: 500; }
                        .actions { text-align: center; margin-top: 30px; }
                        .action-btn { display: inline-block; background: #8b5cf6; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px; }
                        .footer { background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
                        .priority-badge { background: #dc2626; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-left: 10px; }
                        @media (max-width: 600px) {
                            .info-grid, .meta-grid { grid-template-columns: 1fr; }
                            .header h1 { font-size: 24px; }
                            .content { padding: 20px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🚀 New GrowthApex Lead</h1>
                            <p>High-potential prospect ready for follow-up</p>
                        </div>
                        
                        <div class="content">
                            <div class="section">
                                <h2 class="section-title">📋 Contact Information</h2>
                                <div class="info-grid">
                                    <div class="info-item">
                                        <div class="info-label">Full Name</div>
                                        <div class="info-value">${submission.name}</div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">Email Address</div>
                                        <div class="info-value">
                                            <a href="mailto:${submission.email}" style="color: #8b5cf6; text-decoration: none;">${submission.email}</a>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">Phone Number</div>
                                        <div class="info-value">
                                            <a href="tel:${submission.phone}" style="color: #8b5cf6; text-decoration: none;">${submission.phone}</a>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <div class="info-label">Company</div>
                                        <div class="info-value">${submission.company || 'Not specified'}</div>
                                    </div>
                                </div>
                            </div>
                            
                            ${submission.goals ? `
                            <div class="section">
                                <h2 class="section-title">🎯 Goals & Challenges</h2>
                                <div class="goals-section">
                                    <p class="goals-text">${submission.goals}</p>
                                </div>
                            </div>
                            ` : ''}
                            
                            <div class="section">
                                <h2 class="section-title">📊 Submission Details</h2>
                                <div class="meta-section">
                                    <div class="meta-grid">
                                        <div class="meta-item">
                                            <div class="meta-label">Submission ID</div>
                                            <div class="meta-value">#${submission.id.slice(-6)}</div>
                                        </div>
                                        <div class="meta-item">
                                            <div class="meta-label">Date & Time</div>
                                            <div class="meta-value">${new Date(submission.date).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="actions">
                                <a href="mailto:${submission.email}?subject=Re: Your GrowthApex Inquiry" class="action-btn">📧 Reply to Lead</a>
                                <a href="tel:${submission.phone}" class="action-btn">📞 Call Now</a>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p>This is an automated notification from your GrowthApex contact form.</p>
                            <p>Lead Priority: <span class="priority-badge">HIGH</span></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(`✅ Email notification sent successfully!`);
        console.log(`📧 Message ID: ${result.messageId}`);
        console.log(`📧 To: ${result.accepted.join(', ')}`);
    } catch (error) {
        console.error('❌ Error sending email notification:');
        console.error('Error details:', error.message);
        console.error('Error code:', error.code);
        console.error('Full error:', error);
        
        // Common Gmail errors and solutions
        if (error.code === 'EAUTH') {
            console.error('🔐 Authentication failed. Check your EMAIL_USER and EMAIL_PASS');
            console.error('💡 Make sure you\'re using an App Password, not your regular password');
        } else if (error.code === 'ECONNECTION') {
            console.error('🌐 Connection failed. Check your EMAIL_HOST and EMAIL_PORT');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('⏰ Connection timed out. Check your internet connection');
        }
    }
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, phone, goals } = req.body;
    
        // Basic validation
        if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
                message: 'Name, email, and phone are required'
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }
        
        // Create submission object
        const submission = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            company: company ? company.trim() : '',
            phone: phone.trim(),
            goals: goals ? goals.trim() : '',
            date: new Date().toISOString(),
            status: 'new'
        };
        
        // Read existing submissions
        let submissions = [];
        try {
            const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
            submissions = JSON.parse(data);
        } catch (error) {
            console.log('Creating new submissions file');
        }
        
        // Add new submission
        submissions.push(submission);
        
        // Save to file
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
        
        // Send email notification
        await sendEmailNotification(submission);
        
        // Log submission
        console.log(`📝 New contact form submission: ${name} (${email})`);
        
        res.json({
            success: true,
            message: 'Thank you! We will contact you within 24 hours.',
            submissionId: submission.id
        });
    
  } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'There was an error processing your request. Please try again.'
        });
    }
});

// Get all submissions (for admin purposes)
app.get('/api/submissions', (req, res) => {
    try {
        const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
        const submissions = JSON.parse(data);
        res.json({
            success: true,
            submissions: submissions
        });
    } catch (error) {
        console.error('Error reading submissions:', error);
    res.status(500).json({ 
      success: false, 
            message: 'Error reading submissions'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO)
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 GrowthApex server running on http://localhost:${PORT}`);
    console.log(`📝 Contact form endpoint: http://localhost:${PORT}/api/contact`);
    console.log(`📊 Submissions endpoint: http://localhost:${PORT}/api/submissions`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
    
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO) {
        console.log(`📧 Email notifications enabled for: ${process.env.EMAIL_TO}`);
    } else {
        console.log(`⚠️  Email notifications disabled - configure .env file`);
    }
});