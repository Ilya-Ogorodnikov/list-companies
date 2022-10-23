import { FC, useState } from 'react';
import { Button, ModalAddWorker, ModalEditWorker } from '..';
import { useActions, useTypedSelector } from '../../hooks';
import { IStaff } from '../../models';
import { rowHeight, visibleRows } from '../../constants';

const StaffTable: FC = () => {
  const [start, setStart] = useState(0);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [editWorker, setEditWorker] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    post: '',
  });

  const { staff, selectedRows, companyId } = useTypedSelector(
    state => state.staffReducer,
  );

  const {
    selectedRowWorker,
    selectedAllWorkers,
    deleteRowWorker,
    deleteSelectedRowsWorkers,
    decrementStaff,
  } = useActions();

  const onScroll = (e: React.UIEvent<HTMLElement>) =>
    setStart(Math.floor(e.currentTarget.scrollTop / rowHeight));

  const getTopHeight = () => {
    return rowHeight * start;
  };

  const getBottomHeight = () => {
    return staff.length === 1
      ? 0
      : rowHeight * (staff.length - (start + visibleRows));
  };

  const handleDelete = (id: number) => {
    deleteRowWorker(id);
    decrementStaff(companyId);
  };

  const handleDeleteRows = () => {
    deleteSelectedRowsWorkers();
    selectedRows.forEach(() => decrementStaff(companyId));
  };

  const handleEdit = (worker: IStaff) => {
    setEditWorker({
      id: worker.id,
      firstName: worker.firstName,
      lastName: worker.lastName,
      post: worker.post,
    });

    setIsOpenModalEdit(true);
  };

  return (
    <div className="box">
      <div className="table-header">
        <h3>Список сотрудников выбранной компании</h3>
        {companyId !== 0 && (
          <>
            <Button onClick={() => setIsOpenModalAdd(true)} color="primary">
              Добавить
            </Button>
            <Button onClick={() => selectedAllWorkers()} color="primary">
              Выделить все
            </Button>
            <Button onClick={() => handleDeleteRows()} color="danger">
              Удалить выбранные
            </Button>
          </>
        )}
      </div>
      {staff.length === 0 ? (
        <h3 className="box-empty">Список сотрудников пуст</h3>
      ) : (
        <div
          style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }}
          onScroll={onScroll}
        >
          <div style={{ height: getTopHeight() }}></div>
          <table className="table">
            <tbody>
              {staff.slice(start, start + visibleRows).map((worker, index) => (
                <tr
                  key={start + index}
                  style={{ height: rowHeight }}
                  className={
                    selectedRows.some((item: number) => item === worker.id)
                      ? 'selected'
                      : ''
                  }
                >
                  <td>
                    {worker.id !== 0 && (
                      <input
                        type="checkbox"
                        checked={selectedRows.some(
                          (item: number) => item === worker.id,
                        )}
                        onChange={() => selectedRowWorker(worker.id)}
                      />
                    )}
                  </td>
                  <td>{worker.lastName}</td>
                  <td>{worker.firstName}</td>
                  <td>{worker.post}</td>
                  <td>
                    {worker.id !== 0 && (
                      <div className="actions">
                        <i
                          className="uil uil-edit-alt scale"
                          onClick={() => handleEdit(worker)}
                        />
                        <i
                          className="uil uil-trash-alt scale"
                          onClick={() => handleDelete(worker.id)}
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
        <ModalAddWorker closeModal={() => setIsOpenModalAdd(false)} />
      )}
      {isOpenModalEdit && (
        <ModalEditWorker
          closeModal={() => setIsOpenModalEdit(false)}
          worker={editWorker}
        />
      )}
    </div>
  );
};

export default StaffTable;
