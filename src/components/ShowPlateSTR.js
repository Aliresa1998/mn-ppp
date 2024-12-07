import { Col, Row } from "antd";
import React from "react";
import flag from "../assets/images/iran-flag.png";
const ShowPlateSTR = (props) => {
  return (
    <>
      <Row
        style={{
          border: "4px solid black",
          minHeight: "30px",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Col
          sm={4}
          style={{
            borderLeft: "4px solid black",
            height: "35px",
            display: "flex",
            fontSize: "14px",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.plate.split("-")[3]}
        </Col>
        <Col
          sm={16}
          style={{
            borderLeft: "4px solid black",
            height: "35px",
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {" "}
          {props.plate &&
            props.plate.split("-")[0] +
              " " +
              props.plate.split("-")[1] +
              " " +
              props.plate.split("-")[2]}
        </Col>
        <Col
          sm={4}
          style={{
            backgroundColor: "rgb(86,115,185)",

            height: "35px",
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={flag} width={"15"} height={"20"} />
        </Col>
      </Row>
    </>
  );
};

export default ShowPlateSTR;
