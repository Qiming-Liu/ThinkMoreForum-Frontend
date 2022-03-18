import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useMemo,
} from 'react';
import hotToast from '../../utils/hotToast';
import {
  putCategoryPinPostById as changeCategoryPinPost,
  putCategoryPinPostNull as deleteCategoryPinPost,
} from '../../services/Category';
import { getCategoryByTitle } from '../../services/Public';

const PinPostContext = createContext();

export const PinPostContextProvider = ({ children, thisPost }) => {
  const [pinPost, setPinPost] = useState();
  const [isPinned, setIsPinned] = useState();
  useEffect(() => {
    const initializePinPost = async () => {
      const { data: responsedata } = await getCategoryByTitle(
        thisPost.category.title,
      );
      setPinPost(responsedata.pinPost);
      setIsPinned(
        responsedata.pinPost !== null &&
          responsedata.pinPost.id === thisPost.id,
      );
    };
    initializePinPost();
  }, [thisPost.category.title, thisPost.id]);

  const handlePinPost = async () => {
    try {
      await changeCategoryPinPost(thisPost.category.id, thisPost.id);
    } catch (err) {
      hotToast('error', err.message);
    }
  };

  const handleUnpinPost = async () => {
    try {
      deleteCategoryPinPost(thisPost.category.id);
    } catch (err) {
      hotToast('error', err.message);
    }
  };

  const completePinPost = () => {
    if (pinPost === null) {
      setIsPinned((prev) => !prev);
      handlePinPost();
    } else {
      hotToast(
        'error',
        `${pinPost.title} is already pinned in ${thisPost.category.title}, unpin it First.`,
      );
    }
  };

  const completeUnpinPost = () => {
    setIsPinned((prev) => !prev);
    handleUnpinPost();
  };

  const value = useMemo(
    () => ({
      setPinPost,
      isPinned,
      setIsPinned,
      completePinPost,
      completeUnpinPost,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPinned],
  );

  return (
    <PinPostContext.Provider value={value}>{children}</PinPostContext.Provider>
  );
};

export const usePinPostContext = () => {
  return useContext(PinPostContext);
};
