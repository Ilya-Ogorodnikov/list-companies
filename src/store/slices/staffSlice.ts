import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStaff, IStaffState } from '../../models';

const initialState: IStaffState = {
  companyId: 0,
  staff: [],
  selectedRows: [],
};

const staffSlice = createSlice({
  name: 'staffSlice',
  initialState,
  reducers: {
    getStaffCompany(
      state,
      action: PayloadAction<{ staff: IStaff[]; id: number }>,
    ) {
      state.staff = action.payload.staff;
      state.companyId = action.payload.id;
    },

    addWorker(state, action: PayloadAction<Omit<IStaff, 'id'>>) {
      if (state.staff.length === 0) {
        state.staff[0] = {
          id: 0,
          firstName: 'Имя',
          lastName: 'Фамилия',
          post: 'Должность',
        };
      }

      state.staff.splice(1, 0, {
        id: state.staff.length + 1,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        post: action.payload.post,
      });
    },

    editWorker(state, action: PayloadAction<IStaff>) {
      state.staff = state.staff.map(worker => {
        if (worker.id === action.payload.id) {
          return {
            ...worker,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            post: action.payload.post,
          };
        }
        return worker;
      });
    },

    selectedRowWorker(state, action: PayloadAction<number>) {
      if (
        state.selectedRows.some(
          (workerId: number) => workerId === action.payload,
        )
      ) {
        state.selectedRows = state.selectedRows.filter(
          workerId => workerId !== action.payload,
        );
        return;
      }

      state.selectedRows.push(action.payload);
    },

    selectedAllWorkers(state) {
      if (state.staff.length - 1 === state.selectedRows.length) {
        state.selectedRows = [];
        return;
      }

      state.selectedRows = state.staff
        .slice(1, state.staff.length)
        .map(worker => worker.id);
    },

    deleteRowWorker(state, action: PayloadAction<number>) {
      state.staff = state.staff.filter(worker => worker.id !== action.payload);
    },

    deleteSelectedRowsWorkers(state) {
      state.staff = state.staff.filter(
        worker => !state.selectedRows.includes(worker.id),
      );
    },
  },
});

export const staffReducer = staffSlice.reducer;
export const staffActions = staffSlice.actions;
