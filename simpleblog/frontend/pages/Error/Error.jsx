import { useRouteError, useNavigate } from "react-router-dom";
// import NextButton from "../../components/NextButton/NextButton";
import style from './Error.module.css';

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className={ style.errorContainer }>
      <h1 className={ style.errorTitle }>Oops! 🥺</h1>
      <p className={ style.errorReason }>
        <i>{error.status}: {error.statusText || error.message}</i>
      </p>
      {/* <NextButton displayText="Back To Home" /> */}
      <button
        className={ style.returnButton }
        onClick={() => { navigate('/') }}>
        Back To Home
      </button>
    </div>
  )
}
