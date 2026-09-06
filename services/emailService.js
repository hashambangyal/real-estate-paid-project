import { transporter } from "@/lib/mailer";

export async function sendInquiryEmail({
  name,
  email,
  phone,
  message,
}) {
  await transporter.sendMail({
    from: `"Real Estate Website" <${process.env.SMTP_USER}>`,

    to: process.env.INQUIRY_RECEIVER_EMAIL,

    replyTo: email,

    subject: `New Inquiry from ${name}`,

    text: `
New inquiry received.

Name:
${name}

Email:
${email}

Phone:
${phone || "Not provided"}

Message:
${message}
    `,
  });

  return {
    success: true,
  };
}