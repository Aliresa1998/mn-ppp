import React from "react";
import SideBar from "./SideBar";
import { Col, Row } from "antd";
import Footer from "./Footer";

function Main({ children }) {
  return (
    <>
      <Row>
        <SideBar />
      </Row>
      <Row>
        {/* <Col sm={5}>
          <SideBar />
        </Col> */}
        <Col sm={24}>
          <div style={{ padding: "25px", width: "100%" }}>{children}</div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Main;
