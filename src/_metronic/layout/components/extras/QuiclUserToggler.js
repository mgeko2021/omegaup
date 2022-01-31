/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import { OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import objectPath from "object-path";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";

export function QuickUserToggler() {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas:
        objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
    };
  }, [uiService]);

  return (
    <>
      {layoutProps.offcanvas && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-user-tooltip">Ver perfil</Tooltip>}
        >
          <div className="topbar-item">
            <div
              className="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
              id="kt_quick_user_toggle"
            >
              <>
                {/* <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                  Hola, {user.correoUsuario}
                </span> */}
                <span className="symbol symbol-35 symbol-light-success">
                  <span className="symbol-label font-size-h5 font-weight-bold">
                    <span className="svg-icon svg-icon-md svg-icon-success">
                      <Image
                        src={toAbsoluteUrl("/media/users/default.jpg")}
                        roundedCircle
                        style={{ width: 20, height: 20 }}
                      />
                    </span>
                  </span>
                </span>
              </>
            </div>
          </div>
        </OverlayTrigger>
      )}

      {/* {!layoutProps.offcanvas && (<UserProfileDropdown/>)} */}
    </>
  );
}
