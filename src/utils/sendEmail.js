import nodemailer from "nodemailer";
const api = process.env.MODE === "DEV" ? `:${process.env.PORT}` : ""
const transporter = nodemailer.createTransport({
  host: api,
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, temp, attachments }) => {
  const info = await transporter
    .sendMail({
      from: `'"kiddo app " <${process.env.EMAIL}>'`, // sender address
      to,
      subject,
      html: temp,
      attachments,
    })
    .catch((err) => console.log(err));
  if (info.accepted.length >= 0) return true;
  return false;
};
