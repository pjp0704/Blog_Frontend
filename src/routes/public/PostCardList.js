import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_POST_REQUEST } from '../../redux/types';
import Helmet from 'react-helmet';
import { Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/Spinner';
import PostCard from '../../components/post/PostCard';

const PostCardList = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_POST_REQUEST });
  }, [dispatch]);

  return (
    <>
      <Helmet title="Home" />
      <Row>
        {posts
          ? Array.isArray(posts)
            ? posts.map(({ _id, title, fileUrl, comments, views }) => {
                return (
                  <PostCard
                    id={_id}
                    title={title}
                    fileUrl={fileUrl}
                    comments={comments}
                    views={views}
                  />
                );
              })
            : null
          : GrowingSpinner}
      </Row>
    </>
  );
};

export default PostCardList;
