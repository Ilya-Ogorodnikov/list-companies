import { FC, useState } from 'react';
import { Modal } from '..';
import { useActions } from '../../hooks';
import { IModalCompanyEditProps } from '../../models';

const ModalEdit: FC<IModalCompanyEditProps> = ({ closeModal, company }) => {
  const [currentCompany, setCurrentCompany] = useState({
    id: company.id,
    companyName: company.companyName,
    address: company.address,
  });

  const { editCompany } = useActions();

  const handleEdit = () => {
    editCompany({
      id: currentCompany.id,
      companyName: currentCompany.companyName,
      address: currentCompany.address,
    });

    clearStateCurrentCompany();
    closeModal();
  };

  const clearStateCurrentCompany = () =>
    setCurrentCompany({
      id: 0,
      companyName: '',
      address: '',
    });

  return (
    <Modal
      title="Редактирование компании"
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
            <label>Название компании:</label>
            <input
              value={currentCompany.companyName}
              onChange={event =>
                setCurrentCompany(prev => ({
                  ...prev,
                  companyName: event.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Адрес:</label>
            <input
              value={currentCompany.address}
              onChange={event =>
                setCurrentCompany(prev => ({
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

export default ModalEdit;
