const nodemailer = require('nodemailer')

const sendMail = async (name, email, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background:#0f172a; padding:20px; color:#ffffff;">
        
        <div style="max-width:600px;margin:auto;background:#111827;padding:20px;border-radius:12px;border:1px solid #1f2937;">
          
          <h2 style="color:#00ff88;"> New Portfolio Message</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>

          <hr style="border:0;border-top:1px solid #333;margin:15px 0;" />

          <h3 style="color:#38bdf8;">Message:</h3>
          <p style="line-height:1.6;color:#e5e7eb;">
            ${message}
          </p>

          <hr style="border:0;border-top:1px solid #333;margin:15px 0;" />

          <p style="font-size:12px;color:#9ca3af;">
            This message was sent from your portfolio contact form 
          </p>

        </div>
      </div>
    `

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      html: htmlTemplate,
    })

  } catch (error) {
    console.log('Email Error:', error)
    throw new Error('Email sending failed')
  }
}

module.exports = sendMail