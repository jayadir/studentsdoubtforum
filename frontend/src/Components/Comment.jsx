import React from 'react';

const CommentComponent = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.comment}</p>
      <p>Commented by: {comment.commentedBy}</p>
      <p>Commented at: {new Date(comment.commentedAt).toLocaleString()}</p>
    </div>
  );
};

export default CommentComponent;
