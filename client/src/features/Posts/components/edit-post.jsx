import { Box, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function EditPost({ authorId, myId, postId, pathname }) {
  const isEdit = authorId === myId && pathname !== '/posts';
  return (
    <Box>
      {isEdit ? (
        <Link to={`/posts/update/${postId}`}>
          <IconButton
            size="small"
            sx={{
              fontSize: '1.1rem',
              color: 'common.grey_white',
              transition: 'color 0.3s ease',
              '&:hover': { color: 'common.dark_blue' },
            }}
          >
            <i className="bx bx-edit-alt" title="edit post"></i>
          </IconButton>
        </Link>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default EditPost;
