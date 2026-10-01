import nodemailer from 'nodemailer';

export const sendBookingEmail = async (userEmail, userName, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const logoUrl = 'https://files.catbox.moe/8w7yst.png';

  // Attractive HTML Template for the User
  const userHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${logoUrl}" alt="Tamil Trails Logo" style="max-width: 250px; height: auto;" />
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid #d97706;">
        <h2 style="color: #1f2937; margin-top: 0;">Your Journey Begins Here!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Dear ${userName},</p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Thank you for reaching out to Tamil Trails. We have successfully received your booking inquiry. Our travel experts are currently reviewing your request and will contact you shortly to finalize your perfect itinerary.</p>
        
        <div style="background-color: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 6px; margin: 25px 0;">
          <h3 style="color: #92400e; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Inquiry Details:</h3>
          <p style="margin: 5px 0; color: #4b5563;"><strong>Package:</strong> ${bookingDetails.packageInterested || 'General Inquiry'}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>Phone:</strong> ${bookingDetails.phone}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>Email:</strong> ${bookingDetails.email}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>Message:</strong> ${bookingDetails.message || 'N/A'}</p>
        </div>
        
        <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">Get ready to explore the rich culture, majestic temples, and scenic landscapes of Tamil Nadu!</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Explore &bull; Experience &bull; Discover</p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} Tamil Trails. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;

  // Attractive HTML Notification for the Owner
  const ownerHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Tamil Trails Logo" style="max-width: 200px; height: auto;" />
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 5px solid #059669;">
        <div style="text-align: center; margin-bottom: 20px;">
          <span style="background-color: #d1fae5; color: #065f46; padding: 6px 12px; border-radius: 20px; font-weight: bold; font-size: 14px;">HOT NEW LEAD 🚀</span>
        </div>
        <h2 style="color: #111827; margin-top: 0; text-align: center; font-size: 24px;">New Booking Inquiry</h2>
        <p style="color: #4b5563; font-size: 16px; text-align: center; margin-bottom: 25px;">You just received a new lead on the Tamil Trails website.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${userName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2563eb; font-weight: bold;"><a href="tel:${bookingDetails.phone}" style="color: #2563eb; text-decoration: none;">${bookingDetails.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2563eb; font-weight: bold;"><a href="mailto:${userEmail}" style="color: #2563eb; text-decoration: none;">${userEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Package:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #059669; font-weight: bold;">${bookingDetails.packageInterested || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; color: #0f172a; font-style: italic;">"${bookingDetails.message || 'No additional message.'}"</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="tel:${bookingDetails.phone}" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(217, 119, 6, 0.3);">Call Lead Now</a>
        </div>
      </div>
    </div>
  `;

  try {
    // Send to User
    if (userEmail) {
      await transporter.sendMail({
        from: '"Tamil Trails" <' + process.env.EMAIL_USER + '>',
        to: userEmail,
        subject: 'Booking Received - Your Tamil Trails Journey',
        html: userHtml
      });
    }
    
    // Send to Owner
    await transporter.sendMail({
      from: '"Tamil Trails System" <' + process.env.EMAIL_USER + '>',
      to: process.env.EMAIL_USER,
      subject: '🔥 New Lead: ' + userName + ' - ' + (bookingDetails.packageInterested || 'General Inquiry'),
      html: ownerHtml
    });
    
    return true;
  } catch (error) {
    console.error('Error sending emails:', error);
    return false;
  }
};
