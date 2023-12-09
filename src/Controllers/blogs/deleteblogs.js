const { verifyToken } = require("../../Middlewares/VerifyToken");
const { AuthSchemaModel, blogs1 } = require("../../Models/UserModel");

// DELETE provisional blog
// endpoint: /deleteblog
// access: private
// payload : blogid

const deleteBlogs = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      const userId = req.user.userId;
      const user = await AuthSchemaModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { blogid } = req.body;
      // only provisional blogs can be deleted by author i.e those blogs which hasn't been published yet

      const blog = await blogs1.findById(blogid);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      if (blog.writeremail !== user.email) {
        return res.status(401).json({ error: "Not the author of this blog" });
      } else {
        await blogs1.findByIdAndDelete(blogid);
        return res
          .status(200)
          .json({ message: "Blog deleted successfully", success: true });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: "something went wrong",
      });
    }
  });
};

module.exports = {
  deleteBlogs,
};
