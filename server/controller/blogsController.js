const db = require("../database");
const jwt = require("jsonwebtoken");

exports.createBlog = async (req, res) => {
  const accessToken = req.cookies.token;
  const { id } = jwt.verify(accessToken, process.env.SECRET);
  try {
    const { title, description } = req.body;
    const results = await db.query(
      "INSERT INTO blogs (user_id, title, description) VALUES ($1, $2, $3) returning *",
      [id, title, description]
    );

    res.status(200).json({
      success: true,
      message: "Blogs Created!",
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await db.query(
      "SELECT blogs.blog_id, blogs.title, blogs.description, blogs.createdAt, users.username as pembuat FROM blogs NATURAL JOIN users"
    );
    res.status(200).json({
      success: true,
      message: "Success call blogs.",
      data: blogs.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getBlogsUser = async (req, res) => {
  const accessToken = req.cookies.token;
  const { id } = jwt.verify(accessToken, process.env.SECRET);
  try {
    const blogs = await db.query(
      "SELECT blogs.blog_id, blogs.title, blogs.description, blogs.createdAt, users.username as pembuat FROM blogs NATURAL JOIN users WHERE user_id = $1",
      [id]
    );
    res.status(200).json({
      success: true,
      message: "Success call blogs.",
      data: blogs.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getOneBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db.query(
      "SELECT blogs.blog_id, blogs.title, blogs.description, blogs.createdAt, users.username as pembuat FROM blogs NATURAL JOIN users WHERE blog_id = $1 returning *",
      [id]
    );
    res.status(200).json({
      success: true,
      message: "data berhasil dipanggil!",
      data: blog.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const blog = await db.query(
      "UPDATE blogs SET title = $1, description = $2 WHERE blog_id = $3 returning *",
      [title, description, id]
    );
    res.status(200).json({
      success: true,
      message: "Success Update Data",
      data: blog.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db.query("DELETE FROM blogs WHERE blog_id = $1", [id]);
    res.status(200).json({
      success: true,
      message: "Success delete data.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
