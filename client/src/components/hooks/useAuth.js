import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../modules/user';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(check());
    }
  }, [dispatch, user]);

  return user;
};

export default useAuth;
