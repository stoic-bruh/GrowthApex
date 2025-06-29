import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, company, phone, goals } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Setup transporter using env variables
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"GrowthApex Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🚀 New Lead from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not Provided'}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Goals:</strong><br>${goals}</p>
      `
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}
