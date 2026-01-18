const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    // Create Nodemailer transporter with Migadu SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.MIGADU_SMTP_HOST,
        port: parseInt(process.env.MIGADU_SMTP_PORT),
        secure: false, // true for 465, false for 587
        auth: {
            user: process.env.MIGADU_SMTP_USER,
            pass: process.env.MIGADU_SMTP_PASSWORD,
        },
    });

    // Email content
    const mailOptions = {
        from: `"Crown Nova Contact Form" <${process.env.MIGADU_SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL,
        cc: 'info@crownnovatech.com, ammar@crownnovatech.com',
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #063f84; color: white; padding: 20px; text-align: center;">
                    <h1 style="margin: 0;">New Contact Form Submission</h1>
                </div>
                <div style="padding: 30px; background: #f9f9f9;">
                    <h2 style="color: #063f84; border-bottom: 2px solid #063f84; padding-bottom: 10px;">Contact Details</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #333; width: 120px;">Name:</td>
                            <td style="padding: 10px 0; color: #555;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #333;">Email:</td>
                            <td style="padding: 10px 0; color: #555;"><a href="mailto:${email}" style="color: #063f84;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; font-weight: bold; color: #333;">Phone:</td>
                            <td style="padding: 10px 0; color: #555;"><a href="tel:${phone}" style="color: #063f84;">${phone || 'Not provided'}</a></td>
                        </tr>
                    </table>
                    
                    <h2 style="color: #063f84; border-bottom: 2px solid #063f84; padding-bottom: 10px; margin-top: 30px;">Message</h2>
                    <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #063f84;">
                        <p style="color: #555; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
                <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px;">
                    <p style="margin: 0;">This email was sent from the Crown Nova Technologies website contact form.</p>
                </div>
            </div>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
This email was sent from the Crown Nova Technologies website contact form.
        `,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        
        // Send auto-reply to the customer
        const autoReplyOptions = {
            from: `"Crown Nova Technologies" <${process.env.MIGADU_SMTP_USER}>`,
            to: email,
            subject: 'Thank you for contacting Crown Nova Technologies',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #063f84; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">Thank You for Contacting Us!</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                        <p style="color: #333; font-size: 16px;">Dear ${name},</p>
                        <p style="color: #555; line-height: 1.8;">Thank you for reaching out to Crown Nova Technologies Ltd. We have received your message and our team will review it shortly.</p>
                        <p style="color: #555; line-height: 1.8;">We typically respond within 24-48 business hours. If your matter is urgent, please feel free to call us at <a href="tel:+447432634216" style="color: #063f84;">+44 7432634216</a>.</p>
                        <p style="color: #555; line-height: 1.8;">Best regards,<br><strong>Crown Nova Technologies Team</strong></p>
                    </div>
                    <div style="background: #333; color: #999; padding: 15px; text-align: center; font-size: 12px;">
                        <p style="margin: 0;">Crown Nova Technologies Ltd | 66 Blacker Rd, Birkby, Huddersfield HD1 5HS, UK</p>
                    </div>
                </div>
            `,
        };
        
        await transporter.sendMail(autoReplyOptions);
        
        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
}
