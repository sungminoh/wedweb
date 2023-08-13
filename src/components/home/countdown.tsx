import React from 'react'
const { useState, useEffect } = React;

type Props = {
  targetDate: Date;
};
const TimeCountDown = ({ targetDate }: Props) => {
  const [countdownDate, setCountdownDate] = useState<number>(targetDate.getTime());
  const [state, setState] = useState({
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      let distanceToDate = countdownDate - currentTime;
      let sign = "";
      if (distanceToDate < 0) {
        distanceToDate *= -1;
        sign = "+";
      }

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      let daysStr = `${sign}${days}`;
      let hoursStr = hours.toString();
      let minutesStr = minutes.toString();
      let secondsStr = seconds.toString();
      if (numbersToAddZeroTo.includes(hours)) {
        hoursStr = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutesStr = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        secondsStr = `0${seconds}`;
      }

      setState({ days: daysStr, hours: hoursStr, minutes: minutesStr, seconds: secondsStr });
    }
  };

  return (
    <div className="react-countdown">
      <div className='time-section'>
        <div className='time'>{state.days || '0'}</div>
        <small className="time-text">Days</small>
      </div>
      <div className='time-section'>
        <div className='time'>{state.hours || '00'}</div>
        <small className="time-text">Hours</small>
      </div>
      <div className='time-section'>
        <div className='time'>{state.minutes || '00'}</div>
        <small className="time-text">Min</small>
      </div>
      <div className='time-section'>
        <div className='time'>{state.seconds || '00'}</div>
        <small className="time-text">Sec</small>
      </div>
    </div>
  );
};

export default TimeCountDown;
