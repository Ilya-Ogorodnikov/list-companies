import { FC } from 'react';
import { CompanyTable, StaffTable } from './components';

const App: FC = () => (
  <div className="container">
    <CompanyTable />
    <StaffTable />
  </div>
);

export default App;
