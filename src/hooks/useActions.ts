import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { companyActions } from '../store/slices/companySlice';
import { staffActions } from '../store/slices/staffSlice';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...companyActions,
      ...staffActions,
    },
    dispatch,
  );
};
