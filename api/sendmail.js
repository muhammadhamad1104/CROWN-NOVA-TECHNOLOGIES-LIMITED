import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
    return;
  }

  const { w3lName, w3lSender, w3lSubject, w3lMessage } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.migadu.com",
    port: 465,
    secure: true,
    auth: {
      user: "support@crownnovatech.com",
      pass: process.env.MIGADU_SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "support@crownnovatech.com",
      to: "support@crownnovatech.com",
      replyTo: w3lSender,
      subject: w3lSubject,
      text: `Name: ${w3lName}\nEmail: ${w3lSender}\n\nMessage:\n${w3lMessage}`,
      html: `<p><strong>Name:</strong> ${w3lName}<br><strong>Email:</strong> ${w3lSender}</p><p>${w3lMessage}</p>`,
    });
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ success: false, message: "Failed to send email.", error: error.message });
  }
}
