// otpUtils.js
const crypto = require('crypto');

// Generate a 6-digit OTP
function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

module.exports = {
  generateOtp
};
