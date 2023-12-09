const express = require("express");
const router = express.Router();
const HomeController = require("../Controllers/HomeController");
const BlogController = require("../Controllers/BlogController")
const UniqueAccountController = require("../Controllers/UniqueAccountController")
const AccountController = require("../Controllers/AccountControllers")
const FooterQueryController = require("../Controllers/FooterQueryController")
const BlogOpearionsController = require("../Controllers/BlogOperationsController")
const LikeBlogControllers = require("../Controllers/LikeBlogController")
const BlogCommentsController = require("../Controllers/BlogCommentsController")

router.post("/signup", AccountController.signup)
router.post("/login", AccountController.login)
router.get("/dashboard", AccountController.dashboard)
router.get("/fetchprofile", AccountController.fetchProfile)
router.put("/editprofile", AccountController.editProfile)
router.post("/forgotpwd", AccountController.forgotPwd)
router.post("/verifyotpresetpwd", AccountController.verifyOrpResetPwd)
router.post("/deleteaccount",AccountController.deleteAccount)
router.put("/changingpwd", AccountController.changingPwd)
router.get("/publicprofile/:authoruniqueid", AccountController.getPublicProfile)

router.post("/getUsers", FooterQueryController.getUsers)
router.post("/getnewsletters", FooterQueryController.getNewsletters)
router.post("/createUser", FooterQueryController.createUser)
router.post("/sendquery", FooterQueryController.sendQuery)

router.post("/check-email", UniqueAccountController.checkEmail )
router.post("/send-otp", UniqueAccountController.sendOtp )
router.post("/verify-otp", UniqueAccountController.verifyOtp )

router.get("/getblogs", BlogController.getBlogs)
router.get("/getblogs/:id", BlogController.getBlogsId)
router.get("/acceptedblogs", BlogController.acceptedBlogs)
router.post("/acceptedblogs", BlogController.acceptedBlogsPost)
router.put("/editblog/:blogId", BlogController.editBlog)


router.post("/createblog",BlogOpearionsController.createBlog)
router.get("/myprovisionalblogs", BlogOpearionsController.myProvisionalBlogs)
router.get("/mypublishedblogs", BlogOpearionsController.myPublishedBlogs)
router.get("/publicwrittenblogs/:authoruniqueid", BlogOpearionsController.publicilyWrittenBlogs)
router.get("/tagspecificbloglist/:tagname", BlogOpearionsController.tagSpecificBlog)

router.post("/api/blogs/:blogId/like", LikeBlogControllers.blogIdLike)
router.get("/api/likedblogs", LikeBlogControllers.fetchLikedBlogs)


router.post("/api/comment/:id", BlogCommentsController.apiComment)
router.get("/api/comment/:postId", BlogCommentsController.getCommentPostId)

// get all accounts
router.get("/allaccounts", AccountController.getAllAccounts)

router.get("/", HomeController.home);

module.exports = router;