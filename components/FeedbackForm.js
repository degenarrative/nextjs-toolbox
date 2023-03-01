import styles from './FeedbackForm.module.css'
import { useState } from 'react';
import { compute } from 'ephemeris-moshier';

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const birthDate = new Date(formData.get('birthdate'));
    const birthTime = formData.get('birthtime');
    const birthDateTime = new Date(`${birthDate.toISOString().substring(0, 10)}T${birthTime}:00`);
    const birthLocation = formData.get('birthplace');

    const birthDateTimeUTC = new Date(birthDateTime.getTime() - (birthDateTime.getTimezoneOffset() * 60000));

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch('/api/astrology', {
        method: 'POST',
        body: JSON.stringify({ datetime: birthDateTimeUTC, location: birthLocation }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        const report = compute(data.lon, data.lat, data.tz, birthDateTimeUTC);
        setSuccess(true);
        console.log(report); // replace with your own report generation code
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={styles.form}
      name="feedback"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="feedback" />
      <p className={styles.hidden}>
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>

      <label htmlFor="name">Name</label>
      <input id="name" className={styles['form-field']} type="text" name="name" />

      <label htmlFor="email">Email</label>
      <input id="email" className={styles['form-field']} type="email" name="email" required />

      <label htmlFor="birthdate">Birth Date</label>
      <input id="birthdate" className={styles['form-field']} type="date" name="birthdate" required />

      <label htmlFor="birthtime">Birth Time</label>
      <input id="birthtime" className={styles['form-field']} type="time" name="birthtime" required />

      <label htmlFor="birthplace">Birth Place</label>
      <input id="birthplace" className={styles['form-field']} type="text" name="birthplace" required />

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>

      {error && <p className={styles.error}>An error occurred. Please try again.</p>}
      {success && <p className={styles.success}>Thank you for your feedback!</p>}
    </form>
  )
}

