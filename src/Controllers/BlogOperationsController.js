const {
  
  blogs1,
  PublishedBlog,
  
} = require("../Models/UserModel");

const verifyToken = require("../Middlewares/VerifyToken");
const sendEmail = require("../Utils/Email/EmailService")

const createBlog = async (req, res) => {
  const user = req.body;
  const newUser = new blogs1(user);
  await newUser.save();

  /* Sending mail to Content team member for kind verification of blog */
  const email = [
    "aditya21_ug@civil.nits.ac.in",
    "uttirna21_ug@ece.nits.ac.in",
    "aditi.khataniar@gmail.com",
    "vivekmfp24@gmail.com",
    "vivekkumar21_ug@ee.nits.ac.in",
  ];
  const subject = "A New Blog added on E-Cell website!";
  const text = `Dear Content Team member,\n\nA new blog has been added on the ecell offcial website. Please visit https://ecellnits.org/provisionalblog and kindly verify the blog content.\n\nUsername: dtsx\nPassword: golmol-aurargb\n\nRegards\n\n E-Cell Technical Team,\nNational Institute of Technology, Silchar.`;
  sendEmail.sendEmail(email, subject, text);
  res.json(user);
};

const myProvisionalBlogs = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    try {
      const writerEmail = req.user.email;

      console.log(writerEmail);
      const blogs = await blogs1.find({ writeremail: writerEmail });
      // const blogs = await PublishedBlog.find({ writeremail: writerEmail });
      res.status(200).json({ blogs });
      console.log(blogs);
    } catch (error) {
      console.error("Failed to retrieve blogs", error);
      res.status(500).json({ error: "Failed to retrieve blogs" });
    }
  });
};

const myPublishedBlogs = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    try {
      const writerEmail = req.user.email;

      console.log(writerEmail);
      const blogs = await PublishedBlog.find({ writeremail: writerEmail });
      res.status(200).json({ blogs });
      console.log(blogs);
    } catch (error) {
      console.error("Failed to retrieve blogs", error);
      res.status(500).json({ error: "Failed to retrieve blogs" });
    }
  });
};

const publicilyWrittenBlogs = async (req, res) => {
  try {
    const { authoruniqueid } = req.params;
    console.log(authoruniqueid);
    // const blogs = await PublishedBlog.findById(authoruniqueid);
    const blogs = await PublishedBlog.find({ authorid: authoruniqueid });

    if (blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found for the user" });
    }

    const formattedBlogs = blogs.map((blog) => {
      const {
        title,
        intro,
        tag,
        content,
        topicpic,
        writernmae,
        writeremail,
        writerintro,
        _id,
      } = blog;
      return {
        title,
        intro,
        tag,
        content,
        topicpic,
        writernmae,
        writeremail,
        writerintro,
        _id,
      };
    });

    res.status(200).json(formattedBlogs);
  } catch (error) {
    console.error("Failed to retrieve user details", error);
    res.status(500).json({ error: "Failed to retrieve user details" });
  }
};

const tagSpecificBlog = async (req, res) => {
  try {
    const { tagname } = req.params;
    console.log(tagname);
    const blogs = await PublishedBlog.find({
      tag: { $regex: "\\b" + tagname + "\\b", $options: "i" },
    });

    if (blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found with this tag." });
    }

    const totalBlogs = blogs.map((blog) => {
      const {
        title,
        intro,
        tag,
        content,
        topicpic,
        writernmae,
        writeremail,
        writerintro,
        _id,
      } = blog;
      return {
        title,
        intro,
        tag,
        content,
        topicpic,
        writernmae,
        writeremail,
        writerintro,
        _id,
      };
    });

    res.status(200).json(totalBlogs);
  } catch (error) {
    console.error("Failed to retrieve ag specific blogs.", error);
    res.status(500).json({ error: "Failed to retrieve ag specific blogs." });
  }
};
module.exports = {
  createBlog,
  myProvisionalBlogs,
  myPublishedBlogs,
  publicilyWrittenBlogs,
  tagSpecificBlog
};
