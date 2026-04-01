const postService = require('../services/posts.service');

const handleError = (res, error) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: error.message });
  }
  res.status(500).json({ success: false, message: error.message });
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    handleError(res, error);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    handleError(res, error);
  }
};

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    handleError(res, error);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    handleError(res, error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
