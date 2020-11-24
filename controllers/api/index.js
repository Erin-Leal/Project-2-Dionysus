const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const eventPostRoutes = require("./eventPostsController")

// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/eventposts", eventPostRoutes);

// Export the router
module.exports = router;
