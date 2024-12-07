import { Row } from "antd";
import React, { useState } from "react";
import { Table, Input, Button, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Penalties from "../components/Penalties"
// import images
import camera1 from "../assets/images/Shariati_Ave_01_-_panoramio.jpg";

import taradodDays from "../assets/images/tradodDays.jpg";
import tradodMonth from "../assets/images/tradodMonth.jpg";
import CameraStream from "../components/CameraStream";

import DetectedPlateTable from "../components/DetectedPlateTable";

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
      

      <Row style={{ padding: "10px" }} gutter={[10, 10]}>
        <Col sm={24}>
          <Penalties />
        </Col>
      </Row>
      <br />
      <Row style={{ padding: "10px" }} gutter={[10, 10]}>
        <Col sm={24}>
          <DetectedPlateTable />
        </Col>
      </Row>
      <br />
    </>
  );
};

export default Home;
