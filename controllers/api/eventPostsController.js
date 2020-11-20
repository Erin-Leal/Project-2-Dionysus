const db = require("../../models");
const router = require("express").Router();

/**
 * Post - Read All
 */
router.get("/", (req, res) => {
  db.EventPost.findAll(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Post - Read One
 */
router.get("/:id", (req, res) => {
  db.EventPost.findByPk(req.params.id)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Post - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post("/", (req, res) => {
  db.EventPost.create({
    UserId: req.user.id,
    ...req.body,
  })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Post - Update
 */
router.put("/:id", (req, res) => {
  db.EventPost.update(req.body, { where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

/**
 * Post - Delete
 */
router.delete("/:id", (req, res) => {
  db.EventPost.destroy({ where: { id: req.params.id } })
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
