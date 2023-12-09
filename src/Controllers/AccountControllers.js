const { AuthSchemaModel, OTPresetpwdModel } = require("../Models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewares/VerifyToken");
const sendEmail = require("../Utils/Email/EmailService");

const signup = async (req, res) => {
  const { name, email, password, bio, userimg } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const Name = name.toString().trim();
    const Email = email.toString().trim();
    const Password = email.toString().trim();
    const Bio = bio.toString().trim();

    if (Password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password should not be less than 8 characters" });
    }

    const existingUser = await AuthSchemaModel.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = new AuthSchemaModel({
      Name,
      Email,
      password: hashedPassword,
      Bio,
      userimg,
    });

    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Failed to register user", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const Email = email.toString().trim();
    const Password = password.toString().trim();

    const user = await AuthSchemaModel.findOne({ Email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // if account is scheduled for deletion, decline the login
    if (user.deleteAccount.length > 0) {
      return res.status(401).json({ error: "Account scheduled for deletion" });
    }

    const passwordMatch = await bcrypt.compare(Password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.YOUR_SECRET_KEY,
      { expiresIn: "720h" } // token valid for 30 days
    );
    // localStorage.setItem('token', token);
    res.status(200).json({ message: "Login successful", token });
    // console.log("login successful");
  } catch (error) {
    console.error("Failed to log in", error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

const dashboard = async (req, res) => {
  // console.log("fetch to dashboard was made");
  verifyToken.verifyToken(req, res, async () => {
    try {
      const userId = req.user.userId;
      const user = await AuthSchemaModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const {
        name,
        email,
        bio,
        userimg,
        facebook,
        github,
        linkedin,
        instagram,
      } = user;
      res.status(200).json({
        name,
        email,
        bio,
        userimg,
        facebook,
        github,
        linkedin,
        instagram,
      });
    } catch (error) {
      console.error("Failed to retrieve user details", error);
      res.status(500).json({ error: "Failed to retrieve user details" });
    }
  });
};

const editProfile = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    const userId = req.user.userId;
    const {
      name,
      bio,
      userimg,
      github,
      facebook,
      linkedin,
      instagram,
      newpwd,
      confirmnewpwd,
    } = req.body;

    try {
      if (
        !name &&
        !bio &&
        !userimg &&
        !github &&
        !facebook &&
        !linkedin &&
        !instagram &&
        !newpwd &&
        !confirmnewpwd
      ) {
        return res
          .status(400)
          .json({ error: "Please fill at least one field" });
      }

      const Name = name.toString().trim();
      const Bio = bio.toString().trim();
      const Github = github.toString().trim();
      const Facebook = facebook.toString().trim();
      const Linkedin = linkedin.toString().trim();
      const Instagram = instagram.toString().trim();
      const Newpwd = newpwd.toString().trim();
      const Confirmnewpwd = confirmnewpwd.toString().trim();

      const user = await AuthSchemaModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (Newpwd !== "" && Newpwd.length < 8) {
        return res
          .status(400)
          .json({ error: "New Password should not be less than 8 characters" });
      }

      if (Newpwd !== Confirmnewpwd) {
        return res.status(400).json({ error: "Passwords must match" });
      }

      const newHashedPwd = await bcrypt.hash(Newpwd, 10);

      if (Newpwd) {
        user.password = newHashedPwd;
      }

      if (Name) {
        user.name = Name;
      }

      if (Bio) {
        user.bio = Bio;
      }

      if (userimg) {
        user.userimg = userimg;
      }

      if (Github) {
        user.github = Github;
      }

      if (Facebook) {
        user.facebook = Facebook;
      }

      if (Linkedin) {
        user.linkedin = Linkedin;
      }

      if (Instagram) {
        user.instagram = Instagram;
      }

      await user.save();
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Failed to update profile", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });
};

const fetchProfile = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    const userId = req.user.userId;

    try {
      const user = await AuthSchemaModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { name, bio, userimg, email, _id } = user;
      res.status(200).json({ name, bio, userimg, email, _id });
    } catch (error) {
      console.error("Failed to retrieve profile", error);
      res.status(500).json({ error: "Failed to retrieve profile" });
    }
  });
};

const forgotPwd = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "missing email" });
  }

  const Email = email.toString().trim();
  const otp = Math.floor(100000 + Math.random() * 900000);

  const existingUser = await AuthSchemaModel.findOne({ Email });
  if (!existingUser) {
    return res.status(400).json({ error: "No account with this email found." });
  }

  try {
    sendEmail.sendEmail(
      Email,
      "[OTP] E-Cell OTP",
      `Your OTP to reset password is: ${otp}\n\nKindly do not share this OTP with anyone.\n\nRegards,\n\nE-Cell,\nNational Institute of Technology, Silchar.`
    );

    await OTPresetpwdModel.findOneAndUpdate(
      { Email },
      { otp },
      { upsert: true }
    );

    res.json({ success: true, email });
  } catch (error) {
    console.log("Error sending OTP:", error);
    res.status(500).json({ error: "An error occurred while sending the OTP" });
  }
};

const verifyOrpResetPwd = async (req, res) => {
  // console.log("Request Body:", req.body);
  const enteredOTP = req.body.otp.toString().trim();
  const { email } = req.body;
  try {
    const otpData = await OTPresetpwdModel.findOne({ email }).exec();

    // console.log("Entered OTP:", enteredOTP);
    // console.log("Stored OTP Data:", otpData.otp);
    // console.log(req.body.email);
    if (otpData) {
      const storedOTP = otpData.otp.toString().trim();
      if (enteredOTP === storedOTP) {
        res.status(200).json({ message: "OTP verified successfully" });
      } else {
        res.status(400).json({ message: "Wrong OTP. Please try again" });
      }
    } else {
      res.status(400).json({ message: "No OTP found for the provided email" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while verifying the OTP" });
  }
};

const changingPwd = async (req, res) => {
  const { email, newpwd0, confirmnewpwd0 } = req.body;

  try {
    const user = await AuthSchemaModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (newpwd0 === "") {
      return res.status(400).json({ error: "Password can't be empty." });
    }

    if (newpwd0 !== "" && newpwd0.length < 8) {
      return res
        .status(400)
        .json({ error: "New Password should not be less than 8 characters" });
    }

    if (newpwd0 !== confirmnewpwd0) {
      return res.status(400).json({ error: "Passwords must match" });
    }

    const newHashedPwd = await bcrypt.hash(newpwd0, 10);

    if (newpwd0) {
      user.password = newHashedPwd;
    }

    await user.save();
    res.status(200).json({ message: "Password recovered successfully" });

    const email12 = email;
    const subject = "[Security Alert] E-Cell NITS";
    const text = `Dear ${email},\n\nPassword of your E-Cell NITS account was recently changed. If you don't recognize this activity, Please contact E-Cell NITS immediately.\n\nRegards,\n\nE-Cell,\nNational Institute of Technology, Silchar.`;
    sendEmail.sendEmail(email12, subject, text);
  } catch (error) {
    console.error("Failed to change password", error);
    res.status(500).json({ error: "Failed to change password" });
  }
};

const getPublicProfile = async (req, res) => {
  try {
    const { authoruniqueid } = req.params;
    // console.log(authoruniqueid);
    const user = await AuthSchemaModel.findById(authoruniqueid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { name, email, bio, userimg, facebook, github, linkedin, instagram } =
      user;
    res.status(200).json({
      name,
      email,
      bio,
      userimg,
      facebook,
      github,
      linkedin,
      instagram,
    });
  } catch (error) {
    console.error("Failed to retrieve user details", error);
    res.status(500).json({ error: "Failed to retrieve user details" });
  }
};

const deleteAccount = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    try {
      const userId = req.user.userId;
      const user = await AuthSchemaModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { reason } = req.body;
      if (!reason) {
        return res
          .status(400)
          .json({ error: "Please provide a reason for deleting your account" });
      } else {
        const Reason = reason.toString().trim();
        user.deleteAccount.push({ flaggedForDeletion: true, reason: Reason });
      }

      return res
        .status(200)
        .json({ message: "Account scheduled for deletion" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "something went wrong" });
    }
  });
};

const getAllAccounts = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await AuthSchemaModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin") {
      try {
        const users = await AuthSchemaModel.find();
        res.status(200).json({ users });
      } catch (e) {
        console.error(e);
        return res
          .status(500)
          .json({ error: "something went wrong on the server" });
      }
    } else {
      return res.status(401).json({ error: "Not authorized to access this api endpoint" });
    }
  });
};

module.exports = {
  signup,
  login,
  dashboard,
  editProfile,
  fetchProfile,
  forgotPwd,
  verifyOrpResetPwd,
  changingPwd,
  getPublicProfile,
  deleteAccount,
  getAllAccounts,
};
