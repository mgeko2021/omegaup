import React from "react";
import style from "./QRModal.module.scss";

const QRModal = ({ setModal }) => {
  return (
    <div className={style.o_main_container}>
      <div className={style.o_modal}>
        <h1>Descarga <strong style={{color: '#fc8330'}}>PEL en tu celular</strong></h1>
        <div className={style.o_qr_container}>
          <div className={style.o_qr}>
            <img src="/img/qr-android.jpg" alt="" />
            <h3 className={style.o_qr_body}>
              Descarga la App para sistema operativo Android
            </h3>
            <img src="/img/WEB_06-LOGO1.png" alt="Google play" />
          </div>

          <div className={style.o_qr}>
            <img src="/img/qr-ios.jpg" alt="" />
            <h3 className={style.o_qr_body}>
              Descarga la App para sistema operativo IOS
            </h3>
            <img src="/img/WEB_06-LOGO2.png" alt="Apple store" />
          </div>
        </div>
        <button className={style.o_close_btn} onClick={() => setModal(false)}>
          <img src="/img/close.svg" alt="close" />
        </button>
      </div>
    </div>
  );
};

export default QRModal;
