import { useState, FC } from 'react';
import { Modal } from '..';
import { useActions } from '../../hooks';
import { IModalAddProps } from '../../models';

const ModalAdd: FC<IModalAddProps> = ({ closeModal }) => {
  const [newCompany, setNewCompany] = useState({
    title: '',
    address: '',
  });

  const { addCompany } = useActions();

  const clearStateNewCompany = () =>
    setNewCompany({
      title: '',
      address: '',
    });

  const handleAddCompany = () => {
    addCompany({
      companyName: newCompany.title,
      address: newCompany.address,
    });

    clearStateNewCompany();
    closeModal();
  };

  return (
    <Modal
      title="Добавление компании"
      titleButtonChange="Добавить"
      onClick={() => handleAddCompany()}
      setOpenModal={() => {
        clearStateNewCompany();
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
            <label>Название компании:</label>
            <input
              value={newCompany.title}
              onChange={event =>
                setNewCompany(prev => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Адрес:</label>
            <input
              value={newCompany.address}
              onChange={event =>
                setNewCompany(prev => ({
                  ...prev,
                  address: event.target.value,
                }))
              }
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAdd;
