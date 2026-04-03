import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    console.log("🔐 MAIL_USER:", process.env.MAIL_USER);
    console.log("🔐 MAIL_PASS exists:", !!process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Sudhaar Setu" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.response);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw error;
  }
};

export default sendEmail;
