const Post = require('../models/post.model');

const getAllPosts = async () => {
  return await Post.find().populate('author', 'username');
};

const getPostById = async (id) => {
  return await Post.findById(id).populate('author', 'username');
};

const createPost = async (postData) => {
  return await Post.create(postData);
};

const updatePost = async (id, updateData) => {
  const { title, content } = updateData;
  const sanitized = {};
  if (title !== undefined) sanitized.title = title;
  if (content !== undefined) sanitized.content = content;
  return await Post.findByIdAndUpdate(id, sanitized, {
    new: true,
    runValidators: true,
  }).populate('author', 'username');
};

const deletePost = async (id) => {
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
