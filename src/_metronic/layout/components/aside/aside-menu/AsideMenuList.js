/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import moment from "moment";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
const md5 = require("md5");

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"} menu-item-open `
      : "";
  };

  const tipoUsuario = useSelector((state) => state.auth.tipoUsuario);
  const user = useSelector((state) => state.auth.userName);
  const FullNameInstance = useSelector((state) => state.auth.NameInstance);
  const nameInstance = FullNameInstance.split("_").pop();
  const clientId = useSelector((state) => state.auth.user.cliente_id);
  const userName = user;
  const key = "159UBAdwokLZat8jjum.gefKRPn1mC9m6qNL/HgEpan72hTf1LF1NN";
  const currentDay = moment().format("DDMMYYYY");
  const token = `${userName}${key}${currentDay}`;
  const riskManagementToken = `admin${key}${currentDay}`;
  const hash = md5(token);
  const hash2 = md5(riskManagementToken);

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li
          className={`menu-item ${getMenuItemActive("/inicio", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/inicio">
            <span className="menu-icon">
              <SVG src={toAbsoluteUrl("/img/PEL.svg")} />
            </span>
            <span className="menu-text">Inicio</span>
          </NavLink>
        </li>

        {/*begin::1 Level*/}
        {(tipoUsuario === "Administrador" || tipoUsuario === "Usuario") && (
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/porteria",
              true
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink
              className="menu-link o_hoverable menu-toggle"
              to="/porteria"
            >
              <span className="menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Apartment.svg")}
                />
              </span>
              <span className="menu-text">Portería</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                <li
                  className="menu-item  menu-item-parent"
                  aria-haspopup="true"
                >
                  <span className="menu-link">
                    <span className="menu-text">Portería</span>
                  </span>
                </li>

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive("/visitantes")}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/visitantes">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Visitantes</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}

                {/*begin::2 Level*/}
                <li
                  className={`menu-item ${getMenuItemActive(
                    "/correspondencia"
                  )}`}
                  aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/correspondencia">
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Correspondencia</span>
                  </NavLink>
                </li>
                {/*end::2 Level*/}
              </ul>
            </div>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {(tipoUsuario === "Administrador" ||
          tipoUsuario === "seguridadadministrativo") && (
          <li
            className={`menu-item ${getMenuItemActive("/my-page", false)}`}
            aria-haspopup="true"
          >
            <a
              className="menu-link"
              href={`https://omega.proteccionenlinea.co/proteccionenlinea/index.php?r=site/descargareprurl&username=admin&token=${hash2}&tipo_evaluacion=SGCS&cliente_id=${clientId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Alert.svg")}
                />
              </span>
              <span className="menu-text">Gestión de riesgos</span>
            </a>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {(tipoUsuario === "Administrador" ||
          tipoUsuario === "seguridadadministrativo") && (
          <li
            className={`menu-item ${getMenuItemActive("/minuta", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/minutas">
              <span className="menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Clipboard.svg")}
                />
              </span>
              <span className="menu-text">Minutas</span>
            </NavLink>
          </li>
        )}

        {(tipoUsuario === "Administrador" ||
          tipoUsuario === "seguridadadministrativo") && (
          <li
            className={`menu-item ${getMenuItemActive("/supervision", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/supervision">
              <span className="menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Zoom.svg")} />
              </span>
              <span className="menu-text">Supervisión</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/guardas", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/guardas">
            <span className="menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Security.svg")}
              />
            </span>
            <span className="menu-text">Mis guardas</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {tipoUsuario !== "Invitado" && (
          <li
            className={`menu-item ${getMenuItemActive("/contacto", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/contacto">
              <span className="menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/General/Person.svg")}
                />
              </span>
              <span className="menu-text">Contacto</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/noticias", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/noticias">
            <span className="menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/World.svg")} />
            </span>
            <span className="menu-text">Noticias</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {tipoUsuario !== "Invitado" && tipoUsuario !== "seguridadguarda" && (
          <li
            className={`menu-item ${getMenuItemActive("/PQRS", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/PQRS">
              <span className="menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/PQRS.svg")} />
              </span>
              <span className="menu-text">PQRS</span>
            </NavLink>
          </li>
        )}
        {/*end::1 Level*/}

        {/* {tipoUsuario === "seguridadadministrativo" && (
          <li
            className={`menu-item`}
            style={{ backgroundColor: "#ff7300" }}
            aria-haspopup="true"
          >
            <a
              className="menu-link"
              href={`https://${
                FullNameInstance === "proteccion_enlinea"
                  ? "omega"
                  : `${nameInstance}`
              }.proteccionenlinea.co/proteccionenlinea/index.php?r=site/loginurlproteccionenlinea&username=${userName}&token=${hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="menu-icon">
                <SVG src={toAbsoluteUrl("/img/administracion.svg")} />
              </span>
              <span className="menu-text">Administración</span>
            </a>
          </li>
        )} */}

        {(tipoUsuario === "seguridadadministrativo" ||
          tipoUsuario === "seguridadguarda") && (
          <li
            className={`menu-item`}
            style={{ backgroundColor: "#ff7300" }}
            aria-haspopup="true"
          >
            <a
              className="menu-link"
              href={`https://${
                FullNameInstance === "proteccion_enlinea"
                  ? "omega"
                  : `${nameInstance}`
              }.proteccionenlinea.co/proteccionenlinea/index.php?r=site/loginurlproteccionenlinea&username=${userName}&token=${hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="menu-icon">
                <SVG src={toAbsoluteUrl("/img/controlporteria.svg")} />
              </span>
              <span className="menu-text">Control de portería</span>
            </a>
          </li>
        )}
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
