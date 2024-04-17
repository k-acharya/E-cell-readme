const { UserModel, UserModel2 } = require("../Models/UserModel");
// const {req,res} = require('express');

const sendEmail = require("../Utils/Email/EmailService");

const getUsers = (req, res) => {
  const password = req.body.password;
  if (password === process.env.CONTACT_RESPONSES_PWD) {
    UserModel2.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  } else {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }
};

const getNewsletters = (req, res) => {
  const password = req.body.password;

  if (password === process.env.NEWSLETTER_PWD) {
    UserModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  } else {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  const email = user.email;
  const subject = "Subscribed for Ecell NITS newsletter.🥳";
  const text = `Thank you for subscribing to the Ecell newsletter! Get ready to dive into a world of entrepreneurial inspiration, valuable resources, and exciting updates. We can't wait to share our knowledge and support your entrepreneurial journey. Stay tuned for our first newsletter, packed with valuable content to help you thrive.\n\nDon't forget to check your spam folder.\n\nBest regards,\n\nE-Cell,\nNational Institute of Technology, Silchar`;
  sendEmail.sendEmail(email, subject, text);
  res.json(user);
};

const sendQuery = async (req, res) => {
  const user = req.body;
  user.sentAt=new Date().toLocaleString();
  const newUser = new UserModel2(user);
  await newUser.save();
  const email = user.email;
  const subject = " Thank You for Contacting ECELL!";
  const text = `Dear ${user.name},\n\nThank you for reaching out to us through our website's "Contact Us" form.\nYou sent:\n> ${user.message}\n\nWe appreciate your interest in E-Cell, NITS. Our team is currently reviewing your message and will respond shortly.\n\nWhile we work on your inquiry, feel free to explore our website for more information. If you have any urgent questions or concerns, please don't hesitate to contact us directly at ecell@nits.ac.in.\n\nThank you for contacting us, and we look forward to assisting you!\n\nBest regards,\n\nE-Cell,\nNational Institute of Technology, Silchar`;
  sendEmail.sendEmail(email, subject, text);
  res.json(user);
};

const getQueries = async (req,res) => {
  try {
    const queries = await UserModel2.find({});
    return res.json(queries);
  } catch (error) {
    return res.json({ message: error.message });
  }
  
};

const getQueryById = async (req, res) => {
  try {
    const query = await UserModel2.findById(req.params.id);
    // console.log(req.user);
    return res.json(query);
  } catch (error) {
    return res.json({ message: error.message });
  }
};
const markRead = async (req, res) => {
  try {
    const query = await UserModel2.findById(req.params.id);
    query.read = true;
    await query.save();
    return res.json(query);
  } catch (error) {
    return res.json({ message: error.message });
  }
}
const deleteQuery = async (req, res) => {
  try {
    const query = await UserModel2.findByIdAndDelete(req.params.id);
    return res.json({ message: "Query deleted successfully" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getNewsletters,
  createUser,
  sendQuery,
  getQueries,
  getQueryById,
  markRead,
  deleteQuery,
};
