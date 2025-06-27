const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const CSV_PATH = path.join(__dirname, 'submissions.csv');

app.use(cors());
app.use(express.json());

// Ensure CSV file exists with headers
if (!fs.existsSync(CSV_PATH)) {
  fs.writeFileSync(CSV_PATH, 'Name,Email,Company,Budget,Goals,Date\n');
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, company, budget, goals } = req.body;
  if (!name || !email || !budget) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }
  const date = new Date().toISOString();
  const row = `"${name}","${email}","${company || ''}","${budget}","${goals || ''}","${date}"\n`;
  fs.appendFileSync(CSV_PATH, row);

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
    subject: 'New GrowthApex Contact Submission',
    text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || ''}\nBudget: ${budget}\nGoals: ${goals || ''}\nDate: ${date}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Submission saved, but email failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 