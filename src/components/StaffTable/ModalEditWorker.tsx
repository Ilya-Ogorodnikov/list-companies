import React, { FC, useState } from 'react';
import { Modal } from '..';
import { useActions } from '../../hooks';
import { IModalEditWorkerProps, IStaff } from '../../models';

const ModalEditWorker: FC<IModalEditWorkerProps> = ({ closeModal, worker }) => {
  const [currentWorker, setCurrentWorker] = useState<IStaff>({
    id: worker.id,
    firstName: worker.firstName,
    lastName: worker.lastName,
    post: worker.post,
  });

  const { editWorker } = useActions();

  const handleEdit = () => {
    editWorker({
      id: currentWorker.id,
      firstName: currentWorker.firstName,
      lastName: currentWorker.lastName,
      post: currentWorker.post,
    });

    clearStateCurrentCompany();
    closeModal();
  };

  const clearStateCurrentCompany = () =>
    setCurrentWorker({
      id: 0,
      firstName: '',
      lastName: '',
      post: '',
    });

  return (
    <Modal
      title="Редактирование сотрудника"
      titleButtonChange="Сохранить"
      onClick={() => handleEdit()}
      setOpenModal={() => {
        clearStateCurrentCompany();
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
              value={currentWorker.firstName}
              onChange={event =>
                setCurrentWorker(prev => ({
                  ...prev,
                  firstName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Фамилия сотрудника</label>
            <input
              value={currentWorker.lastName}
              onChange={event =>
                setCurrentWorker(prev => ({
                  ...prev,
                  lastName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Должность сотрудника</label>
            <input
              value={currentWorker.post}
              onChange={event =>
                setCurrentWorker(prev => ({
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

export default ModalEditWorker;
