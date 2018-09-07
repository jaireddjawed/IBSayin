Accounts.emailTemplates.siteName = 'IBSayin\'';
Accounts.emailTemplates.from     = 'IBSayin\' <admin@ibsayin.tk>';

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return '[IBSayin\'] Verify Your Email Address';
  },
  text(user, url) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = 'support@ibsayin.tk',
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  },
};

Accounts.emailTemplates.resetPassword = {
  subject() {
    return '[IBSayin\'] Reset Your Password';
  },
  text(user, url) {
        let urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = 'support@ibsayin.tk',
        emailBody      = `To reset your password, visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this link, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  },
};
