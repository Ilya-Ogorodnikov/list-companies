import { combineReducers } from '@reduxjs/toolkit';
import { companyReducer } from './companySlice';
import { staffReducer } from './staffSlice';

export const rootReducer = combineReducers({
  companyReducer,
  staffReducer,
});
