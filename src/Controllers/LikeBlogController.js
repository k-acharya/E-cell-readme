const {
  
  PublishedBlog,
  AuthSchemaModel,
 
} = require("../Models/UserModel");

const verifyToken = require("../Middlewares/VerifyToken");

const blogIdLike = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    const userId = req.user.userId;
    const blogId = req.params.blogId;

    try {
      const blog = await PublishedBlog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      if (blog.likes.includes(userId)) {
        return res
          .status(400)
          .json({ error: "You have already liked this blog" });
      }

      blog.likes.push(userId);
      blog.likesCount += 1;

      await blog.save();
      console.log("blog liked");

      res.status(200).json({ likes: blog.likesCount });
    } catch (error) {
      console.error("Failed to update like count", error);
      res.status(500).json({ error: "Failed to update like count" });
    }
  });
};

const fetchLikedBlogs = async (req, res) => {
  verifyToken.verifyToken(req, res, async () => {
    try {
      const userId = req.user.userId;
      console.log(userId);

      const user = await AuthSchemaModel.findById(userId);
      // console.log(user)
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const likedBlogs = await PublishedBlog.find({ likes: userId }).exec();

      console.log(likedBlogs);
      res.status(200).json(likedBlogs);
    } catch (error) {
      console.error("Error fetching liked blogs:", error);
      res.status(500).json({ error: "Failed to fetch liked blogs" });
    }
  });
};

module.exports = {
  blogIdLike,fetchLikedBlogs
};
