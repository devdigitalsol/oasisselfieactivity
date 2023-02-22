import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ciplalogo from "./assets/ciplalogo.svg";
import oasislogoSmall from "./assets/oasislogoSmall.png";
import { Context } from "./context";
import PicModal from "./PicModal";
const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  useEffect(() => {
    if (user) {
      navigate("/selfie");
    }
  }, [user, navigate]);
  const [openModal, setOpenModal] = useState({});
  const initialState = {
    name: "",
    place: "",
    photo: "",
  };
  const [userInfo, setUserInfo] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cansave) {
      toast.error("Please fill all the required fields.");
      return false;
    }
    setUser(userInfo);
  };

  const cansave = [
    userInfo?.name.trim(),
    userInfo?.place.trim(),
    userInfo?.photo.trim(),
  ].every(Boolean);
  return (
    <>
      <div className="screen screen-login">
        <img src={ciplalogo} alt="ciplalogo" className="ciplalogo" />
        <img
          src={oasislogoSmall}
          alt="oasislogoSmall"
          className="oasislogoSmall"
        />
        <form onSubmit={handleSubmit} className="form-layout">
          <div className="form-group required">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>
          <div className="form-group required">
            <input
              type="text"
              className="form-control"
              placeholder="Place"
              value={userInfo.place}
              onChange={(e) =>
                setUserInfo({ ...userInfo, place: e.target.value })
              }
            />
          </div>
          {userInfo?.photo ? (
            <div className="photoFrame">
              <img src={userInfo?.photo} alt="user" />
              <div
                className="changePhoto"
                onClick={() => {
                  setOpenModal({
                    show: true,
                  });
                }}
              >
                Change Photo
              </div>
            </div>
          ) : (
            <div
              className="form-group "
              onClick={() => {
                setOpenModal({
                  show: true,
                });
              }}
            >
              <input
                type="text"
                disabled
                className="form-control"
                placeholder="Browse Photo *"
              />
            </div>
          )}

          <button type="submit" className="btn">
            Submit
          </button>
          <span className="mandatoryText">* Mandatory fields</span>
        </form>
      </div>
      <PicModal
        show={openModal.show}
        setShow={setOpenModal}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </>
  );
};
export default Login;
