import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/actions/postAction';
import LoginDialog from '../components/Logins/LoginDialog';
import Login from '../components/Logins';
import CategoryExample1 from '../components/Categroy/example1';
import CategoryExample2 from '../components/Categroy/example2';

const Index = () => {
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
    <>

      <CategoryExample1 />
      <CategoryExample2 />
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
      <LoginDialog>
        <Login />
      </LoginDialog>
    </>
  );
};

export default Index;
