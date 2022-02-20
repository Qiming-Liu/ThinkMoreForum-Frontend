import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/actions/postAction';

const Redux = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const pStyle = {
    tableLayout: 'fixed',
    wordWrap: 'break-word',
    wordBreak: 'normal',
    overflow: 'hidden',
  };

  return (
    <ul>
      {posts &&
        posts.map((post) => {
          return (
            <li key={post}>
              <p style={pStyle}>{post}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default Redux;
