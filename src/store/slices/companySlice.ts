import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fakeCompany } from '../../constants/fakeData';
import { ICompany, ICompanyState, IStaff } from './../../models/index';

const initialState: ICompanyState = {
  companies: [],
  selectedRows: [],
};

const companySlice = createSlice({
  name: 'companySlice',
  initialState,
  reducers: {
    getAllcomanies(state, action: PayloadAction<ICompany[]>) {
      state.companies = action.payload;
    },

    addCompany(state, action: PayloadAction<Omit<ICompany, 'id' | 'staff'>>) {
      state.companies.splice(1, 0, {
        id: fakeCompany.length + 1,
        companyName: action.payload.companyName,
        address: action.payload.address,
        staff: [],
      });
    },

    editCompany(state, action: PayloadAction<Omit<ICompany, 'staff'>>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload.id) {
          return {
            ...company,
            companyName: action.payload.companyName,
            address: action.payload.address,
          };
        }
        return company;
      });
    },

    selectedRow(state, action: PayloadAction<number>) {
      if (
        state.selectedRows.some(
          (companyId: number) => companyId === action.payload,
        )
      ) {
        state.selectedRows = state.selectedRows.filter(
          companyId => companyId !== action.payload,
        );
        return;
      }

      state.selectedRows.push(action.payload);
    },

    selectedAll(state) {
      if (state.companies.length - 1 === state.selectedRows.length) {
        state.selectedRows = [];
        return;
      }

      state.selectedRows = state.companies
        .slice(1, state.companies.length)
        .map(company => company.id);
    },

    deleteRow(state, action: PayloadAction<number>) {
      state.companies = state.companies.filter(
        company => company.id !== action.payload,
      );
    },

    deleteSelectedRows(state) {
      state.companies = state.companies.filter(
        company => !state.selectedRows.includes(company.id),
      );
    },

    incrementStaff(state, action: PayloadAction<number>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload) {
          return {
            ...company,
            staff: [...(company?.staff || []), {} as IStaff],
          };
        }
        return company;
      });
    },

    decrementStaff(state, action: PayloadAction<number>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload) {
          return {
            ...company,
            staff: company.staff?.slice(0, company.staff.length - 1),
          };
        }
        return company;
      });
    },
  },
});

export const companyReducer = companySlice.reducer;
export const companyActions = companySlice.actions;
