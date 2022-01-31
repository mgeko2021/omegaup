import React, { useMemo } from "react";
import { useHtmlClassService } from "../../_core/MetronicLayout";

export function Footer() {
  const today = new Date().getFullYear();
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      footerClasses: uiService.getClasses("footer", true),
      footerContainerClasses: uiService.getClasses("footer_container", true),
    };
  }, [uiService]);

  return (
    <div
      className={`footer bg-dark py-4 d-flex flex-lg-column  ${layoutProps.footerClasses}`}
      id="kt_footer"
    >
      <div
        className={`${layoutProps.footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
      >
        <div className="text-dark order-1 order-md-1">
          <span className="text-muted font-weight-bold mr-2">
            {today.toString()}
          </span>
          <span className="text-white">&copy;</span>
          <a
            href="https://seguridadomega.com.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-hover-primary"
          >
            Protección en Linea
          </a>
        </div>
        <div className="order-2" style={{ width: "10%" }}>
          <img src="./img/logo-omega.svg" alt="" />
        </div>
        <div className="nav nav-dark order-1 order-md-2">
          <a
            href="https://seguridadomega.com.co/nuestra-empresa"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link pr-3 pl-0 text-white"
          >
            Nuestra empresa
          </a>

          <a
            href="https://seguridadomega.com.co/contactenos"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link pl-3 pr-0 text-white"
          >
            Contacto
          </a>
        </div>
      </div>
    </div>
  );
}
