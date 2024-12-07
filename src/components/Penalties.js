import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Pagination,
  Radio,
  Select,
  Row,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PopupMessage } from "./PopupMessage";
import carImage from "../assets/images/car-pride.jpg";
import plateImage from "../assets/images/carPlateDetected.jpg";
import ShowPlateSTR from "./ShowPlateSTR";
import { controller } from "../assets/controller/controller";
import moment from "jalali-moment";
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showOtherDescription, setShowOtherDescription] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();

  const handleModalCancel = () => {
    form.resetFields();
    setShowOtherDescription(false);
    setIsModalOpen(false);
  };

  const handleModalOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        var my_payload = {
          id: values.id,
          penaltytype: values.violation,
          location: values.route,
        };

        const response = await controller.updatePenalty(my_payload);
        console.log(response);
        if (response.status < 250) {
          PopupMessage.openNotification(
            "bottom",
            " جریمه با موفقیت بروزرسانی شد.",
            "Successful"
          );
          console.log("Form Submitted: ", values);
          form.resetFields();
          setShowOtherDescription(false);
          setIsModalOpen(false);
        } else {
          PopupMessage.openNotification("bottom", "خطا در بروزرسانی جریمه", "Error");
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const columns = [
    {
      title: "ردیف",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "معبر",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "نوع تخلف",
      dataIndex: "penaltytype",
      key: "penaltytype",
    },
    {
      title: "پلاک",
      dataIndex: "plate",
      key: "plate",
      render: (_, record) => (
        <>
          <ShowPlateSTR plate={record.platename} />
        </>
      ),
    },

    {
      title: "تصویر پلاک",
      dataIndex: "plate_image_path",
      key: "plate_image_path",
      render: (text) => <img src={text} alt="plate" style={{ width: 150 }} />,
    },
    {
      title: "تصویر ماشین",
      dataIndex: "raw_image_path",
      key: "raw_image_path",
      render: (text) => <img src={text} alt="car" style={{ width: 150 }} />,
    },

    {
      title: "تاریخ",
      dataIndex: "plate",
      key: "plate",
      render: (_, record) => (
        <>
          {record.datetime
            ? moment(record.datetime, "YYYY-MM-DD-HH-mm-ss", true)
                .locale("fa")
                .format("HH:mm:ss") +
              " " +
              moment(record.datetime, "YYYY-MM-DD-HH-mm-ss", true)
                .locale("fa")
                .format("jYYYY/jMM/jDD")
            : "-"}
        </>
      ),
    },
    {
      title: "اقدامات",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            ویرایش
          </Button>
          <Popconfirm
            title="آیا مطمئن هستید که می‌خواهید حذف کنید؟"
            onConfirm={() => handleDelete(record)}
          >
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              style={{ marginRight: 8 }}
            >
              حذف
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [initialValues, setinitialValues] = useState({
    violation: "",
    route: "",
    id: "",
  });
  const handleEdit = (record) => {
    setinitialValues({
      violation: record.penaltytype,
      route: record.location,
      id: record.id,
    });
    setIsModalOpen(true);
    console.log("Edit record:", record);
  };

  const handleDelete = async (record) => {
    console.log(record);
    const response = await controller.removePenalty(record.id);

    if (response.status < 250) {
      handleRadPenalties();
      PopupMessage.openNotification(
        "bottom",
        " جریمه با موفقیت حذف شد.",
        "Successful"
      );
    } else {
      PopupMessage.openNotification("bottom", " خطا در حذف جریمه!", "error");
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleRadPenalties = async () => {
    const response = await controller.readPenalties(currentPage);
    console.log(response.json);
    setData(response.json.plates);
    setCount(response.json.count);
  };

  useEffect(() => {
    handleRadPenalties();
  }, []);

  return (
    <div style={{ width: "100%" }} className="mine_card">
      <div className="mine_card_title">لیست جریمه‌ها</div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="key"
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={count}
        onChange={handlePageChange}
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
          initialValues={initialValues}
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

export default App;
