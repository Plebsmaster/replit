import { MailService } from '@sendgrid/mail';

// Initialize SendGrid service
function createMailService() {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn('SENDGRID_API_KEY environment variable not set - email sending will be simulated');
    return null;
  }

  const mailService = new MailService();
  mailService.setApiKey(apiKey);
  return mailService;
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send email using SendGrid
 * Referenced from javascript_sendgrid integration
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  const mailService = createMailService();
  
  if (!mailService) {
    // Simulate email sending when API key is not available
    console.log('[SendGrid] Simulating email send:', params);
    return true;
  }

  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };

    // Only include text and html if they are provided
    if (params.text) {
      emailData.text = params.text;
    }
    if (params.html) {
      emailData.html = params.html;
    }

    await mailService.send(emailData);
    console.log('[SendGrid] Email sent successfully to:', params.to);
    return true;
  } catch (error) {
    console.error('[SendGrid] Email error:', error);
    return false;
  }
}

/**
 * Generate a 6-digit OTP code
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP email to user
 */
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  const emailParams: EmailParams = {
    to: email,
    from: 'noreply@salonid.com', // Replace with your verified sender
    subject: 'Your Verification Code',
    text: `Your verification code is: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <div style="font-size: 32px; font-weight: bold; color: #007bff; padding: 20px; text-align: center; background-color: #f8f9fa; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
      </div>
    `
  };

  return await sendEmail(emailParams);
}