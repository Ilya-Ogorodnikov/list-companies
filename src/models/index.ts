export interface ICompany {
  id: number;
  companyName: string;
  address: string;
  staff: IStaff[];
}

export interface IStaff {
  id: number;
  firstName: string;
  lastName: string;
  post: string;
}

export interface ICompanyState {
  companies: ICompany[];
  selectedRows: number[];
}

export interface IStaffState {
  companyId: number;
  staff: IStaff[];
  selectedRows: number[];
}

export interface IButtonProps {
  children: React.ReactNode;
  color: 'primary' | 'danger';
  onClick: () => void;
}

export interface IModalProps {
  children: React.ReactNode;
  title: string;
  titleButtonChange: string;
  onClick: () => void;
  setOpenModal: () => void;
}

export interface IModalAddProps {
  closeModal: () => void;
}

export interface IModalCompanyEditProps extends IModalAddProps {
  company: {
    id: number;
    companyName: string;
    address: string;
  };
}

export interface IModalEditWorkerProps extends IModalAddProps {
  worker: IStaff;
}
