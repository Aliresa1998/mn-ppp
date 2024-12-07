import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/unnamed.png";
import { Col, Row } from "antd";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const SideBar = () => {
  const [slectedItem, setslectedItem] = useState("1");
  const [time, setTime] = useState({
    date: moment().format("dddd jD jMMMM jYYYY"),
    clock: moment().format("HH:mm"),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        date: moment().locale("fa").format("dddd jD jMMMM jYYYY"),
        clock: moment().locale("fa").format("HH:mm"),
      });
    }, 1000); // Update every second for the clock

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    if (pathname == "/report") {
      setslectedItem("2");
    } else if (pathname == "/pattern") {
      setslectedItem("3");
    } else if (pathname == "/groups") {
      setslectedItem("4");
    } else if (pathname == "/trafic") {
      setslectedItem("5");
    } else {
      setslectedItem("1");
    }
  }, [pathname]);

  return (
    <>
      <Row
        className="sideNavBar"
        justify={"space-between"}
        align={"middle"}
        style={{ width: "100%" }}
      >
        <Col>
          <img src={Logo} alt="logo" width={100} />
        </Col>

        <Col sm={"15"}>
          <Row
            style={{ width: "400px" }}
            gutter={[15]}
            onClick={() => {
              setslectedItem("1");
            }}
          >
            <NavLink to="/dashboard">
              <div
                className={slectedItem == "1" ? "slectedItem" : "unslectedItem"}
              >
                داشبورد
              </div>
            </NavLink>
            <hr />
            <NavLink to="/report">
              <div
                className={slectedItem == "2" ? "slectedItem" : "unslectedItem"}
              >
                گزارشات
              </div>
            </NavLink>
            <hr />
            {/* <NavLink to="/pattern">
            <div
              className={slectedItem == "3" ? "slectedItem" : "unslectedItem"}
            >
              الگو و مجوزهای تردد
            </div>
          </NavLink>
          <hr />
          <NavLink to="/groups">
            <div
              className={slectedItem == "4" ? "slectedItem" : "unslectedItem"}
            >
              گروه ها و سازمان ها
            </div>
          </NavLink>
          <hr />
          <NavLink to="/trafic">
            <div
              className={slectedItem == "5" ? "slectedItem" : "unslectedItem"}
            >
              مدیریت تردد ها
            </div>
           
          </NavLink>
          <hr /> */}
            <div
              className={slectedItem == "6" ? "slectedItem" : "unslectedItem"}
            >
              تنظیمات
            </div>
            <hr />
            <div
              className={slectedItem == "7" ? "slectedItem" : "unslectedItem"}
            >
              تماس و پشتیبانی
            </div>
          </Row>
        </Col>

        <Col>{time.clock + " - " + time.date}</Col>
      </Row>
    </>
  );
};

export default SideBar;
