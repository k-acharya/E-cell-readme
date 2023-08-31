const {
  UserModel,
  UserModel2,
  blogs1,
  PublishedBlog,
  AuthSchemaModel,
  OTPModel,
  OTPresetpwdModel,
} = require("../Models/UserModel");

const verifyToken = require("../Middlewares/VerifyToken");

const apiComment = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    try {
      const blogId = req.params.id;
      const { commentauthor, text, commentpic } = req.body;

      const blog = await PublishedBlog.findById(blogId);
      // const blog = await blogs1.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      const newComment = {
        commentauthor,
        commentpic,
        text,
        createdAt: new Date(),
      };

      blog.comments.push(newComment);
      await blog.save();

      res.json(blog);
    } catch (error) {
      console.log("Error adding comment:", error);
      res.status(500).json({ error: "Error adding comment" });
    }
  });
};

const getCommentPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const comments = await PublishedBlog.find({ _id: postId });
    // const comments = await blogs1.find({ postId });
    console.log(comments);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    console.log("Error fetching comments:",error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

module.exports = {
  apiComment,getCommentPostId
};
