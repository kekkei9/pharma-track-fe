import React, { useState, useEffect } from "react";
import "./BookApTab1.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PickerForm from "../PickerForm/PickerForm";
import DoctorCardList from "../DoctorCardList/DoctorCardList";
import GoogleMapContain from "../GoogleMapContain/GoogleMapContain";
import Fetch from "../../fetch";
import { Form, Formik, Field } from "formik";
import AddressPickForm from "../AddressPickForm/AddressPickForm";
import { Modal, notification, Spin } from "antd";
import OpenDoctorCard from "../OpenDoctorCard/OpenDoctorCard";
import { useNavigate } from "react-router-dom";
import BackNextButton from "../BackNextButton/BackNextButton";
import DepartmentPick from "../DepartmentPick/DepartmentPick";
import { AntSelect } from "../CreateAntField/CreateAntField";

const BookApTab1 = (props) => {
  const navigate = useNavigate();
  const [InitDoctorData, setInitDoctorData] = useState([]);
  const [DoctorData, setDoctorData] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState([]);
  const [id_staff, setID] = useState(-1);
  const [time, setTime] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [addressValues, setAddressValues] = useState({
    province: "",
    city: "",
    ward: "",
    department: "",
  });

  const DepartmentData = [
    {
      name: "A",
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
    {
      name: "D",
    },
    {
      name: "E",
    },
  ];

  useEffect(() => {
    const abortController = new AbortController();

    if (!!localStorage.getItem("bookingState")) {
      navigate("/bookap3");
    }

    setIsLoading(true);
    const fetchDoctor = async () => {
      try {
        const [responseClinic, responseStaff] = await Promise.all([
          Fetch("GET", "https://pharma-track.onrender.com/api/v1/clinic/"),
          Fetch("GET", "https://pharma-track.onrender.com/api/v1/staff"),
        ]);
        const filteredDoctorList = responseStaff.filter((item) => {
          return item.type === "Bác sĩ";
        });
        setInitDoctorData(
          filteredDoctorList.map((doctor) => ({
            ...doctor,
            ...responseClinic.find((x) => x.id_clinic === doctor.id_clinic),
          }))
        );
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDoctor();

    return () => abortController.abort();
  }, [navigate]);

  useEffect(() => {
    setDoctorData(InitDoctorData);
  }, [InitDoctorData]);

  const openNotificationTime = () => {
    notification.error({
      message: "Lỗi",
      description: "Bạn vẫn chưa chọn Giờ",
    });
  };

  const openNotificationWithIcon = () => {
    notification.error({
      message: "Lỗi",
      description: "Bạn vẫn chưa chọn bác sĩ",
    });
  };

  const handleDoubleClick = () => {
    setCurrentDoctor(
      DoctorData.find((item) => {
        return item.id_staff === id_staff;
      })
    );
    showModal();
  };

  const handleDoubleClickMap = () => {
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (time === -1) {
      openNotificationTime();
      return false;
    } else {
      setDoctorData(InitDoctorData);
      setIsModalOpen(false);
      navigate("/bookap2", {
        state: {
          currentDoctor,
          time,
        },
      });
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClickBack = () => {
    navigate("/homepage");
  };

  const onClickNext = () => {
    if (id_staff === -1) {
      openNotificationWithIcon();
      return false;
    } else {
      setCurrentDoctor(
        DoctorData.find((item) => {
          return item.id_staff === id_staff;
        })
      );
      showModal();
    }
  };

  useEffect(() => {
    if (!!addressValues?.province)
      setDoctorData(
        InitDoctorData.filter((x) => x.province === addressValues.province)
      );
    else setDoctorData(InitDoctorData);

    if (!!addressValues?.city)
      setDoctorData((prev) =>
        prev.filter((x) => x.city === addressValues.city)
      );

    if (!!addressValues?.ward)
      setDoctorData((prev) =>
        prev.filter((x) => x.ward === addressValues.ward)
      );

    if (!!addressValues?.department)
      setDoctorData((prev) =>
        prev.filter((x) => x.department === addressValues.department)
      );
  }, [JSON.stringify(addressValues)]);

  const formDatas = [
    {
      title: "",
      placeholder: "Tên Tỉnh",
      items: "",
    },
    {
      title: "",
      placeholder: "Tên Quận/Huyện",
      items: "",
    },
    {
      title: "",
      placeholder: "Tên Loại Bệnh",
      items: "",
    },
  ];

  return (
    <div className="BookApTab1">
      <Tabs className="Tabs">
        <TabList className="Option tw-flex tw-max-w-3xl tw-mx-auto tw-mt-10 tw-text-lg tw-cursor-pointer tw-select-none">
          <Tab className="Option_1 tw-flex-1 tw-text-center tw-py-5 tw-rounded-none	">
            Chọn phòng khám theo bác sĩ
          </Tab>
          <Tab className="Option_2 tw-flex-1 tw-text-center tw-py-5 tw-rounded-none	">
            Chọn phòng khám theo vị trí
          </Tab>
        </TabList>
        <Spin spinning={isLoading} tip={"Loading..."}>
          <TabPanel>
            <div className="wrap-picker ">
              <div className="picker ">
                <Formik initialValues={addressValues}>
                  {(props) => (
                    <Form>
                      <AddressPickForm
                        addressValues={addressValues}
                        setAddressValues={setAddressValues}
                        requiredFields={false}
                        style={{
                          width: "200px",
                        }}
                        {...props}
                      />
                      <Field
                        component={AntSelect}
                        name="department"
                        label="Chọn Khoa"
                        validate={() => false}
                        tokenSeparators={[","]}
                        hasFeedback
                        showSearch
                        submitCount={props.submitCount}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={
                          DepartmentData
                            ? DepartmentData.map((department) => ({
                                value: department.name,
                                label: department.name,
                              })).concat({ value: "", label: "Không" })
                            : []
                        }
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onSelect={(value) =>
                          setAddressValues({
                            ...addressValues,
                            department: value,
                          })
                        }
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            <DoctorCardList
              DoctorData={DoctorData}
              handleDoubleClick={handleDoubleClick}
              id_staff={id_staff}
              setID={setID}
            />
            <Modal
              title="CHI TIẾT BÁC SĨ"
              open={isModalOpen}
              okType={"primary"}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1000}
              okButtonProps={{
                style: {
                  backgroundColor: "#4B56D2",
                  width: "120px",
                  height: "50px",
                  "margin-left": "24px",
                },
              }}
              cancelButtonProps={{
                style: {
                  width: "120px",
                  height: "50px",
                  "margin-right": "24px",
                },
              }}
              okText="Tiếp tục"
              cancelText="Quay lại"
            >
              <OpenDoctorCard
                currentDoctor={currentDoctor}
                time={time}
                setTime={setTime}
              />
            </Modal>
          </TabPanel>
          <TabPanel>
            <div className="tw-flex tw-justify-center tw-mt-6">
              <Formik initialValues={addressValues}>
                {(props) => (
                  <Form>
                    <Field
                      component={AntSelect}
                      name="department"
                      label="Chọn Khoa"
                      validate={(value) => false}
                      tokenSeparators={[","]}
                      hasFeedback
                      showSearch
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={
                        DepartmentData
                          ? DepartmentData.map((department) => ({
                              value: department.name,
                              label: department.name,
                            })).concat({ value: "", label: "Không" })
                          : []
                      }
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form>
                )}
              </Formik>
            </div>
            <div className="tw-mt-10">
              <GoogleMapContain
                DoctorData={DoctorData}
                handleDoubleClickMap={handleDoubleClickMap}
                currentDoctor={currentDoctor}
                setCurrentDoctor={setCurrentDoctor}
                id_staff = {id_staff}
                setID = {setID}
              />
              <Modal
                title="CHI TIẾT BÁC SĨ"
                open={isModalOpen}
                okType={"primary"}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                okButtonProps={{
                  style: {
                    backgroundColor: "#4B56D2",
                    width: "120px",
                    height: "50px",
                    "margin-left": "24px",
                  },
                }}
                cancelButtonProps={{
                  style: {
                    width: "120px",
                    height: "50px",
                    "margin-right": "24px",
                  },
                }}
                okText="Tiếp tục"
                cancelText="Quay lại"
              >
                <OpenDoctorCard
                  currentDoctor={currentDoctor}
                  time={time}
                  setTime={setTime}
                />
              </Modal>
            </div>
          </TabPanel>
        </Spin>
      </Tabs>
      <BackNextButton onClickBack={onClickBack} onClickNext={onClickNext} />
    </div>
  );
};

export default BookApTab1;
