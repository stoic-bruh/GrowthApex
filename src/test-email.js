const nodemailer = require('nodemailer');
require('dotenv').config();

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

console.log('🔍 Email Configuration Test');
console.log('========================');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST || 'smtp.gmail.com (default)');
console.log('EMAIL_PORT:', process.env.EMAIL_PORT || '587 (default)');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : '❌ Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : '❌ Missing');
console.log('EMAIL_TO:', process.env.EMAIL_TO ? 'Set' : '❌ Missing');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    console.log('\n❌ Missing email configuration!');
    console.log('Please check your .env file and ensure all required variables are set.');
    process.exit(1);
}

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Test email
async function testEmail() {
    try {
        console.log('\n📧 Testing email connection...');
        
        // Verify connection
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully!');
        
        // Send test email
        console.log('\n📧 Sending test email...');
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: '🧪 GrowthApex Email Test',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #8b5cf6;">🧪 GrowthApex Email Test</h2>
                    <p>This is a test email to verify your email configuration is working correctly.</p>
                    <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                    <p style="color: #10b981; font-weight: bold;">✅ If you received this email, your configuration is working!</p>
                </div>
            `
        };
        
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully!');
        console.log('📧 Message ID:', result.messageId);
        console.log('📧 To:', result.accepted.join(', '));
        
    } catch (error) {
        console.error('❌ Email test failed:');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        
        if (error.code === 'EAUTH') {
            console.error('\n🔐 Authentication failed!');
            console.error('Common solutions:');
            console.error('1. Make sure you\'re using an App Password, not your regular Gmail password');
            console.error('2. Enable 2-factor authentication on your Gmail account');
            console.error('3. Generate an App Password: https://myaccount.google.com/apppasswords');
        } else if (error.code === 'ECONNECTION') {
            console.error('\n🌐 Connection failed!');
            console.error('Check your EMAIL_HOST and EMAIL_PORT settings');
        }
    }
}

testEmail(); 