const express = require("express");
const { userAuth } = require("../middleware/authMiddleware");
const {
  getAllBlogs,
  getBlogsUser,
  createBlog,
  getOneBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogsController");

const router = express.Router();

router.post("/create-blog", userAuth, createBlog);
router.get("/get-blogs", userAuth, getAllBlogs);
router.get("/get-blogs-user", userAuth, getBlogsUser);
router.get("/get-blog/:id", userAuth, getOneBlog);
router.post("/update-blog/:id", userAuth, updateBlog);
router.delete("/delete-blog/:id", userAuth, deleteBlog);

module.exports = router;
