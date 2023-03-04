import { X } from "phosphor-react";
import styles from "./Modal.module.scss";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  className?: string;
  title: string;
};

const Modal = ({ setIsOpen, children, className, title }: Props) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} onClick={handleModalClick}>
      <div className={`${styles.modal} ${className}`}>
        <div className={styles.head}>
          <p className={styles.title}>{title}</p>
          <button className={styles.close} onClick={handleModalClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
