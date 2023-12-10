const {
  UserModel,
  OTPModel,
} = require("../Models/UserModel");

const sendEmail = require("../Utils/Email/EmailService")

const checkEmail = (req, res) => {
  const email = req.body.email;
  UserModel.findOne({ email }, (err, user) => {
    if (err) {
      console.log("Error checking email uniqueness:", err);
      res
        .status(500)
        .json({ error: "An error occurred while checking email uniqueness" });
    } else {
      const unique = !user;
      res.json({ unique });
    }
  });
};

const sendOtp = async (req, res) => {
  let { email } = req.body;
  email = email?.toString().toLowerCase().trim();

  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    sendEmail.sendEmail(
      email,
      "E-Cell Signup OTP",
      `Your OTP for Account Registration on the NITS E-Cell Website is: ${otp}\n\nPlease do not share this OTP with anyone.\n\nRegards,\nTeam NITS E-Cell`
    );

    await OTPModel.findOneAndUpdate({ email }, { otp }, { upsert: true });

    return res.status(200).json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.log("Error sending OTP:", error);
    res.status(500).json({ error: "An error occurred while sending the OTP" });
  }
};

const verifyOtp = async (req, res) => {
  // console.log("Request Body:", req.body);
  const enteredOTP = req.body.otp?.toString().trim();

  let {email} = req.body
  email = email?.toString().toLowerCase().trim();

  try {
    const otpData = await OTPModel.findOne({ email }).exec();

    // console.log("Entered OTP:", enteredOTP);
    // console.log("Stored OTP Data:", otpData.otp);
    // console.log(req.body.email)
    if (otpData) {
      const storedOTP = otpData.otp.toString().trim();
      if (enteredOTP === storedOTP) {
        res.status(200).json({ message: "OTP verified successfully" });
      } else {
        res.status(400).json({ message: "Wrong OTP. Please try again" });
      }
    } else {
      console.log("No OTP found for the provided email");
      res.status(404).json({ message: "No OTP found for the provided email" });
    }
  } catch (error) {
    // console.log("Error verifying OTP:", error);
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the OTP" });
  }
};






module.exports = {
  checkEmail,
  sendOtp,
  verifyOtp,
};
