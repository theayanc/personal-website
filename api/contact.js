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
    'performance': 'Performance Optimization',
    'architecture': 'Data Architecture',
    'migration': 'Cloud Migration',
    'consulting': 'Corporate Training',
    'audit': 'Architecture Audit',
  };

  const serviceLabel = serviceLabels[service] || service || 'Not specified';

  const now = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
  });

  try {
    await resend.emails.send({
      from: 'Ayan Chakraborty <onboarding@resend.dev>',
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
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<div style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  New inquiry from ${name} — ${serviceLabel}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
<tr><td align="center" style="padding:48px 16px 40px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.6);">

  <!-- HEADER -->
  <tr>
    <td style="background:linear-gradient(145deg,#0d0d0d 0%,#130d1f 50%,#1a0d2e 100%);padding:0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="height:3px;background:linear-gradient(90deg,#6d28d9 0%,#a78bfa 50%,#6d28d9 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:40px 44px 16px;" align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
              <tr>
                <td style="background:rgba(167,139,250,0.12);border:1px solid rgba(167,139,250,0.25);color:#c4b5fd;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:5px 16px;border-radius:50px;">
                  &#9679;&nbsp; New Inquiry
                </td>
              </tr>
            </table>
            <h1 style="margin:20px 0 0;font-size:30px;font-weight:700;line-height:1.2;color:#ffffff;letter-spacing:-0.02em;text-align:center;">
              ${name}
            </h1>
            <p style="margin:10px 0 4px;font-size:13px;color:rgba(196,181,253,0.7);text-align:center;">${serviceLabel}</p>
            <p style="margin:0 0 36px;font-size:11px;color:rgba(167,139,250,0.4);text-align:center;">${now} IST</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- DETAILS -->
  <tr>
    <td style="background-color:#111111;padding:36px 44px 0;">
      <p style="margin:0 0 20px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#6d28d9;">Contact Details</p>

      <!-- Email -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
        <tr>
          <td style="padding:18px 22px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#555;">Email</p>
            <a href="mailto:${email}" style="font-size:14px;font-weight:600;color:#a78bfa;text-decoration:none;">${email}</a>
          </td>
        </tr>
      </table>

      <!-- Service -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
        <tr>
          <td style="padding:18px 22px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#555;">Service Interest</p>
            <span style="display:inline-block;background:#1e1533;border:1px solid #4c3d8a;border-radius:6px;padding:5px 16px;font-size:13px;font-weight:600;color:#a78bfa;letter-spacing:0.02em;">${serviceLabel}</span>
          </td>
        </tr>
      </table>

      <!-- Message -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:0;">
        <tr>
          <td style="padding:18px 22px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#555;">Message</p>
            <p style="margin:0;font-size:14px;line-height:1.75;color:#cccccc;">${message.replace(/\n/g, '<br/>')}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="background-color:#111111;padding:28px 44px 0;text-align:center;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
          <td style="border-radius:50px;background:linear-gradient(135deg,#6d28d9 0%,#a78bfa 100%);box-shadow:0 4px 20px rgba(109,40,217,0.35);" align="center">
            <a href="mailto:${email}?subject=Re: Your inquiry" style="display:inline-block;padding:14px 40px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:0.03em;border-radius:50px;">
              Reply to ${name} &rsaquo;
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- DIVIDER -->
  <tr>
    <td style="background-color:#111111;padding:32px 44px 0;">
      <div style="height:1px;background:linear-gradient(90deg,transparent 0%,#2a2a2a 20%,#2a2a2a 80%,transparent 100%);"></div>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background-color:#111111;padding:24px 44px 36px;border-radius:0 0 20px 20px;" align="center">
      <p style="margin:0;font-size:12px;color:#444;line-height:1.6;">
        ayanchakraborty.me &middot; Data Architecture & Engineering
      </p>
      <p style="margin:6px 0 0;font-size:11px;color:#333;">
        <a href="https://ayanchakraborty.me" style="color:#6d28d9;text-decoration:none;font-weight:500;">ayanchakraborty.me</a>
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
