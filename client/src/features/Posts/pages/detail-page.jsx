import { Container, Stack } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from 'hooks/useAuth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostComments from '../components/post-comments';
import PostDetail from '../components/post-detail';
import { commentPost, fetchPostById } from '../posts-thunk';

function DetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const { id } = useParams();
  const { postDetail } = useSelector((state) => state.posts);
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchPostById(id));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, id]);

  const handleCommentPost = async (data) => {
    if (!isAuth) navigate('/signin');
    try {
      const value = data.comment.trim();
      const userId = profile._id;
      const postId = postDetail._id;

      if (!userId || value.length <= 0 || !postId) return;
      await dispatch(commentPost({ userId, postId, text: value }));
    } catch (error) {
      console.log(error);
    }
  };

  if (Object.keys(postDetail).length === 0) return 'loading...';

  return (
    <Box mt={6}>
      <Container sx={{ color: 'common.grey_white' }}>
        <Stack spacing={4}>
          <PostDetail post={postDetail} authorId={postDetail.author._id} profile={profile} />
          <PostComments
            comments={postDetail?.comments}
            onSubmit={handleCommentPost}
            authorId={postDetail.author._id}
            profile={profile}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default DetailPage;
