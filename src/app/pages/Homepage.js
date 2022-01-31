import React from "react";
import { Link } from "react-router-dom";
import style from "./css/Homepage.module.scss";
import "./css/HomePage.css";
import CharacteristicsItem from "../Components/CharacteristicsItem";
import CharacteristicsItem2 from "../Components/CharacteristicsItem 2";

const Homepage = () => {
  return (
    <div>
      <nav className={`${style.o_nav} ${style.o_sticky} `} /* ref={navRef} */>
        <ul className={style.o_nav_options}>
          <a
          // href="#pel"
          >
            <li>¿Que es el PEL?</li>
          </a>
          <a href="#instalacion">
            <li>Instalación</li>
          </a>
          <a className={style.anchor} href="#caracteristicas">
            <li>Características</li>
          </a>
          <a href="#beneficios">
            <li>Beneficios</li>
          </a>
        </ul>
        <Link to="/auth/login">
          <button type="button" className={style.o_login_btn}>
            Ingreso Web
          </button>
        </Link>
      </nav>

      <div
        className={`${style.o_header_container} p-5 mt-25 text-center bg-image`}
        style={{
          height: "672px",
          marginTop: "123px",
        }}
      >
        <div className={style.o_mask_container}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
            <img className="proteccion" src="/img/01-logoPel.png" alt="" />
            <img className="text2" src="/img/01-txt.png" alt="" />

              <h1
                className="mb-3"
                
              >
                Una nueva forma de <br />
                tener el <span>CONTROL</span>
                <br />
                de tu <b>SEGURIDAD</b>
              </h1>
              <img src="/img/01-logoSegomega.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div
        id="pel"
        className={`${style.o_benefits_container} row col-12`}
        style={{ backgroundImage: "url(/img/Homepagenew.jpg)" }}
      >
        <div className="col-12 col-md-8 mx-auto">
          <div className="pel_container col-sm-11 col-md-7">
            <h2>¿Qué es Protección en Línea?</h2>
            <p>
              Es una herramienta que permite <b>sistematizar</b> la información
              y los mecanismos de control en los puestos de seguridad de cada
              cliente. Facilitando la comunicación, la eficiencia y el control
              de tu seguridad.
            </p>
            <b>¡Todo en tiempo real!</b>
          </div>
        </div>
      </div>
      <div
        className="col-12 "
        style={{ backgroundImage: "url(/img/03-bg.jpg)" }}
      >
        <div
          id=""
          className="row col-sm-11 col-md-8 mx-auto"
          style={{ zIndex: 0 }}
        >
          <div className="instalacio_container col-sm-11 col-md-5">
            <h2>¿Cómo acceder a Protección en Linea?</h2>
            <div>
              <div className="d-flex align-items-center">
                <img
                  src="img/02-bullet.png"
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />
                <p>
                  El cliente puede acceder a Proteción en Linea desde cualquier
                  computador o descargando la app para su celular
                </p>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src="img/02-bullet.png"
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />
                <p>
                  El cliente puede ubicar un computador en su porteria para
                  controlar los visitantes, vehiculos, correspondencia y
                  novedades.
                </p>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src="img/02-bullet.png"
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />
                <p>
                  Al computador de la porteria se puede adiccionar un scanner de
                  cedulas y/o un lector de huellas.
                </p>
              </div>
              <div className="d-flex align-items-center">
                <img
                  src="img/02-bullet.png"
                  style={{ width: "20px", height: "20px" }}
                  alt=""
                />
                <p>
                  Cada Cliente de SEGURIDAD OMEGA recibe un usuario y una clave
                  para acceder a protección en linea SIN NINGÚN COSTO.
                </p>
              </div>
            </div>
          </div>

          <h2 className="mb-15" id="instalacion"></h2>

          <div className={`${style.o_install_steps} col-sm-11 col-md-7`}>
            <div>
              <img
                style={{ width: "100px" }}
                src="/img/WEB_05-GRAFICO1.png"
                alt="Paso 1"
                className="mb-4 "
              />
              <CharacteristicsItem
                description="Descarga la app en la Play store o en la App store."
                icon="/img/WEB_05-ICONO1.png"
                type="benefits"
              />

              <div className="mt-3">
                <a
                  href="https://play.google.com/store/apps/details?id=seguridadomega.com.co.pel_app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ width: "70px" }}
                    src="/img/WEB_06-LOGO1.png"
                    alt=""
                  />
                </a>
                <a
                  href="https://apps.apple.com/co/app/protecci%C3%B3n-en-l%C3%ADnea/id1563992828"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ width: "70px" }}
                    src="/img/WEB_06-LOGO2.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div>
              <img
                style={{ width: "100px" }}
                src="/img/WEB_05-GRAFICO2.png"
                alt="Paso 2"
                className="mb-10"
              />
              <CharacteristicsItem
                description="Registra tus datos."
                icon="/img/WEB_05-ICONO2.png"
                type="benefits"
              />
            </div>
            <div>
              <img
                style={{ width: "120px" }}
                src="/img/WEB_05-GRAFICO3.png"
                alt="Paso 3"
                className="mb-6"
              />
              <CharacteristicsItem
                description="¡Listo! toma el control de tu seguridad."
                icon="/img/WEB_05-ICONO3.png"
                type="benefits"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${style.o_characteristics_container} row col-12 m-0 pb-10`}
        style={{ backgroundImage: "url(/img/04-bg.jpg)" }}
      >
        {/* <img style={{width:"100%"}}
          src="/img/04-bg.jpg"
          alt=""
          className={style.o_characteristics_left_image}
        /> */}
        {/*<img
          src="/img/WEB_03-GRAFICO.png"
          alt=""
          className={style.o_characteristics_right_image}
        /> */}
        <div className="caracter_container col-sm-11 col-md-8">
          <h2 id="caracteristicas"></h2>
          <h3 id="caracteristicas">Protección en línea te permite:</h3>
          <div className="linear"></div>
        </div>
        <div
          className={`${style.o_characteristics_steps} row col-sm-11 col-md-8 pt-10`}
        >
          <div className="col-md-6">
            <CharacteristicsItem2
              description="Registrar y controlar los visitantes de
            tu portería."
              icon="/img/04-bullet-01.png"
            />
            <CharacteristicsItem2
              description="Registrar y controlar el ingreso de los
            vehículos de una instalación."
              icon="/img/04-bullet-02.png"
            />
            <CharacteristicsItem2
              description="Registrar y notificar la llegada de
            correspondencia"
              icon="/img/04-bullet-03.png"
            />
            <CharacteristicsItem2
              description="Registrar y verificar las novedades del
            servicio en tiempo real."
              icon="/img/04-bullet-04.png"
            />
            <CharacteristicsItem2
              description="Elaborar y consultar el estudio de
            prevención de riesgos."
              icon="/img/04-bullet-05.png"
            />
          </div>
          <div className="col-md 6">
            <CharacteristicsItem2
              description="Consultar los guardas de seguridad
            asignados, su programación y su
            formación."
              icon="/img/04-bullet-06.png"
            />
            <CharacteristicsItem2
              description="Notificar a los usuarios cuando ingreso
            de visitantes, correspondencia o
            novedades."
              icon="/img/04-bullet-07.png"
            />
            <CharacteristicsItem2
              description="Estar enterado de la últimas noticias en
            seguridad"
              icon="/img/04-bullet-08.png"
            />
            <CharacteristicsItem2
              description="Estar enterado de la últimas noticias en
            seguridad."
              icon="/img/04-bullet-09.png"
            />
            <CharacteristicsItem2
              description="Usarlo desde el dispositivo que
            prefieras, de una manera rápida y fácil
            de usar."
              icon="/img/04-bullet-10.png"
            />
          </div>
        </div>
      </div>

      <div
        className={` row col-12 p-0 m-0`}
        // style={{ backgroundImage: "url(/img/05-bg.jpg)"}}
      >
        <div className="col-sm-11 col-md-5 m-0 p-0">
          <img
            style={{ width: "100%", height: "100%" }}
            src="/img/05-bg-sm.jpg"
            alt=""
          />
        </div>
        <div
          style={{ backgroundColor: "white" }}
          className="benefit_container col-sm-11 col-md-7 mx-auto"
        >
          <h2 id="beneficios">BENEFICIOS PEL</h2>
          <div className="linear"></div>

          <div className="row col-md-10 pt-5">
            <div className="col-md-6 p-0 ">
              <CharacteristicsItem2
                title="Tranquilidad"
                description="Reduce la carga de trabajo de los
                guardas en la portería haciéndolos más
                eficientes."
                icon="/img/05-bullet-01.png"
                type="benefits"
              />
              <CharacteristicsItem2
                title="Calidad"
                description="Entérate en tiempo real de las novedades o
                situaciones que afectan las instalaciones."
                icon="/img/05-bullet-02.png"
                type="benefits"
              />
              <CharacteristicsItem2
                title="Análisis"
                description="Consulta en cualquier momento toda la
                información de visitantes, vehículos o
                correspondencia que llegan a las instalaciones"
                icon="/img/05-bullet-03.png"
                type="benefits"
              />
              <CharacteristicsItem2
                title="Respaldo"
                description="Entérate en que momento pasan los
                supervisores para controlar el esquema de
                seguridad"
                icon="/img/05-bullet-04.png"
                type="benefits"
              />
              <CharacteristicsItem2
                title="Tranquilidad"
                description="Consulta las recomendaciones de
                seguridad formuladas en el estudio de
                prevención de riesgos."
                icon="/img/05-bullet-05.png"
                type="benefits"
              />
            </div>
            <div className="col-md-6 p-0">
              <CharacteristicsItem2
                title="Análisis"
                description="Entérate de las últimas noticias que
                afectan la seguridad de nuestra ciudad."
                icon="/img/05-bullet-06.png"
                type="benefits"
              />
              <CharacteristicsItem2
                title="Respaldo"
                description="Agiliza la entrada de visitantes
                escaneando la cédula o con la lectura de
                huellas."
                icon="/img/05-bullet-07.png"
                type="benefits"
              />
              <CharacteristicsItem2
                title="Calidad"
                description="Sistematiza los libros de control que
                requieren en portería."
                icon="/img/05-bullet-08.png"
                type="benefits"
              />
              <CharacteristicsItem2
                title="Calidad"
                description="Los usuarios de las instalaciones recibirán
                notificaciones sobre visitantes y
                correspondencia."
                icon="/img/05-bullet-09.png"
                type="benefits"
              />
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className={style.o_top_block}>
          <h1>
            ¿Estas listo para empezar?
            <br />
            ¡Descarga la app ya!
          </h1>
          <div
            className={`${style.o_top_block_download} d-flex-column align-items-center`}
          >
            <div>
              <h2 className="textend">
                TOMA el <span>CONTROL</span> <br />
                de tu <u> SEGURIDAD </u>
              </h2>
            </div>
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=seguridadomega.com.co.pel_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/WEB_06-LOGO1.png" alt="" />
              </a>
              <a
                href="https://apps.apple.com/co/app/protecci%C3%B3n-en-l%C3%ADnea/id1563992828"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/WEB_06-LOGO2.png" alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className={style.o_bottom_block}>
          <div>
            <h4> © Protección en línea Todos los derechos reservados</h4>
            <h5>Politica de Tratamiento de Datos Personales</h5>
          </div>
          <div className={style.o_top_block_download}>
            <img src="/img/WEB_07-LOGO1.png" alt="" />
            <img src="/img/WEB_07-LOGO2.png" alt="" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
