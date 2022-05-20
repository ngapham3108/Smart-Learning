const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

// @route GET /api/posts/
// @desc GET Posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username',
        ]);
        return res.json({
            success: true,
            posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

// @route POST /api/posts/
// @desc Create Post
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Missing Title',
        });
    }

    try {
        const newPost = new Post({
            title,
            description: description || '',
            url: url
                ? url.startsWith('https://')
                    ? url
                    : `https://${url}`
                : '',
            status: status || 'TO LEARN',
            user: req.userId,
        });

        await newPost.save();
        return res.json({
            success: true,
            message: 'Create Post successfully',
            post: newPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

// @route PUT /api/posts/
// @desc Update Post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Missing Title',
        });
    }

    try {
        let updatePost = {
            title,
            description: description || '',
            url: url
                ? url.startsWith('https://')
                    ? url
                    : `https://${url}`
                : '',
            status: status || 'TO LEARN',
            user: req.userId,
        };

        const updateCondition = { _id: req.params.id, user: req.userId };

        updatePost = await Post.findOneAndUpdate(updateCondition, updatePost, {
            new: true,
        });

        if (!updatePost) {
            return res.status(401).json({
                success: false,
                message: 'Failed to update Post',
            });
        }

        return res.json({
            success: true,
            message: 'Update Post successfully',
            post: updatePost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

// @route DELETE /api/posts/
// @desc Update Post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleteCondition = { _id: req.params.id, user: req.userId };

        const deletePost = await Post.findOneAndRemove(deleteCondition);

        if (!deletePost) {
            return res.status(401).json({
                success: false,
                message: 'Failed to update delete',
            });
        }

        return res.json({
            success: true,
            message: 'Delete Post successfully',
            post: deletePost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

module.exports = router;
