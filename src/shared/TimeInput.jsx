import styled from 'styled-components';

const TimeInput = ({ hours, minutes, onChange }) => {
  const handleHoursChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);
    if (val === '') val = '0';
    if (+val > 23) val = '23';
    onChange(+val, +minutes);
  };

  const handleMinutesChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2);
    if (val === '') val = '0';
    if (+val > 59) val = '59';
    onChange(+hours, +val);
  };

  return (
    <TimeInputContainer>
      <TimeSection>
        <TimeField
          type="text"
          value={String(hours)}
          onChange={handleHoursChange}
          maxLength={2}
        />
        <TimeLabel>ЧАСЫ</TimeLabel>
      </TimeSection>

      <TimeSection>
        <TimeField
          type="text"
          value={String(minutes)}
          onChange={handleMinutesChange}
          maxLength={2}
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