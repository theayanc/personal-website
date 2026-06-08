export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Using the API key from environment variables
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        // Resend requires a verified domain to send from, otherwise you can only use their onboarding test email 
        // to send emails to the email address associated with your Resend account.
        from: 'Contact Form <onboarding@resend.dev>',
        to: ['connect@ayanchakraborty.me', 'shivab@xequalto.com'],
        subject: `New Contact Form Submission from ${name}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#111111;border-radius:16px 16px 0 0;padding:40px 48px 32px;border-bottom:1px solid #222;">
              <p style="margin:0 0 16px;font-size:11px;letter-spacing:3px;color:#888;text-transform:uppercase;">New Inquiry</p>
              <h1 style="margin:0;font-size:28px;font-weight:600;color:#ffffff;letter-spacing:-0.5px;">Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111111;padding:32px 48px;">

              <!-- Name -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#1a1a1a;border:1px solid #222;border-radius:10px;padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#666;text-transform:uppercase;">Name</p>
                    <p style="margin:0;font-size:16px;font-weight:500;color:#ffffff;">${name}</p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#1a1a1a;border:1px solid #222;border-radius:10px;padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#666;text-transform:uppercase;">Email</p>
                    <a href="mailto:${email}" style="margin:0;font-size:16px;font-weight:500;color:#a78bfa;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>

              <!-- Service -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#1a1a1a;border:1px solid #222;border-radius:10px;padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:10px;letter-spacing:2px;color:#666;text-transform:uppercase;">Service Interest</p>
                    <span style="display:inline-block;background:#1e1533;border:1px solid #4c3d8a;border-radius:6px;padding:4px 14px;font-size:13px;font-weight:500;color:#a78bfa;letter-spacing:0.5px;">${service || 'Not specified'}</span>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1a1a1a;border:1px solid #222;border-radius:10px;padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:10px;letter-spacing:2px;color:#666;text-transform:uppercase;">Message</p>
                    <p style="margin:0;font-size:15px;line-height:1.7;color:#cccccc;">${message.replace(/\n/g, '<br/>')}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#111111;padding:0 48px 32px;">
              <a href="mailto:${email}?subject=Re: Your inquiry" style="display:inline-block;background:#a78bfa;color:#0a0a0a;font-size:13px;font-weight:600;letter-spacing:0.5px;text-decoration:none;padding:14px 28px;border-radius:8px;">Reply to ${name}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;border-radius:0 0 16px 16px;border-top:1px solid #1a1a1a;padding:24px 48px;">
              <p style="margin:0;font-size:12px;color:#444;">This message was sent via the contact form on <span style="color:#666;">ayanchakraborty.me</span></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ error: data });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
