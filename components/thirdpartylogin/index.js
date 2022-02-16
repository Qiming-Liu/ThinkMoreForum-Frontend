import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const LoginFBGoogle = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as email {session.users.email} <br />
        Signed in as username {session.users.name} <br />
        <button type="submit" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button type="submit" onClick={() => signIn()}>
        Sign in with Third Party Provider
      </button>
    </>
  );
};

export default LoginFBGoogle;
