import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import styles from './confirm-action-modal.module.scss';

function ConfirmAction(props) {
    const { title, text, onCancel, onConfirm} = props;

    return (
      <Modal show onHide={onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.text}>
            {text}
          </div>
          <div className={styles.actions}>
            <Button size="lg" variant="primary" onClick={onConfirm}>Confirm</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
}

ConfirmAction.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ConfirmAction.defaultProps = {
  title: 'Confirm Action',
  text: 'Press confirm to proceed',
};

export default ConfirmAction;
