const router = require("express").Router();
const { Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// get all comment
router.get("/", (req, res) => {
    Comment.findAll({})
        .then((commentData) => res.json(commentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single  comment by id
router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id,
        },
    })
        .then((commentData) => res.json(commentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route create a comment 
router.post("/", withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
            .then((commentData) => res.json(commentData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

//  update a comment 
router.put("/:id", withAuth, (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((commentData) => {
            if (!commentData) {
                res.status(404).json({ message: "No comment found with this id" });
                return;
            }
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//  delete a comment by comment id
router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((commentData) => {
            if (!commentData) {
                res.status(404).json({ message: "No comment found with this id" });
                return;
            }
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});




module.exports = router;