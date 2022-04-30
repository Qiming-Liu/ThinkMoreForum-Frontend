import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import hotToast from '../../utils/hotToast';
import {
  putCategoryPinPostById as changeCategoryPinPost,
  putCategoryPinPostNull as deleteCategoryPinPost,
} from '../../services/Category';
import { getCategoryByTitle } from '../../services/Public';
import checkPermission from '../../utils/checkPermission';

const PinPostContext = createContext();

export const PinPostContextProvider = ({ children, thisPost }) => {
  const [pinPost, setPinPost] = useState();
  const [isPinned, setIsPinned] = useState();
  const { myDetail } = useSelector((state) => state.sign);

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
    if (checkPermission('postManagement', myDetail.role)) {
      try {
        await changeCategoryPinPost(thisPost.category.id, thisPost.id);
        setIsPinned((prev) => !prev);
        setPinPost(thisPost);
      } catch (err) {
        hotToast('error', err.message);
      }
    } else {
      hotToast('error', "You don't have post management permission.");
    }
  };

  const handleUnpinPost = async () => {
    if (checkPermission('postManagement', myDetail.role)) {
      try {
        await deleteCategoryPinPost(thisPost.category.id);
        setIsPinned((prev) => !prev);
        setPinPost(null);
      } catch (err) {
        hotToast('error', err.message);
      }
    } else {
      hotToast('error', "You don't have post management permission.");
    }
  };

  const completePinPost = () => {
    if (pinPost === null) {
      handlePinPost();
    } else {
      hotToast(
        'error',
        `${pinPost.title} is already pinned in ${thisPost.category.title}, unpin it First.`,
      );
    }
  };

  const completeUnpinPost = () => {
    handleUnpinPost();
  };

  const value = useMemo(
    () => ({
      thisPost,
      setPinPost,
      isPinned,
      setIsPinned,
      completePinPost,
      completeUnpinPost,
    }),
    [isPinned, pinPost],
  );

  return (
    <PinPostContext.Provider value={value}>{children}</PinPostContext.Provider>
  );
};

export const usePinPostContext = () => {
  return useContext(PinPostContext);
};
