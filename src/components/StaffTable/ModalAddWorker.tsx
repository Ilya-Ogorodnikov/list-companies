import { useState, FC } from 'react';
import { Modal } from '..';
import { useActions, useTypedSelector } from '../../hooks';
import { IModalAddProps } from '../../models';

const ModalAddWorker: FC<IModalAddProps> = ({ closeModal }) => {
  const [newWorker, setNewworker] = useState({
    firstName: '',
    lastName: '',
    post: '',
  });

  const { companyId } = useTypedSelector(state => state.staffReducer);
  const { companies } = useTypedSelector(state => state.companyReducer);

  const { addWorker, incrementStaff } = useActions();

  const clearStateNewWorker = () =>
    setNewworker({
      firstName: '',
      lastName: '',
      post: '',
    });

  const handleAddWorker = () => {
    addWorker({
      firstName: newWorker.firstName,
      lastName: newWorker.lastName,
      post: newWorker.post,
    });

    if (
      companies.find(company => company.id === companyId)?.staff?.length === 0
    ) {
      incrementStaff(companyId);
    }

    incrementStaff(companyId);

    clearStateNewWorker();
    closeModal();
  };

  return (
    <Modal
      title="Добавление сотрудника"
      titleButtonChange="Добавить"
      onClick={() => handleAddWorker()}
      setOpenModal={() => {
        clearStateNewWorker();
        closeModal();
      }}
    >
      <form>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div>
            <label>Имя сотрудника:</label>
            <input
              value={newWorker.firstName}
              onChange={event =>
                setNewworker(prev => ({
                  ...prev,
                  firstName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Фамилия сотрудника:</label>
            <input
              value={newWorker.lastName}
              onChange={event =>
                setNewworker(prev => ({
                  ...prev,
                  lastName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Должность сотрудника:</label>
            <input
              value={newWorker.post}
              onChange={event =>
                setNewworker(prev => ({
                  ...prev,
                  post: event.target.value,
                }))
              }
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddWorker;
