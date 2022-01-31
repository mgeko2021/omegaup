/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toAbsoluteUrl } from "../../../../../_helpers";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function SearchResult({ data }) {
  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return (
      <div
        style={{ maxHeight: "325px", overflow: "hidden" }}
        className="quick-search-wrapper scroll ps ps--active-y"
      >
        <div className="quick-search-result">
          <div className="text-muted d-none">No record found</div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ maxHeight: "325px", overflow: "hidden" }}
      className="quick-search-wrapper scroll ps ps--active-y"
    >
      <PerfectScrollbar
        options={perfectScrollbarOptions}
        className="scroll"
        style={{ maxHeight: "325px", position: "relative" }}
      >
        <div className="quick-search-result">
          {/* begin: Section */}
          <div className="font-size-sm text-primary font-weight-bolder text-uppercase mb-2">
            Secciones
          </div>
          <div className="mb-10">
            <div className="d-flex align-items-center flex-grow-1 mb-2">
              <div className="symbol symbol-45 bg-transparent flex-shrink-0">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Clip.svg")}></SVG>
              </div>
              <div className="d-flex flex-column ml-3 mt-2 mb-2">
                <a
                  href="/porteria"
                  className="font-weight-bold text-dark text-hover-primary"
                >
                  Porteria
                </a>

              </div>
            </div>

            <div className="d-flex align-items-center flex-grow-1 mb-2">
              <div className="symbol symbol-45 bg-transparent flex-shrink-0">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Clip.svg")}></SVG>
              </div>
              <div className="d-flex flex-column ml-3 mt-2 mb-2">
                <a
                  href="/guardas"
                  className="font-weight-bold text-dark text-hover-primary"
                >
                  Guardas
                </a>
              </div>
            </div>

            <div className="d-flex align-items-center flex-grow-1 mb-2">
              <div className="symbol symbol-45 bg-transparent flex-shrink-0">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Clip.svg")}></SVG>
              </div>
              <div className="d-flex flex-column ml-3 mt-2 mb-2">
                <a
                  href="/noticias"
                  className="font-weight-bold text-dark text-hover-primary"
                >
                  Noticias
                </a>
              </div>
            </div>

            <div className="d-flex align-items-center flex-grow-1 mb-2">
              <div className="symbol symbol-45 bg-transparent flex-shrink-0">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/Clip.svg")}></SVG>
              </div>
              <div className="d-flex flex-column ml-3 mt-2 mb-2">
                <a
                  href="/contacto"
                  className="font-weight-bold text-dark text-hover-primary"
                >
                  Contacto
                </a>
              </div>
            </div>
          </div>
          {/* end: Section */}

         
        </div>
      </PerfectScrollbar>
    </div>
  );
}
