import { useSelector } from "react-redux";
import LoginSignup from "./user-credentials/LoginSignup";

const PopupSignInUp = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) return;

  return (
    <div
      className="sign_up_modal modal fade bd-example-modal-lg"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <LoginSignup />
      </div>
    </div>
  );
};

export default PopupSignInUp;
