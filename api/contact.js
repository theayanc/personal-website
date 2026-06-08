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
      from: 'Ayan Chakraborty <connect@ayanchakraborty.me>',
      to: ['connect@ayanchakraborty.me', 'shivab@xequalto.com'],
      reply_to: email,
      subject: `New inquiry from ${name} — ${serviceLabel}`,
      html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<div style="display:none;font-size:1px;color:#f4f4f5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  New inquiry from ${name} — ${serviceLabel}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
<tr><td align="center" style="padding:32px 16px 28px;">

<table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <!-- HEADER -->
  <tr>
    <td style="background:#ffffff;padding:0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="height:3px;background:linear-gradient(90deg,#6d28d9 0%,#a78bfa 100%);font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:28px 36px 20px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#f3f0ff;border:1px solid #ddd6fe;color:#7c3aed;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;border-radius:50px;">
                  &#9679;&nbsp; New Inquiry
                </td>
              </tr>
            </table>
            <h1 style="margin:14px 0 2px;font-size:22px;font-weight:700;color:#09090b;letter-spacing:-0.02em;">${name}</h1>
            <p style="margin:0;font-size:12px;color:#a1a1aa;">${serviceLabel} &middot; ${now} IST</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- DETAILS -->
  <tr>
    <td style="background:#ffffff;padding:0 36px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #f0f0f0;padding-top:16px;">

        <!-- Email -->
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
            <p style="margin:0 0 2px;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#a1a1aa;">Email</p>
            <a href="mailto:${email}" style="font-size:13px;font-weight:600;color:#7c3aed;text-decoration:none;">${email}</a>
          </td>
        </tr>

        <!-- Service -->
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f4f4f5;">
            <p style="margin:0 0 6px;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#a1a1aa;">Service Interest</p>
            <span style="display:inline-block;background:#f3f0ff;border:1px solid #ddd6fe;border-radius:6px;padding:3px 12px;font-size:12px;font-weight:600;color:#7c3aed;">${serviceLabel}</span>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:10px 0;">
            <p style="margin:0 0 6px;font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#a1a1aa;">Message</p>
            <p style="margin:0;font-size:13px;line-height:1.7;color:#3f3f46;">${message.replace(/\n/g, '<br/>')}</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="background:#ffffff;padding:16px 36px 28px;">
      <a href="mailto:${email}?subject=Re: Your inquiry" style="display:inline-block;background:#7c3aed;color:#ffffff;text-decoration:none;font-size:12px;font-weight:600;letter-spacing:0.02em;padding:10px 24px;border-radius:8px;">Reply to ${name} &rsaquo;</a>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#fafafa;border-top:1px solid #f0f0f0;padding:14px 36px;border-radius:0 0 16px 16px;" align="center">
      <p style="margin:0;font-size:11px;color:#a1a1aa;">
        <a href="https://ayanchakraborty.me" style="color:#7c3aed;text-decoration:none;font-weight:500;">ayanchakraborty.me</a>
        &middot; Data Architecture & Engineering
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
