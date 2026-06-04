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
        // Using the provided API key
        'Authorization': `Bearer re_JmqWedkA_HprEi76BdCWpCeny4fKJRaA3`
      },
      body: JSON.stringify({
        // Resend requires a verified domain to send from, otherwise you can only use their onboarding test email 
        // to send emails to the email address associated with your Resend account.
        from: 'Contact Form <onboarding@resend.dev>',
        to: 'connect@ayanchakraborty.me',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h3>New Contact Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service || 'None'}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `
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
