import React from 'react';
import styled from 'styled-components';

const Modal = ({
    children,
	estado,
	cambiarEstado,
	mostrarHeader,
    mostrarHeader2,
    mostrarSubHeader,
    title="Titulo"
}) =>{
    return (
        <>
        {estado &&
            <Overlay>
                <ContenedorModal>
                    {mostrarHeader && 
                        <EncabezadoModal>
                        <h1>{title}</h1>
                        </EncabezadoModal>
                    }
                    {mostrarHeader2 && 
                        <EncabezadoModal2>
                        <h1>{title}</h1>
                        </EncabezadoModal2>
                    }
                    {mostrarSubHeader&&
                    <SubEncabezadoModal>
                    <strong style={{}}>CUENTANOS</strong>
                    </SubEncabezadoModal>
                    }
                    <BotonCerrar onClick={() => cambiarEstado(false)}>
                        <img src="/img/close.svg" alt="close" />
                    </BotonCerrar>
                    {children}
                </ContenedorModal>
            </Overlay>
        }
        </>
    )
}

export default Modal;

const Overlay = styled.div`
    width:100vw;
    height:100vh;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,.5);
    padding:40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:100;
`;

const ContenedorModal = styled.div`
    width:700px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius:5px;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    padding:20px;
`;

const EncabezadoModal = styled.div`
    display:flex;
    align-items: center;
    align-text:center;
    justify-content:center;
	h1 {
		font-weight: 500;
		font-size: 25px;
		color: #000000;
	}
`;

const EncabezadoModal2 = styled.div`
    display:flex;
    align-items: center;
    align-text:center;
    justify-content:center;
    border-bottom: 1px solid #E8E8E8;

	h1 {
		font-weight: 500;
		font-size: 25px;
		color: #D90000;
	}
`;

const SubEncabezadoModal = styled.div`
    display:flex;
    align-items: center;
    align-text:center;
    justify-content:center;
    padding-top:0px;
    margin-top:0px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E8E8E8;
    strong{
        font-size: 30px;
        color: #fc8330;
    }
`;



const BotonCerrar = styled.button`

    position: absolute;
    top: -20px;
    right: -20px;
    width: 64px;
    height: 64px;
    border: 3px solid #ffffff;
    outline: none;
    border-radius: 50%;
    background-color: #ff0000;

    img {
      width: 75%;
    }
`;