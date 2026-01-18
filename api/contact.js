const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = req.body || {};
        const { name, email, phone, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                error: 'Please fill in all required fields (Name, Email, and Message)' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address' });
        }

        // Check if environment variables are configured
        const smtpHost = process.env.MIGADU_SMTP_HOST;
        const smtpPort = process.env.MIGADU_SMTP_PORT || '587';
        const smtpUser = process.env.MIGADU_SMTP_USER;
        const smtpPass = process.env.MIGADU_SMTP_PASSWORD;
        const contactEmail = process.env.CONTACT_EMAIL || smtpUser;

        if (!smtpHost || !smtpUser || !smtpPass) {
            console.error('Missing SMTP configuration:', { 
                hasHost: !!smtpHost, 
                hasUser: !!smtpUser, 
                hasPass: !!smtpPass 
            });
            return res.status(500).json({ 
                error: 'Email service is not properly configured. Please contact support@crownnovatech.com directly.' 
            });
        }

        // Create Nodemailer transporter with Migadu SMTP
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort),
            secure: smtpPort === '465',
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 15000,
            greetingTimeout: 15000,
            socketTimeout: 15000,
        });

        // Email content
        const mailOptions = {
            from: `"Crown Nova Contact Form" <${smtpUser}>`,
            to: contactEmail,
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

        // Send the email
        await transporter.sendMail(mailOptions);
        
        // Send auto-reply to the customer
        const autoReplyOptions = {
            from: `"Crown Nova Technologies" <${smtpUser}>`,
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
        
        // Try to send auto-reply but don't fail if it doesn't work
        try {
            await transporter.sendMail(autoReplyOptions);
        } catch (autoReplyError) {
            console.error('Auto-reply failed (non-critical):', autoReplyError.message);
        }
        
        return res.status(200).json({ 
            success: true, 
            message: 'Your message has been sent successfully!' 
        });

    } catch (error) {
        console.error('Contact form error:', error.message);
        console.error('Error stack:', error.stack);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to send email. Please try again or contact us directly at support@crownnovatech.com';
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Email service authentication issue. Please contact us directly at support@crownnovatech.com';
        } else if (error.code === 'ECONNECTION' || error.code === 'ENOTFOUND') {
            errorMessage = 'Could not connect to email server. Please try again or contact us at support@crownnovatech.com';
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Connection timed out. Please try again later.';
        } else if (error.responseCode && error.responseCode >= 500) {
            errorMessage = 'Email server error. Please try again later or contact us directly.';
        }
        
        return res.status(500).json({ error: errorMessage });
    }
};
