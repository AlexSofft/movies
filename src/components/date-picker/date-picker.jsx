import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import ReactDatePicker from 'react-datepicker';
import { Calendar3 } from 'react-bootstrap-icons';
 
import styles from './date-picker.module.scss';
import "react-datepicker/dist/react-datepicker.css";

function DatePicker(props) {
  const { date, onChange, ...other } = props;

  return (
    <div className={styles.container}>
    <ReactDatePicker
      className={styles.datePicker}
      wrapperClassName={styles.wrapper}
      selected={date}
      onChange={onChange}
      onChangeRaw={event => event.preventDefault()}
      {...omit(other, ['date', 'onChange'])}
    />
    <Calendar3 className={styles.icon} />
    </div>
  );
}

DatePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  date: undefined,
};

export default DatePicker;
