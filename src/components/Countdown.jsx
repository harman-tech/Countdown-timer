import React, { useEffect } from 'react';

const Countdown = ({ date }) => {

  const [countDown, setCountDown] = React.useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  let interval;

  useEffect(() => {
    // update every second
    interval = setInterval(() => {
      const dateNew = calculateCountdown(date);
      dateNew ? setCountDown(dateNew) : stop();
    }, 1000);
    return () => {
      stop();
    }
  }, [])



  const calculateCountdown = (endDate) => {
    const timeLeft = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = new Date(endDate) - now;

    // Time calculations for days, hours, minutes and seconds
    timeLeft.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    timeLeft.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    timeLeft.min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    timeLeft.sec = Math.floor((distance % (1000 * 60)) / 1000);

    return timeLeft;
  }

  const stop = () => {
    clearInterval(interval);
  }

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  return (
    <div className="Countdown" id="clock">
      <p class="date">{new Date(date).toDateString()}</p>
      <br />
      <span className="countdown-col time">
        <strong>{addLeadingZeros(countDown.days)}</strong>
        <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
      </span>

      <span className="countdown-col time">
        <strong>{addLeadingZeros(countDown.hours)}</strong>
        <span>Hours</span>
      </span>

      <span className="countdown-col time">
        <strong>{addLeadingZeros(countDown.min)}</strong>
        <span>Min</span>
      </span>

      <span className="countdown-col time">
        <strong>{addLeadingZeros(countDown.sec)}</strong>
        <span>Sec</span>
      </span>
    </div>
  );
}

export default Countdown;
