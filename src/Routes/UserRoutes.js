const express = require("express");
const router = express.Router();
const HomeController = require("../Controllers/HomeController");
const BlogController = require("../Controllers/BlogController");
const UniqueAccountController = require("../Controllers/UniqueAccountController");
const AccountController = require("../Controllers/AccountControllers");
const FooterQueryController = require("../Controllers/FooterQueryController");
const BlogOpearionsController = require("../Controllers/BlogOperationsController");
const LikeBlogControllers = require("../Controllers/LikeBlogController");
const BlogCommentsController = require("../Controllers/BlogCommentsController");
const verifyToken= require("./../Middlewares/VerifyToken")

// create account
router.post("/signup", AccountController.signup);

// login on the website
router.post("/login", AccountController.login);

// fetch details like  name, email, bio, userimg, facebook, github, linkedin, instagram of a user
router.get("/dashboard", AccountController.dashboard);

// fetch  details like name, bio, userimg, email, _id of a user
router.get("/fetchprofile", AccountController.fetchProfile);

// edit the profile of a user
router.put("/editprofile", AccountController.editProfile);

// take email and send otp to reset the password
router.post("/forgotpwd", AccountController.forgotPwd);

// verify the otp
router.post("/verifyotpresetpwd", AccountController.verifyOrpResetPwd);

// changing the password (basically reset)
router.put("/changingpwd", AccountController.changingPwd);

// flagging the account for deletion, and user can't login after this
router.post("/deleteaccount", AccountController.deleteAccount);

// get the public profile of a user by its unique id
router.get(
  "/publicprofile/:authoruniqueid",
  AccountController.getPublicProfile
);

// instead of using the password as the mode of authentication, make this endpoint accessible only to the admin
router.post("/getUsers", FooterQueryController.getUsers);
router.post("/getnewsletters", FooterQueryController.getNewsletters);
// above two needs to be protected
// change method to get from post

// subscribe to the newsletter requries email
router.post("/createUser", FooterQueryController.createUser);

// contact us form, requires name, email, message
router.post("/sendquery", FooterQueryController.sendQuery);
router.get(
  "/getqueries",
  verifyToken.verifyToken,
  verifyToken.isAdmin,
  FooterQueryController.getQueries
);
router.get(
  "/getqueries/:id",
  verifyToken.verifyToken,
  verifyToken.isAdmin,
  FooterQueryController.getQueryById
);
router.get(
  "/query-read/:id",
  verifyToken.verifyToken,
  verifyToken.isAdmin,
  FooterQueryController.markRead
);
router.delete(
  "/deletequery/:id",
  verifyToken.verifyToken,
  verifyToken.isAdmin,
  FooterQueryController.deleteQuery
);

// check if email is already registered for the newsletter
router.post("/check-email", UniqueAccountController.checkEmail);

// send otp to the email during account creation
router.post("/send-otp", UniqueAccountController.sendOtp);

// Verifying the otp
router.post("/verify-otp", UniqueAccountController.verifyOtp);

// get all the blogs both provisional and published
router.get("/getblogs", BlogController.getBlogs);

// get the blog by its unique id
router.get("/getblogs/:id", BlogController.getBlogsId);

// public route to fetch the accepted blogs on the resources page
router.get("/acceptedblogs", BlogController.acceptedBlogs);

// publish the provisional blog and move it to the published blog
router.post("/acceptedblogs", BlogController.acceptedBlogsPost);

// edit the blog
router.put("/editblog/:blogId", BlogController.editBlog);

// create the blog
router.post("/createblog", BlogOpearionsController.createBlog);

// not published blog for a user
router.get("/myprovisionalblogs", BlogOpearionsController.myProvisionalBlogs);

// published blog for a user
router.get("/mypublishedblogs", BlogOpearionsController.myPublishedBlogs);

// find and display the publised blog for a user from its unique id
router.get(
  "/publicwrittenblogs/:authoruniqueid",
  BlogOpearionsController.publicilyWrittenBlogs
);

// find blogs by tag
router.get(
  "/tagspecificbloglist/:tagname",
  BlogOpearionsController.tagSpecificBlog
);

// like a blog
router.post("/api/blogs/:blogId/like", LikeBlogControllers.blogIdLike);
router.get("/api/likedblogs", LikeBlogControllers.fetchLikedBlogs);

// comment on a blog
router.post("/api/comment/:id", BlogCommentsController.apiComment);

// get all comments on a blog
router.get("/api/comment/:postId", BlogCommentsController.getCommentPostId);

// get all accounts
router.get("/allaccounts", AccountController.getAllAccounts);

router.get("/", HomeController.home);

module.exports = router;

// ! we need to create routes for the event registration
// ! we need to create routes for the event addition
