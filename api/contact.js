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
<body style="margin:0;padding:0;background-color:#f0eef8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<div style="display:none;font-size:1px;color:#f0eef8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">New inquiry from ${name} — ${serviceLabel}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eef8;">
<tr><td align="center" style="padding:48px 16px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

  <!-- BRAND -->
  <tr>
    <td align="center" style="padding-bottom:28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="width:38px;height:38px;background:#6d28d9;border-radius:10px;text-align:center;vertical-align:middle;font-size:16px;font-weight:700;color:#ffffff;line-height:38px;">
            A
          </td>
          <td style="padding-left:12px;vertical-align:middle;">
            <p style="margin:0;font-size:14px;font-weight:700;color:#3b0764;letter-spacing:-0.01em;">Ayan Chakraborty</p>
            <p style="margin:0;font-size:11px;color:#7c3aed;">Data Architecture &amp; Engineering</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- CARD -->
  <tr>
    <td style="background:#ffffff;border-radius:16px;box-shadow:0 1px 4px rgba(109,40,217,0.06),0 12px 40px rgba(109,40,217,0.1);overflow:hidden;">

      <!-- HEADER -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:36px 44px 30px;background:linear-gradient(135deg,#faf7ff 0%,#ede9fe 100%);border-bottom:1px solid #ddd6fe;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                    <tr>
                      <td style="background:#7c3aed;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:5px 14px;border-radius:20px;">
                        New Inquiry
                      </td>
                    </tr>
                  </table>
                  <h1 style="margin:0 0 6px;font-size:28px;font-weight:800;color:#1c0a3e;letter-spacing:-0.04em;line-height:1.1;">${name}</h1>
                  <p style="margin:0;font-size:13px;color:#7c3aed;font-weight:600;letter-spacing:0.01em;">${serviceLabel}</p>
                </td>
                <td align="right" style="vertical-align:top;padding-top:4px;">
                  <p style="margin:0;font-size:11px;color:#a78bfa;white-space:nowrap;">${now} IST</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- FIELDS -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

        <tr>
          <td style="padding:22px 44px;border-bottom:1px solid #f5f3ff;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="110" style="vertical-align:top;padding-top:2px;">
                  <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#c4b5fd;">From</p>
                </td>
                <td>
                  <a href="mailto:${email}" style="font-size:14px;font-weight:500;color:#4c1d95;text-decoration:none;">${email}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:22px 44px;border-bottom:1px solid #f5f3ff;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="110" style="vertical-align:middle;">
                  <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#c4b5fd;">Interest</p>
                </td>
                <td>
                  <span style="display:inline-block;background:#ede9fe;border-radius:20px;padding:5px 16px;font-size:12px;font-weight:700;color:#5b21b6;letter-spacing:0.01em;">${serviceLabel}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:22px 44px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="110" style="vertical-align:top;padding-top:2px;">
                  <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#c4b5fd;">Message</p>
                </td>
                <td>
                  <p style="margin:0;font-size:14px;line-height:1.8;color:#1c0a3e;">${message.replace(/\n/g, '<br/>')}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

      <!-- CTA -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:24px 44px 36px;border-top:1px solid #f5f3ff;background:#fdfcff;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="border-radius:8px;background:#6d28d9;box-shadow:0 2px 12px rgba(109,40,217,0.35);" align="center">
                  <a href="mailto:${email}?cc=connect@ayanchakraborty.me&subject=Re: Your Inquiry — ${serviceLabel}" style="display:inline-block;padding:13px 32px;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.02em;border-radius:8px;">
                    Reply to ${name} &nbsp;&rarr;
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
      <p style="margin:0;font-size:12px;color:#9f7aea;">
        Sent via <a href="https://ayanchakraborty.me" style="color:#6d28d9;text-decoration:none;font-weight:600;">ayanchakraborty.me</a>
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
}
