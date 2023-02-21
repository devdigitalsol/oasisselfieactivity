import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import templateImg from "./assets/template.png";
import { Context } from "./context";
import html2canvas from "html2canvas";
const Selfie = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const downloadImage = () => {
    window.scrollTo(0, 0);
    html2canvas(document.getElementById("fullImg"), {
      allowTaint: true,
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      onrendered: function (canvas) {
        document.body.appendChild(canvas);
        window.scrollTo(0, 0);
      },
    })
      .then((canvas) => {
        var myImage = canvas.toDataURL("image/jpeg", 1);
        const link = document.createElement("a");
        link.href = myImage;
        link.target = "_blank";
        link.setAttribute("download", "image.jpeg");
        document.body.appendChild(link);
        link.click();
      })
      .catch(function (error) {
        console.log(error);
        alert("oops, something went wrong!", error);
      });
  };
  return (
    <div className="screen screen-selfie">
      <div id="fullImg" className="fullImg">
        <div className="userImg">
          <img src={user?.photo} alt="photouser" />
        </div>
        <div className="userContent">
          <div className="userName">{user?.name}</div>
          <div className="userPlace">{user?.place}</div>
        </div>
        <img src={templateImg} alt="template" />
      </div>
      <button className="btn2" onClick={downloadImage}>
        Download
      </button>
    </div>
  );
};
export default Selfie;
