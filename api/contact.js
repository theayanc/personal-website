import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const serviceLabels = {
    'architecture': 'Data Architecture',
    'ai': 'AI Implementation',
    'performance': 'Performance Optimization',
    'cost': 'Cost Optimization',
    'enterprise': 'Enterprise Consulting',
    'training': 'Corporate Training',
  };

  const serviceLabel = serviceLabels[service] || service || 'Not specified';

  const now = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
  });

  try {
    await resend.emails.send({
      from: 'Ayan Chakraborty <connect@ayanchakraborty.me>',
      to: ['shivab@xequalto.com'],
      reply_to: email,
      subject: `New inquiry from ${name} — ${serviceLabel}`,
      html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f6f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<div style="display:none;font-size:1px;color:#f6f6f7;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  New inquiry from ${name} — ${serviceLabel}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f6f7;">
<tr><td align="center" style="padding:40px 16px 40px;">

<table role="presentation" width="540" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;width:100%;">

  <!-- LOGO / BRAND ROW -->
  <tr>
    <td align="center" style="padding-bottom:24px;">
      <p style="margin:0;font-size:13px;font-weight:600;color:#52525b;letter-spacing:0.01em;">Ayan Chakraborty</p>
    </td>
  </tr>

  <!-- CARD -->
  <tr>
    <td style="background:#ffffff;border-radius:12px;border:1px solid #e4e4e7;overflow:hidden;">

      <!-- TOP ACCENT -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#7c3aed,#a78bfa);font-size:0;line-height:0;">&nbsp;</td>
        </tr>
      </table>

      <!-- HEADER -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:32px 40px 28px;border-bottom:1px solid #f4f4f5;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
              <tr>
                <td style="background:#faf5ff;border:1px solid #e9d5ff;color:#7c3aed;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;padding:4px 12px;border-radius:4px;">
                  New Inquiry
                </td>
              </tr>
            </table>
            <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:#09090b;letter-spacing:-0.03em;line-height:1.2;">${name}</h1>
            <p style="margin:0;font-size:13px;color:#71717a;line-height:1.5;">${serviceLabel}</p>
          </td>
        </tr>
      </table>

      <!-- FIELDS -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

        <!-- Email -->
        <tr>
          <td style="padding:18px 40px;border-bottom:1px solid #f4f4f5;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">From</p>
            <a href="mailto:${email}" style="font-size:14px;font-weight:500;color:#7c3aed;text-decoration:none;">${email}</a>
          </td>
        </tr>

        <!-- Service -->
        <tr>
          <td style="padding:18px 40px;border-bottom:1px solid #f4f4f5;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">Service Interest</p>
            <span style="display:inline-block;background:#faf5ff;border:1px solid #e9d5ff;border-radius:4px;padding:4px 12px;font-size:13px;font-weight:500;color:#6d28d9;">${serviceLabel}</span>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:18px 40px 28px;">
            <p style="margin:0 0 10px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:#a1a1aa;">Message</p>
            <p style="margin:0;font-size:14px;line-height:1.75;color:#27272a;">${message.replace(/\n/g, '<br/>')}</p>
          </td>
        </tr>

      </table>

      <!-- CTA -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:20px 40px 32px;background:#fafafa;border-top:1px solid #f4f4f5;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="border-radius:6px;background:#7c3aed;" align="center">
                  <a href="mailto:${email}?cc=connect@ayanchakraborty.me&subject=Re: Your Inquiry — ${serviceLabel}" style="display:inline-block;padding:11px 28px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.01em;border-radius:6px;">
                    Reply to ${name}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td align="center" style="padding:24px 0 0;">
      <p style="margin:0 0 4px;font-size:12px;color:#a1a1aa;">
        Received ${now} IST
      </p>
      <p style="margin:0;font-size:12px;color:#a1a1aa;">
        <a href="https://ayanchakraborty.me" style="color:#7c3aed;text-decoration:none;font-weight:500;">ayanchakraborty.me</a>
      </p>
    </td>
  </tr>

</table>

</td></tr>
</table>

</body>
</html>`
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
