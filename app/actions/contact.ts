'use server'

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Server-side validation schema with spam protection fields
const serverFormSchema = z.object({
  navn: z.string().min(2).max(100),
  email: z.string().email().max(100),
  emne: z.string().min(1),
  besked: z.string().min(10).max(1000),
  honeypot: z.string().max(0, 'Spam detected'), // Must be empty
  timestamp: z.coerce.number(),
});

// Subject line mapping for Danish form options
const subjectMapping: Record<string, string> = {
  'booking': 'Booking af oplæg',
  'workshop': 'Workshop forespørgsel',
  'raadgivning': 'Strategisk rådgivning',
  'investering': 'Investering / Pitch',
  'andet': 'Andet',
};

type FormResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitContactForm(formData: FormData): Promise<FormResult> {
  try {
    // Parse form data
    const data = {
      navn: formData.get('navn'),
      email: formData.get('email'),
      emne: formData.get('emne'),
      besked: formData.get('besked'),
      honeypot: formData.get('honeypot') || '',
      timestamp: formData.get('timestamp'),
    };

    // Validate with Zod
    const validated = serverFormSchema.safeParse(data);

    if (!validated.success) {
      console.error('Validation error:', validated.error.flatten());
      return {
        success: false,
        error: 'Ugyldige formular data. Tjek venligst alle felter.'
      };
    }

    const { navn, email, emne, besked, timestamp } = validated.data;

    // Spam protection: Check if submission was too fast (less than 2 seconds)
    const submissionTime = Date.now() - timestamp;
    if (submissionTime < 2000) {
      console.warn('Submission too fast, possible bot:', submissionTime);
      return {
        success: false,
        error: 'Indsendelse afvist. Prøv igen.'
      };
    }

    // Get subject line from mapping
    const subject = subjectMapping[emne] || 'Ny kontaktformular';

    // Create HTML email
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
    }
    .header {
      background: #FACC15;
      padding: 30px 20px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      color: #000;
      font-size: 24px;
    }
    .content {
      background: #f9f9f9;
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      background: #ffffff;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #FACC15;
    }
    .label {
      font-weight: bold;
      color: #555;
      margin-bottom: 5px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #000;
      font-size: 16px;
      word-wrap: break-word;
    }
    .message-field {
      white-space: pre-wrap;
    }
    .footer {
      background: #000;
      color: #FACC15;
      padding: 20px;
      text-align: center;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📧 Ny kontaktformular</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Navn</div>
        <div class="value">${navn}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Emne</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Besked</div>
        <div class="value message-field">${besked}</div>
      </div>
    </div>
    <div class="footer">
      Sendt fra julianbentsingh.dk kontaktformular
    </div>
  </div>
</body>
</html>
`;

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'Julian Bent Singh Website <noreply@julianbentsingh.dk>',
      to: process.env.CONTACT_EMAIL || 'kontakt@julianbentsingh.dk',
      replyTo: email,
      subject: `[Kontaktformular] ${subject}`,
      html: emailHtml,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return {
        success: false,
        error: 'Email kunne ikke sendes. Prøv igen senere.'
      };
    }

    console.log('Email sent successfully:', result.data?.id);
    return {
      success: true,
      message: 'Tak for din besked! Vi vender tilbage inden for 24 timer.'
    };

  } catch (error) {
    console.error('Server action error:', error);
    return {
      success: false,
      error: 'Der opstod en uventet fejl. Prøv igen senere.'
    };
  }
}
