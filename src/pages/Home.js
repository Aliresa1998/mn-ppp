import { Row } from "antd";
import React, { useState } from "react";
import { Table, Input, Button, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons";

// import images
import camera1 from "../assets/images/Shariati_Ave_01_-_panoramio.jpg";

import taradodDays from "../assets/images/tradodDays.jpg";
import tradodMonth from "../assets/images/tradodMonth.jpg";
import CameraStream from "../components/CameraStream";

import DetectedPlateTable from "../components/DetectedPlateTable";
import DetectedPlateTableHome from "../components/DetectedPlateTableHome";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    {
      key: "1",
      city: "همدان",
      subscriberName: "معدن شماره 1",
    },
    {
      key: "2",
      city: "تبریز",
      subscriberName: "معدن شماره 2",
    },
    {
      key: "3",
      city: "اصفهان",
      subscriberName: "معدن شماره 3",
    },
  ];

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      item.subscriberName.includes(searchText)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "نام مشترک",
      dataIndex: "subscriberName",
      key: "subscriberName",
    },
    {
      title: "اقدامات",
      key: "actions",
      render: () => (
        <EyeOutlined style={{ fontSize: "16px", color: "#1890ff" }} />
      ),
    },
  ];

  return (
    <>
      <Row justify={"space-between"}>
        <Col style={{ minWidth: "32%" }}>
          <DetectedPlateTableHome />
        </Col>
        <Col sm={16}>
          <Row gutter={10}>
            <Col sm={12}>
              <div style={{ width: "100%" }} className="mine_card">
                <div className="mine_card_title">دوربین 1</div>
                <img src={camera1} alt="camera" width="100%" height={"300px"} />
              </div>
            </Col>
            <Col sm={12}>
              <div style={{ width: "100%" }} className="mine_card">
                <div className="mine_card_title">دوربین 2</div>
                <img src={camera1} alt="camera" width="100%" height={"300px"} />
              </div>
            </Col>
            <Col sm={12}>
              <div style={{ width: "100%" }} className="mine_card">
                <div className="mine_card_title">دوربین 3</div>
                <img src={camera1} alt="camera" width="100%" height={"300px"} />
              </div>
            </Col>
            <Col sm={12}>
              <div
                style={{ width: "100%", paddingLeft: "0px" }}
                className="mine_card"
              >
                <div className="mine_card_title">دوربین 4</div>
              </div>
              <img src={camera1} alt="camera" width="100%" height={"300px"} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
