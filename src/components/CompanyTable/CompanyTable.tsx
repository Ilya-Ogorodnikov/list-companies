import { useEffect, FC, useState } from 'react';
import { Button, ModalAdd, ModalEdit } from '..';
import { useActions, useTypedSelector } from '../../hooks';
import { ICompany } from '../../models';
import { rowHeight, visibleRows } from '../../constants';
import { fakeCompany } from '../../constants/fakeData';
import '../../App.scss';

const CompanyTable: FC = () => {
  const [start, setStart] = useState(0);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [editCompany, setEditCompany] = useState({
    id: 0,
    companyName: '',
    address: '',
  });

  const { companies, selectedRows } = useTypedSelector(
    state => state.companyReducer,
  );

  const {
    getAllcomanies,
    selectedRow,
    selectedAll,
    deleteRow,
    deleteSelectedRows,
    getStaffCompany,
  } = useActions();

  useEffect(() => {
    getAllcomanies([...(fakeCompany as ICompany[])]);
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement>) =>
    setStart(Math.floor(e.currentTarget.scrollTop / rowHeight));

  const getTopHeight = () => {
    return rowHeight * start;
  };

  const getBottomHeight = () => {
    return companies.length === 1
      ? 0
      : rowHeight * (companies.length - (start + visibleRows));
  };

  const handleEdit = (company: ICompany) => {
    setEditCompany({
      id: company.id,
      companyName: company.companyName,
      address: company.address,
    });

    setIsOpenModalEdit(true);
  };

  const handleSelect = (company: ICompany) => {
    selectedRow(company.id);

    if (selectedRows.some(companyId => companyId === company.id)) {
      getStaffCompany({ staff: [], id: 0 });
      return;
    }

    getStaffCompany({ staff: company.staff || [], id: company.id });
  };

  return (
    <div className="box">
      <div className="table-header">
        <h3>Список компаний</h3>
        <Button onClick={() => setIsOpenModalAdd(true)} color="primary">
          Добавить
        </Button>
        <Button onClick={() => selectedAll()} color="primary">
          Выделить все
        </Button>
        <Button onClick={() => deleteSelectedRows()} color="danger">
          Удалить выбранные
        </Button>
      </div>
      {companies.length === 1 ? (
        <h3 className="box-empty">Список компаний пуст</h3>
      ) : (
        <div
          style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }}
          onScroll={onScroll}
        >
          <div style={{ height: getTopHeight() }}></div>
          <table className="table">
            <tbody>
              {companies
                .slice(start, start + visibleRows)
                .map((company, index) => (
                  <tr
                    key={start + index}
                    style={{ height: rowHeight }}
                    className={
                      selectedRows.some((item: number) => item === company.id)
                        ? 'selected'
                        : ''
                    }
                  >
                    <td>
                      {company.id !== 0 && (
                        <input
                          type="checkbox"
                          checked={selectedRows.some(
                            (item: number) => item === company.id,
                          )}
                          onChange={() => handleSelect(company)}
                        />
                      )}
                    </td>
                    <td>{company.companyName}</td>
                    <td>
                      {!company.staff
                        ? 'Количество сотрудников'
                        : company.staff.length - 1 === -1
                        ? 0
                        : company.staff.length - 1}
                    </td>
                    <td>{company.address}</td>
                    <td>
                      {company.id !== 0 && (
                        <div className="actions">
                          <i
                            className="uil uil-edit-alt scale"
                            onClick={() => handleEdit(company)}
                          />
                          <i
                            className="uil uil-trash-alt scale"
                            onClick={() => deleteRow(company.id)}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ height: getBottomHeight() }}></div>
        </div>
      )}
      {isOpenModalAdd && (
        <ModalAdd closeModal={() => setIsOpenModalAdd(false)} />
      )}
      {isOpenModalEdit && (
        <ModalEdit
          closeModal={() => setIsOpenModalEdit(false)}
          company={editCompany}
        />
      )}
    </div>
  );
};

export default CompanyTable;
