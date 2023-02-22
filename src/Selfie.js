import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import templateImg from "./assets/template.png";
import { Context } from "./context";
import html2canvas from "html2canvas";
import axios from "axios";
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
        uploadData(myImage);
        // const link = document.createElement("a");
        // link.href = myImage;
        // link.target = "_blank";
        // link.setAttribute("download", "image.jpeg");
        // document.body.appendChild(link);
        // link.click();
      })
      .catch(function (error) {
        console.log(error);
        alert("oops, something went wrong!", error);
      });
  };

  const uploadData = async (img) => {
    const data = {
      name: user?.name,
      place: user?.place,
      photo: img,
    };
    await axios
      .post("insert.php", data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const link = document.createElement("a");
          link.href = `https://www.oasisengagement.in/selfie/${response.data.path}`;
          link.target = "_blank";
          link.setAttribute("download", "image.jpeg");
          document.body.appendChild(link);
          link.click();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const resetPage = () => {
    window.location.reload();
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button className="btn2" onClick={resetPage}>
          Reset
        </button>
        <button className="btn2" onClick={downloadImage}>
          Download
        </button>
      </div>
    </div>
  );
};
export default Selfie;
