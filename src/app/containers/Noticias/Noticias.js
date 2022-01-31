import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import noticiasActions from "../../modules/Noticias/_redux/actions";
import { Card } from "react-bootstrap";

export default function Noticias() {
  const dispatch = useDispatch();
  const { noticias } = useSelector((state) => state.noticias);

  useEffect(() => {
    dispatch(noticiasActions.getNoticiasInit());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="row flex-wrap justify-center align-items-center"
      style={{ width: "100%", gap: "5px 0px", margin: 0 }}
    >
      {noticias.length > 0 && (
        <>
          {noticias.map((prensa, index) => (
            <div className="col-md-6 col-lg-6 col-xl-4 col-sm-6" key={index}>
              <Card
                style={{
                  /* minWidth: "25rem", */
                  marginBottom: "2rem",
                  borderRadius: 6,
                  WebkitBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                  MozBoxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ height: 200, backgroundSize: "contain" }}
                  src={prensa.imagen}
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {prensa.titulo}
                  </Card.Title>
                  <Card.Text
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {prensa.contenido}
                  </Card.Text>
                  <hr styles={{ backgroundColor: "#CE0B1F" }} />
                  <a
                    href={prensa.url}
                    alt="Ver noticia"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "#CE0B1F",
                    }}
                  >
                    Leer más
                  </a>
                </Card.Body>
              </Card>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
