/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useLayoutEffect, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import objectPath from "object-path";
import { useHistory, useLocation } from "react-router-dom";
import puestosActions from "../../../../app/modules/Puestos/_redux/actions";
import authActions from "../../../../app/modules/Auth/_redux/actions";
import { BreadCrumbs } from "./components/BreadCrumbs";
import {
  getBreadcrumbsAndTitle,
  useSubheader,
} from "../../_core/MetronicSubheader";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import moment from "moment";
import {
  Dropdown,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import styled from 'styled-components';
import Modal from "../../../../app/Components/Modal/modal"
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function SubHeader() {
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user,idContacto,numeroInstancia,tipoUsuario } = useSelector((state) => state.auth);
  const { puestos } = useSelector((state) => state.puestos);
  const [filterPuesto, setFilterPuesto] = useState({
    search: "",
  });
  const [ show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [estadoModal,CambiarEstadoModal] = useState(false);
  const {handleSubmit} = useForm();
  const {instanciaName,nombre,apellido} = user;
  
  //const handleShow = () => setShow(true);
  //console.log(puestos);

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
        "subheader_container",
        true
      ),
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs =
      aside && aside.breadcrumbs.length > 0
        ? aside.breadcrumbs
        : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title.length > 0
        ? aside.title
        : header.title
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);

  useEffect(() => {
    dispatch(
      puestosActions.getPlacesInit({
        identificacion: user.cedulaUsuario,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePlace = (place) => {
    const NameInstance = place[0].NameInstance;
    const user = place[1];
    dispatch(authActions.loginRequestSuccess({ NameInstance, user }));
    setTimeout(() => {
      handleClose();
      setFilterPuesto({
        search: "",
      });
      history.push("/");
      // window.location.reload(true);
    }, 2000);
  };


  const urlrecom = 'https://omega.proteccionenlinea.co/proteccionenlinea/services/v1/pel/insertRecommendation';

  const exito = () =>{
    toast.success('¡Tu comentario ha sido registrado con éxito! Tu opinión nos ayuda a desarrollar nuevas formas de vivir tu seguridad.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      zindex:100
      });
  }

  const fracaso = () =>{
    toast.error('Tu comentario no ha sido registrado con exito', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      zindex:100
      });
  }

  const Cuentanos = async (data) => {
    
    const result = await fetch(urlrecom, {
      method: "POST",
      body: JSON.stringify({
              apikey : "b21lZ2FEZXNhcnJvbGxhZG9yMjAyMQ==",
              type : "recomendacion_web",
              full_name : nombre+" "+apellido,
              message : data,
              contact_id : idContacto,
              instance_id : numeroInstancia,
              instance_name : instanciaName,
              user_type : tipoUsuario,
      })
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
      try{
        if(result.statusCode === 200){
          exito();
        }else{
          fracaso();
        }
      }catch(err){
        console.log(err);
      }
      console.log(result);
      CambiarEstadoModal(false);
  };

  const datos = (event) =>{
    //event.preventdefault(); //Evitar el procesamiento automatico.
    Cuentanos(dato.cuenta);
  }

  const [dato,setDatos]= useState({
    cuenta:''
  })

  const handleInputChange = (event) =>{
    //console.log(event.target.value);
    setDatos ({
      ...dato,
      [event.target.name] : event.target.value
    })
  }


  return (
    <div
      id="kt_subheader"
      className={`subheader py-2 py-lg-4   ${layoutProps.subheaderCssClasses}`}
    >


      <div
        className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
      >
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {layoutProps.subheaderMobileToggle && (
            <button
              className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}

          <div className="d-flex align-items-baseline mr-5">
            <h5 className="text-dark font-weight-bold my-2 mr-5">
              <>{subheader.title}</>
              {/*<small></small>*/}
            </h5>
          </div>

          <BreadCrumbs items={subheader.breadcrumbs} />

          <div className="d-flex align-items-baseline ml-10 ">
          
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {user.instanciaName}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ overflowY: "scroll", height: 400 }}>
              <InputGroup>
                  <FormControl
                    style={{
                      backgroundColor: "#A30000",
                      border: "none",
                      color: "white",
                    }}
                    className="mb-5"
                    onChange={(e) =>
                      setFilterPuesto({
                        ...filterPuesto,
                        search: e.target.value,
                      })
                    }
                    placeholder="Buscar puestos"
                  />
                </InputGroup>
                {puestos.length &&
                  puestos
                    .filter((place) =>
                      place[1].instanciaName
                        .toLowerCase()
                        .includes(filterPuesto.search.toLowerCase())
                    )
                    .map((place, index) => (
                      <Dropdown.Item
                        as="button"
                        onClick={() => handleChangePlace(place)}
                        key={index}
                      >
                        {place[1].instanciaName}
                      </Dropdown.Item>
                    ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* <Button style={{ backgroundColor: "#A30000" }} onClick={handleShow}>
              Cambiar tú Puesto
            </Button> */}
            {/* <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Cambiar tú Puesto</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal> */}
          </div>
          <div className="d-flex align-items-baseline ml-10 ">
          <button 
                  onClick={() => CambiarEstadoModal(true)} className="btn btn-warning  font-weight-bold" style={{
            background: 'url("/img/btn_cuentanos.png") no-repeat 100%/100%',
            height: "40px",
            width:"150px"
          }}/>
            <Modal
               estado={estadoModal}
               cambiarEstado={CambiarEstadoModal}
               mostrarHeader={true}
               mostrarHeader2={false}
               mostrarSubHeader={true}
               title={'¿Se te ocurre algo más que pudiéramos mostrar?'}>
               <form    onSubmit={handleSubmit(datos)}>
                  <Contenido>
                    <textarea name="cuenta" type="text" onChange={handleInputChange} required></textarea>
                    <button className="btn btn-warning w-25 font-weight-bold" type="submit">ENVIAR</button>
                  </Contenido>
                </form>
              </Modal>
             
          </div>
        </div>

        {/* Toolbar */}
        <div className="d-flex align-items-center">
          <a
            href="#"
            className="btn btn-light btn-sm font-weight-bold"
            id="kt_dashboard_daterangepicker"
            data-toggle="tooltip"
            title="Select dashboard daterange"
            data-placement="left"
          >
            <span
              className="text-muted font-weight-bold mr-2"
              id="kt_dashboard_daterangepicker_title"
            >
              Hoy:{" "}
            </span>
            <span
              className="text-muted font-weight-bold"
              id="kt_dashboard_daterangepicker_date"
            >
              {moment().format("MMM DD")}
            </span>
          </a>
          {/* <QuickActions/> */}
        </div>
      </div>
    </div>
  );
}
/* 
const Boton = styled.button`
display: block;
padding: 10px 30px;
border-radius: 100px;
color: #fff;
border: none;
background: #1766DC;
cursor: pointer;
font-family: 'Roboto', sans-serif;
font-weight: 500;
transition: .3s ease all;
top:30rem; */

/* &:hover {
  background: #0066FF;
}
`; */

const Contenido = styled.div`
display: flex;
flex-direction: column;
align-items: center;

h1 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}

img {
  width: 100%;
  vertical-align: top;
  border-radius: 3px;
}

textarea{
   resize: none;
   width: 650px;
   height: 100px;
   margin-bottom:1rem;
   border-Radius:1%;
   font-size: 12pt;
   background:#E1DFDE;
}

button{
  padding-top: 0%;
  textAlign:center;
  font-size: 10pt;
}
`;

