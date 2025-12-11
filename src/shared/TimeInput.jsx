import { useState } from 'react';
import styled from 'styled-components';

const TimeInput = () => {
  const [hours, setHours] = useState('09');
  const [minutes, setMinutes] = useState('15');

  const handleHoursChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) value = value.slice(0, 2);
    if (value === '') {
      setHours('');
      return;
    }
    if (+value > 23) value = '23';

    setHours(value);
  };    

  const handleMinutesChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) value = value.slice(0, 2);
    if (value === '') {
      setMinutes('');
      return;
    }
    if (+value > 59) value = '59';

    setMinutes(value);
  };

  const handleHoursBlur = () => {
    setHours(hours.padStart(2, '0'));
  };

  const handleMinutesBlur = () => {
    setMinutes(minutes.padStart(2, '0'));
  };

  return (
    <TimeInputContainer>
      <TimeSection>
        <TimeField
          type="text"
          value={hours}
          onChange={handleHoursChange}
          onBlur={handleHoursBlur}
          maxLength="2"
        />
        <TimeLabel>ЧАСЫ</TimeLabel>
      </TimeSection>

      <TimeSection>
        <TimeField
          type="text"
          value={minutes}
          onChange={handleMinutesChange}
          onBlur={handleMinutesBlur}
          maxLength="2"
        />
        <TimeLabel>МИНУТЫ</TimeLabel>
      </TimeSection>
    </TimeInputContainer>
  );
};

const TimeInputContainer = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 2px solid #2E3954;
  padding-bottom: 24px;
`;

const TimeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TimeField = styled.input`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  transition: all 0.3s ease;
  color: #D6DCEC;
  background: transparent;
  border: none;
  width: 40px;
`;

const TimeLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
  text-transform: uppercase;
`;

export default TimeInput;
