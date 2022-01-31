import React,{useState,useEffect} from "react";
import "./chart.css" 
import {
    LineChart,
    XAxis,
    YAxis,
    Line,
    Legend,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import {Card,Image} from "react-bootstrap";
  import { useSelector} from "react-redux";
  import styled from 'styled-components';
  import Modal from "../../../app/Components/Modal/modal"


export default function Graphics()  {
const urlv = 'https://omega.proteccionenlinea.co/proteccionenlinea/services/v1/pel/getVisitorsByMonth';
const urlc = 'https://omega.proteccionenlinea.co/proteccionenlinea/services/v1/pel/getCorrespondencesByMonth';
const urlcse = 'https://omega.proteccionenlinea.co/proteccionenlinea/services/v1/pel/getUndeliveredCorrespondence';
const urlvin = 'https://omega.proteccionenlinea.co/proteccionenlinea/services/v1/pel/getNumbervisitorsInside';
const urlcr = 'https://omega.proteccionenlinea.co/proteccionenlinea/services/v1/pel/getRegisteredContacts';

const { NameInstance,numeroInstancia } = useSelector((state) => state.auth);

const [visitantes,setVisitantes] = useState();
const [correspondence,setCorrespondence] = useState();
const [undeliveredcorres,setundeliveredCorres] = useState();
const [pendingvisits,setpendingvisits] = useState();
const [contacts,setcontacts] = useState();
const [Modal_1,EstadoModal_1] = useState(false);
const [Modal_2,EstadoModal_2] = useState(false);
const [Modal_3,EstadoModal_3] = useState(false);
const [Modal_4,EstadoModal_4] = useState(false);


    const DB = {
      "apikey": "b21lZ2FEZXNhcnJvbGxhZG9yMjAyMQ==",
      "dataBase": NameInstance,
      "instanceNumber": numeroInstancia,
    }

    const getVisitForMonthRequest = async () => {
    
      const result = await fetch(urlv, {
        method: "POST",
        body: JSON.stringify(DB),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error));
       
        try {
          const info  = result.data;
          setVisitantes(info);
        } catch (error) {
          console.log(error);
        }
        
    };

const getcorrespondenceForMonthRequest = async () => {
 
  const result = await fetch(urlc, {
    method: "POST",
    body: JSON.stringify(DB),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

    try {
      const info  = result.data;
      setCorrespondence(info);
    } catch (error) {
      console.log(error);
    }
};

const getundeliveredcorrespondenceRequest = async () => {
  
  const result = await fetch(urlcse, {
    method: "POST",
    body: JSON.stringify(DB),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
    let undecore;
    try {
      const info  = result.data;
      info.map(element=>{
        undecore = element.correspondencias_sin_entregar;
        setundeliveredCorres(undecore);
      });
    } catch (error) {
      console.log(error);
    }
    
    
    
};

const getpendingvisitorsRequest = async () => {
  
  const result = await fetch(urlvin, {
    method: "POST",
    body: JSON.stringify(DB),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

    let pending;
    try {
      const info  = result.data;
      info.map(element=>{
        pending = element.visitantes_que_no_han_salido;
      });
      
      setpendingvisits(pending);
    } catch (error) {
      console.log(error);
    }
    
   
    
};


const getRegisteredContactsRequest = async () => {
  
  const result = await fetch(urlcr, {
    method: "POST",
    body: JSON.stringify(DB),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

    let registered;
    try {
      const info  = result.data;
      info.map(element=>{
        registered = element.contactos_registrados;
      });
      setcontacts(registered);
    } catch (error) {
      console.log(error);
    }
    
};

    //Ejecuta la función desde el inicio.
    useEffect(() => { 
      getVisitForMonthRequest(); 
      getRegisteredContactsRequest();
      getpendingvisitorsRequest();
      getundeliveredcorrespondenceRequest();
      getcorrespondenceForMonthRequest();
    }, []);

    useEffect(()=>{
      const interval=setInterval(()=>{       
        getVisitForMonthRequest(); 
        getRegisteredContactsRequest();
        getpendingvisitorsRequest();
        getundeliveredcorrespondenceRequest();
        getcorrespondenceForMonthRequest();
  
        },15000)
        return()=>clearInterval(interval)
    },[])
      return (
        <>
        <div className="row" style={{paddingTop:0, paddingLeft:50}}>
          <div className=" col-sm-4 col-xs-6 col-md-3 col-lg-3">
          <a className="card-block stretched-link text-decoration-none" onClick={() => EstadoModal_1(true)}>
              <Card style={{ width: "13rem", height:"12rem",
                            marginBottom: "2rem",
                            borderRadius: 18,
                            WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                            MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", }}>
                        <Card.Body style={{textAlign:"center", color:"#000000","font-weight":"bold",paddingTop:0 ,paddingBottom:0}}>
                        <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        width: "100px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/VISITANTES.png"
                    />
                          <h6>Visitantes Pendientes</h6>
                        <Card.Text style={{fontSize:40,color:"#FFAD00",textAlign:"center","font-weight":"bold", paddingTop:0}}>
                            {pendingvisits}
                        </Card.Text>
                        </Card.Body>
                        
              </Card>
              </a>
              <Modal
               estado={Modal_1}
               cambiarEstado={EstadoModal_1}
               mostrarHeader={false}
               mostrarHeader2={true}
               mostrarSubHeader={false}
               title={'Caracteristica en desarrollo'}>
                  <Contenido>
                    <h2>Pronto podrás visualizar los visitantes pendientes.</h2>
                    <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        width: "300px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/Dev_productivity.png"
                    />
                  </Contenido>
              </Modal>
          </div>
          <div className=" col-sm-4 col-xs-6 col-md-3 col-lg-3">
          <a className="card-block stretched-link text-decoration-none" onClick={() => EstadoModal_2(true)}>
              <Card style={{ width: "15rem", height:"12rem",
                        marginBottom: "2rem",
                        borderRadius: 18,
                        WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                        MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", }}>

                    <Card.Body  style={{textAlign:"center", color:"#000000","font-weight":"bold",paddingTop:0 ,paddingBottom:0}}>
                    <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        width: "100px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/CORRESPONDENCIA.png"
                    />
                        <h6>Correspondencia Pendiente</h6>
                      <Card.Text style={{fontSize:40,color:"#FFAD00",textAlign:"center","font-weight":"bold",paddingtop:0}}>
                          {undeliveredcorres}
                      </Card.Text>
                    </Card.Body>
              </Card>
              </a>
              <Modal
               estado={Modal_2}
               cambiarEstado={EstadoModal_2}
               mostrarHeader={false}
               mostrarHeader2={true}
               mostrarSubHeader={false}
               title={'Caracteristica en desarrollo'}>
                  <Contenido>
                    <h2>Pronto podrás visualizar la correspondencia pendiente.</h2>
                    <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        width: "300px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/Building_page.png"
                    />
                  </Contenido>
              </Modal>
          </div>
          <div className="col-sm-4 col-xs-6 col-md-3 col-lg-3">
          <a className="card-block stretched-link text-decoration-none" onClick={() => EstadoModal_3(true)}>
                <Card style={{ width: "13rem", height:"12rem",
                          marginBottom: "2rem",
                          borderRadius: 18,
                          WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                          MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", }}>
                      <Card.Body style={{textAlign:"center", color:"#000000","font-weight":"bold",paddingTop:0 ,paddingBottom:0}}>
                      <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        width: "100px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/CONTACTOS-REGISTRADOS.png"
                    />
                          <h6>Contactos Registrados</h6>
                        
                        <Card.Text style={{fontSize:40,color:"#FFAD00",textAlign:"center","font-weight":"bold", paddingTop:0}}>
                            {contacts}
                        </Card.Text>
                      </Card.Body>
                  </Card>
                  </a>
                  <Modal
               estado={Modal_3}
               cambiarEstado={EstadoModal_3}
               mostrarHeader={false}
               mostrarHeader2={true}
               mostrarSubHeader={false}
               title={'Caracteristica en desarrollo'}>
                  <Contenido>
                  <h2>Pronto podrás visualizar los contactos registrados.</h2>
                    <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        width: "300px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/List.png"
                    />
                  </Contenido>
              </Modal>
          </div>
          <div className="col-sm-4 col-xs-6 col-md-3 col-lg-3">
          <a className="card-block stretched-link text-decoration-none" onClick={() => EstadoModal_4(true)}>
              <Card style={{ width: "14rem", height:"12rem",
                        marginBottom: "2rem",
                        borderRadius: 18,
                        WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                        MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", }}>
                    <Card.Body style={{textAlign:"center", color:"#000000","font-weight":"bold",paddingTop:0 ,paddingBottom:0}}>
                    <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                        width: "100px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/PARQUEADERO.png"
                    />
                          <h6>Parqueaderos Disponibles</h6>
                        
                        <Card.Text style={{fontSize:40,color:"#FFAD00",textAlign:"center","font-weight":"bold", paddingTop:0}}>
                            {100}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </a>
                <Modal
               estado={Modal_4}
               cambiarEstado={EstadoModal_4}
               mostrarHeader={false}
               mostrarHeader2={true}
               mostrarSubHeader={false}
               title={'Caracteristica en desarrollo'}>
                  <Contenido>
                  <h2>Pronto podrás visualizar los parqueaderos disponibles.</h2>
                    <Image
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        width: "300px",
                        alignSelf: "center",
                        paddingBottom: 0,
                        paddingTop: 0
                      }}
                      src="/img/factory.png"
                    />
                  </Contenido>
              </Modal>
        </div>
        </div>
        <div className="row" style={{paddingTop:0, paddingLeft:40}}>
          <div className="col-sm-12 col-xs-6 col-md-6 col-lg-6"> 
          <Card style={{ width: "35rem", height:"23rem",
                    marginBottom: "2rem",
                    borderRadius: 18,
                    WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", }}>
                <Card.Body>
                  <Card.Title  style={{textAlign:"center", color:"#D90000","font-weight":"bold"}}>
                    <h5>Visitantes durante el año 2021</h5>
                  </Card.Title>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart
                        width={500}
                        height={200}
                        data={visitantes}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="5" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis type="number" />
                        <Legend height={1}/>
                        <Tooltip />
                        <Line  type="linear" legendType="rect" dataKey="visitors" name="Visitantes" stroke="#00A8B0" fill="#FF3F00"  />
                      </LineChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
          </div>
          <div className="col-sm-6 col-xs-6 col-md-6 col-lg-6">
            <Card style={{ width: "35rem", height:"23rem",
                    marginBottom: "2rem",
                    borderRadius: 18,
                    WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)", }}>
                <Card.Body>
                  <Card.Title style={{textAlign:"center", color:"#D90000","font-weight":"bold"}}>
                    <h5>Correspondencia durante el año 2021</h5>
                  </Card.Title>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart
                        width={500}
                        height={200}
                        data={correspondence}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="5" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis type="number" />
                        <Tooltip />
                        <Legend />
                        <Line  type="linear" legendType="rect" dataKey="visitors" name="Correspondencia" stroke="#FF3F00" fill="#FFAD00" />
                      </LineChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>
          </div>
        </div>
        </>
      );
  }

  const Contenido = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-text:center;
    justify-content:center;
    padding-top:15px;
    color:#000000;
  `;


