import { FC } from 'react';
import { IModalProps } from '../../../models';
import './style.scss';

const Modal: FC<IModalProps> = ({
  children,
  title,
  setOpenModal,
  titleButtonChange,
  onClick,
}) => (
  <div className="modal-wrapper">
    <div className="modal">
      <div className="modal__title">{title}</div>
      <div>{children}</div>
      <div className="modal__buttons-group">
        <button className="modal__cancel" type="button" onClick={setOpenModal}>
          Отмена
        </button>
        <button className="modal__save" type="button" onClick={onClick}>
          {titleButtonChange}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
