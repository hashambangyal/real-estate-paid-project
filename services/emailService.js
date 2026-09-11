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

export async function sendInquiryReplyEmail({
  to,
  clientName,
  subject,
  message,
}) {
  const mailSubject = subject || `Response to your inquiry - Inmobiliaria Hersu`;

  await transporter.sendMail({
    from: `"Inmobiliaria Hersu" <${process.env.SMTP_USER}>`,
    to,
    subject: mailSubject,
    text: `Hello ${clientName},\n\n${message}\n\nBest regards,\nInmobiliaria Hersu Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <div style="background-color: #0B6051; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">INMOBILIARIA HERSU</h2>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
          <p style="font-size: 15px; margin-top: 0;">Dear <strong>${clientName}</strong>,</p>
          <div style="white-space: pre-wrap; font-size: 15px; color: #374151; margin: 20px 0; padding: 16px; background-color: #f9fafb; border-left: 4px solid #0B6051; border-radius: 4px;">${message}</div>
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">
            If you have any further questions, feel free to reply directly to this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="font-size: 12px; color: #9ca3af; margin: 0; text-align: center;">
            &copy; ${new Date().getFullYear()} Inmobiliaria Hersu. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });

  return {
    success: true,
  };
}