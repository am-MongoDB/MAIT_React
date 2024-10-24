import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { config } from '../config';

export default function RegisterParticipant({session, setName, setSessionId}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    setErrorMessage(null);
    try {
      const response = await fetch(`${config.hostURL}/session/${data.session}/participants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: data.name}),
        credentials: 'include' // Ensure cookies are sent/received
      });
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      window.localStorage.setItem(`${session}_${data.name}`, new Date());
      setSessionId(data.session);
      setName(data.name);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <div id="container">
      {session && <h2>Your host should have provided you with a session ID - enter it here</h2>}
      <form onSubmit={handleSubmit(onSubmit)} 
        className="needs-validation" noValidate>
        <div className="responsive-form">
        <div className="mb-3 med-field">
            <label htmlFor="name" className="form-label">Your name</label>
            <input
              id="name"
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { 
                required: "Please tell us your name" })}
            />
            {errors.name && <div 
              className="invalid-feedback">{errors.name.message}</div>}
          </div>          <div className="mb-3 med-field">
            <label htmlFor="id" className="form-label">Session ID</label>
            <input
              id="session"
              type="text"
              defaultValue={session}
              className={`form-control ${errors.session ? 'is-invalid' : ''}`}
              {...register('session', { 
                required: "Please provide the session ID provided by your host" })}
            />
            {errors.session && <div 
              className="invalid-feedback">{errors.session.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary btn-primary-branded" 
            disabled={isSubmitting}>
              {isSubmitting ? "Joining" : "Join session"}
          </button>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
        </div>
      </form>
    </div>
  );
}
