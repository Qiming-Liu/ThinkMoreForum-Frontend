import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/actions/postAction';

const Index = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <ul>
      {posts &&
        posts.map((post) => {
          return <li key={post}>{post}</li>;
        })}
    </ul>
  );
};

export default Index;
