import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Radio,
  Pagination,
  Select,
  Row,
} from "antd";
import moment from "jalali-moment";
// import images
import carPride from "../assets/images/car-pride.jpg";
import carPridePlate from "../assets/images/carPlateDetected.jpg";
import ShowPlateSTR from "./ShowPlateSTR";
import { controller } from "../assets/controller/controller";
import { PopupMessage } from "./PopupMessage";
const PersianTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showOtherDescription, setShowOtherDescription] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [form] = Form.useForm();

  const { Option } = Select;

  const handlePageChange = (page) => {
    setPage(page);
    // You can handle the data fetching here based on the page number
    console.log(`Current page: ${page}`);
  };
  const columns = [
    {
      title: "ردیف",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "پلاک",
      dataIndex: "predicted_string",
      key: "predicted_string",
      render: (text) => <ShowPlateSTR plate={text} />,
    },
    {
      title: "تصویر پلاک",
      dataIndex: "cropped_plate_path",
      key: "cropped_plate_path",
      render: (text) => (
        <img src={text} alt="تصویر پلاک" style={{ width: "150px" }} />
      ),
    },
    {
      title: "تصویر خودرو",
      dataIndex: "raw_image_path",
      key: "raw_image_path",
      render: (text) => (
        <img src={text} alt="تصویر خودرو" style={{ width: "150px" }} />
      ),
    },
    {
      title: "تاریخ",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => (
        <>
          {moment(record.datetime, "YYYY-MM-DD-HH-mm-ss", true)
            .locale("fa")
            .format("jYYYY/jMM/jDD")}
        </>
      ),
    },
    {
      title: "ساعت",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => (
        <>
          {moment(record.datetime, "YYYY-MM-DD-HH-mm-ss", true)
            .locale("fa")
            .format("HH:mm:ss")}
        </>
      ),
    },
    {
      title: "اقدامات",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedRecord(record);
            setIsModalOpen(true);
          }}
        >
          ثبت تخلف
        </Button>
      ),
    },
  ];
  const handleModalOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        var my_payload = {
          id: selectedRecord.id,
          penaltytype: values.violation,
          location: values.route,
        };

        const response = await controller.setPenalty(my_payload);
        console.log(response);
        if (response.status < 250) {
          PopupMessage.openNotification(
            "bottom",
            " جریمه با موفقیت ثبت شد.",
            "Successful"
          );
          console.log("Form Submitted: ", values);
          form.resetFields();
          setShowOtherDescription(false);
          setIsModalOpen(false);
        } else {
          PopupMessage.openNotification("bottom", "خطا در ثبت جریمه", "Error");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleModalCancel = () => {
    form.resetFields();
    setShowOtherDescription(false);
    setIsModalOpen(false);
  };

  const handleReadPlates = async () => {
    const response = await controller.readPlatesDetail(page);

    if (response.status === 200) {
      console.log(response.json.plates);
      setData(response.json.plates);
      setCount(response.json.count);
    } else {
      console.error("Failed to fetch plates:", response.message);
    }
  };
  useEffect(() => {
    handleReadPlates();
  }, []);

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">لیست خودروها</div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        locale={{
          emptyText: "داده‌ای موجود نیست",
        }}
      />
      <Pagination
        current={page}
        pageSize={10} // Set your page size here
        total={count}
        onChange={handlePageChange}
        showSizeChanger={false} // Optional: hide page size changer if you don't need it
        style={{ marginTop: 16 }}
      />
      <Modal
        title="ثبت تخلف"
        visible={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="ثبت"
        cancelText="لغو"
      >
        {selectedRecord && (
          <div>
            <Row justify={"center"}>
              <img
                src={selectedRecord.cropped_plate_path}
                alt="تصویر پلاک"
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  marginBottom: "20px",
                }}
              />
            </Row>
            <Row justify={"center"}>
              <div style={{ width: "200px" }}>
                <ShowPlateSTR plate={selectedRecord.predicted_string} />
              </div>
            </Row>
          </div>
        )}
        <Form
          form={form}
          layout="vertical"
          initialValues={{ violation: "", route: "" }}
        >
          <Form.Item
            label="عنوان تخلف"
            name="violation"
            rules={[
              { required: true, message: "لطفاً عنوان تخلف را انتخاب کنید!" },
            ]}
          >
            <Radio.Group
              style={{ display: "block" }}
              onChange={(e) =>
                setShowOtherDescription(e.target.value === "سایر")
              }
            >
              <Radio style={{ display: "block" }} value="پارک ممنوع">
                پارک ممنوع
              </Radio>
              <Radio style={{ display: "block" }} value="عبور از چراغ قرمز">
                عبور از چراغ قرمز
              </Radio>
              <Radio style={{ display: "block" }} value="پارک دوبل">
                پارک دوبل
              </Radio>
              <Radio style={{ display: "block" }} value="عبور از محل ممنوع">
                عبور از محل ممنوع
              </Radio>
              <Radio style={{ display: "block" }} value="توقف در پیاده رو">
                توقف در پیاده رو
              </Radio>
              <Radio style={{ display: "block" }} value="صحبت با تلفن همراه">
                صحبت با تلفن همراه
              </Radio>
              <Radio
                style={{ display: "block" }}
                value="فاقد کمربند ایمنی راننده"
              >
                فاقد کمربند ایمنی راننده
              </Radio>
              <Radio
                style={{ display: "block" }}
                value="همراهان فاقد کمربند ایمنی"
              >
                همراهان فاقد کمربند ایمنی
              </Radio>
              <Radio style={{ display: "block" }} value="سایر">
                سایر
              </Radio>
            </Radio.Group>
          </Form.Item>
          {showOtherDescription && (
            <Form.Item
              label="توضیحات"
              name="otherDescription"
              rules={[
                { required: true, message: "لطفاً توضیحات را وارد کنید!" },
              ]}
            >
              <Input.TextArea rows={3} placeholder="توضیحات" />
            </Form.Item>
          )}
          <Form.Item
            label="معبر"
            name="route"
            rules={[{ required: true, message: "لطفاً معبر را انتخاب کنید!" }]}
          >
            <Select placeholder="انتخاب معبر">
              <Option value="خ بوعلی">خ بوعلی</Option>
              <Option value="خ باباطاهر">خ باباطاهر</Option>
              <Option value="میدان امام خمینی">میدان امام خمینی</Option>
              <Option value="سعیدیه بالا">سعیدیه بالا</Option>
              <Option value="شکریه">شکریه</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PersianTable;
