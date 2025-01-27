export const registrationEmail = (userData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e40af; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to BLITS!</h1>
    </div>
    <div class="content">
      <h2>Hello ${userData.fullName},</h2>
      <p>Thank you for registering for BLITS. We're excited to have you join us!</p>
      <p>Your registration details:</p>
      <ul>
        <li>Name: ${userData.fullName}</li>
        <li>Email: ${userData.email}</li>
        <li>Profession: ${userData.profession}</li>
      </ul>
      <p>We'll keep you updated with more information as we get closer to the event.</p>
      <p>Best regards,<br>BLITS Team</p>
    </div>
  </div>
</body>
</html>
`;

export const bulkEmail = (subject, content) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Same styles as above */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BLITS Update</h1>
    </div>
    <div class="content">
      <h2>${subject}</h2>
      ${content}
      <p>Best regards,<br>BLITS Team</p>
    </div>
  </div>
</body>
</html>
`; 