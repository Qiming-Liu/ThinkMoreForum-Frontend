import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { thirdpartylogin } from '../../services/Public';
import loginAction from '../../store/actions/httpAction';
import hotToast from '../../utils/hotToast';

const LoginFacebook = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const handleSubmit = useMemo(() => {
    if (session) {
      router.replace('/');
      const { user, provider, providerAccountId } = session;
      thirdpartylogin(
        {
          oauthType: provider,
          openid: providerAccountId,
        },
        user.email,
        user.name,
      ).then(() => {
        hotToast('success', 'Facebook Login Success');
        dispatch(
          loginAction(
            user.email,
            providerAccountId,
            () => {},
            (fail) => {
              if (fail && fail.response && fail.response.status === 403) {
                hotToast('error', 'Invalid Email or Password');
              } else {
                hotToast('error', `Something wrong ${fail}`);
              }
            },
          ),
        );
      });
    }
  }, [dispatch, router, session]);

  return <div>{handleSubmit}</div>;
};

export default LoginFacebook;
