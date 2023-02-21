import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PicModal({ show, setShow, userInfo, setUserInfo }) {
  const cropperRef = useRef();
  const fileRef = useRef();
  const types = ["image/png", "image/jpeg"];
  const [src, setSrc] = useState();
  const selectImg = (e) => {
    let file = e.target.files[0];
    if (file && types.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file (jpeg or jpg)");
    }
  };
  const cropImg = useCallback(() => {
    // setNewPic(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    setUserInfo({
      ...userInfo,
      photo: cropperRef.current.cropper
        .getCroppedCanvas()
        .toDataURL("image/jpeg"),
    });
    setShow(false);
  }, [setShow, setUserInfo, userInfo]);
  return (
    <>
      {show && (
        <div className="popOvarlay">
          <div
            style={{ position: "relative", zIndex: "10", minWidth: "250px" }}
          >
            <div
              style={{
                background: "white",
                border: "1px solid",
                borderRadius: "0.5rem",
              }}
            >
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <label
                  className="btn"
                  htmlFor="browsePhoto"
                  style={{ overflow: "hidden" }}
                >
                  Select photo
                  <input
                    type="file"
                    id="browsePhoto"
                    name="browsePhoto"
                    onChange={selectImg}
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: "0",
                    }}
                    ref={fileRef}
                  />
                </label>
              </div>
              <div className="card-body p-1" style={{ padding: "0.5rem" }}>
                <div
                  style={{
                    border: "2px dashed",
                    borderRadius: "4px",
                    width: "80%",
                    paddingTop: "80%",
                    height: "0",
                    margin: "0 auto 0.5rem auto",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {!src && (
                    <div
                      style={{
                        textAlign: "center",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="upload-msg">
                        Photo preview
                        <br />
                        will appear here
                      </div>
                    </div>
                  )}
                  {src && (
                    <>
                      <div
                        style={{
                          textAlign: "center",
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Cropper
                          ref={cropperRef}
                          autoCropArea={1}
                          src={src}
                          style={{ height: 200, width: 200 }}
                          guides={false}
                          aspectRatio={1 / 1}
                          type={"square"}
                          crossOrigin={"true"}
                          enableOrientation={true}
                          enableExif={true}
                          viewMode={3}
                          cropBoxMovable={false}
                          cropBoxResizable={false}
                          dragMode={"move"}
                        />
                      </div>
                    </>
                  )}
                </div>
                {src && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        className="btn2"
                        onClick={() => cropperRef.current.cropper.rotate(90)}
                      >
                        Rotate
                      </button>
                      <button onClick={cropImg} type="button" className="btn2">
                        Use Photo
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: "1",
              width: "100%",
              height: "100%",
            }}
            onClick={() => setShow(false)}
          ></div>
        </div>
      )}
    </>
  );
}
