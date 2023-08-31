const verifyToken = require("../Middlewares/VerifyToken");
const {
  
  blogs1,
  PublishedBlog,
 
} = require("../Models/UserModel");

const getBlogs = (req, res) => {
  console.log("Request to fetch blogs has been made.");
  blogs1.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const getBlogsId = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogs1.findById(blogId);
    res.json(blog);
  } catch (error) {
    console.log("Error fetching blog:", error);
    res.status(500).json({ error: "Error fetching blog" });
  }
};

const acceptedBlogs = (req, res) => {
  console.log("request to fetch accepted blogs has been made");
  PublishedBlog.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const acceptedBlogsPost = async (req, res) => {
  const { blogId } = req.body;

  try {
    const blog = await blogs1.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    blog.status = "published";
    await blog.save();
    const publishedBlog = new PublishedBlog(blog.toObject());
    await publishedBlog.save();

    console.log(
      `The blog with the title ${blog.title} from ${blog.writernmae} having email ${blog.writeremail} has been published.`
    );

    const email = blog.writeremail;
    const subject = " Congratulations! Your blog Published!";
    const text = `Dear ${blog.writernmae},\n\n We feel immense pleasure to tell you that our Content team has verified your blog and it has met our standards thus your blog has been published on our website https://ecellnits.org \n\n Keep writing blogs and inspiring the mass.\n\nRegards\n\nE-Cell,\nNational Institute of Technology, Silchar`;
    sendEmail(email, subject, text);

    const email0 = [
      "aditya21_ug@civil.nits.ac.in",
      "uttirna21_ug@ece.nits.ac.in",
      "aditi.khataniar@gmail.com",
      "vivekmfp24@gmail.com",
      "vivekkumar21_ug@ee.nits.ac.in",
    ];
    const subject0 = "A blog reviewed and published!";
    const text0 = `Dear Content Team Head, Co-head & Executive Head,\n\n The blog with the title "${blog.title}" from "${blog.writernmae}" having email ${blog.writeremail} has been reviewed by a member of blog verifying team and thus has been published on https://ecellnits.org/resources\n\nRegards\n\nE-Cell Technical Team,\nNational Institute of Technology, Silchar`;
    sendEmail(email0, subject0, text0);

    res.status(200).json({ message: "Blog published successfully" });
  } catch (error) {
    console.log("Error storing published blog:", error);
    res.status(500).json({ error: "Error storing published blog" });
  }
};

const editBlog = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    const { blogId } = req.params;
    console.log(blogId);
    const {
      title,
      tag,
      intro,
      content,
      writernmae,
      writerintro,
      writerpic,
      timestamp,
      topicpic,
      writeremail,
    } = req.body;

    try {
      const blog = await blogs1.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "blog not found" });
      }

      if (title) {
        blog.title = title;
      }

      if (tag) {
        blog.tag = tag;
      }

      if (intro) {
        blog.intro = intro;
      }

      if (content) {
        blog.content = content;
      }

      if (writernmae) {
        blog.writernmae = writernmae;
      }

      if (writerintro) {
        blog.writerintro = writerintro;
      }

      if (writerpic) {
        blog.writerpic = writerpic;
      }

      if (timestamp) {
        blog.timestamp = timestamp;
      }

      if (topicpic) {
        blog.topicpic = topicpic;
      }

      if (writeremail) {
        blog.writeremail = writeremail;
      }

      await blog.save();
      res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error("Failed to update Blog", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });
};


module.exports = {
  getBlogs,
  getBlogsId,
  acceptedBlogs,
  acceptedBlogsPost,editBlog
};
