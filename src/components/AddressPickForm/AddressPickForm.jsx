import React from "react";
import "./AddressPickForm.scss";
import { Field, useFormikContext } from "formik";
import { AntSelect } from "../CreateAntField/CreateAntField";
import { isRequired } from "../ValidateFields/ValidateFields";
import { useState } from "react";
import { useEffect } from "react";
import Fetch from "../../fetch";

const AddressPickForm = ({
  addressValues,
  setAddressValues,
  requiredFields = true,
  style,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);
  const formikProps = useFormikContext();

  if (!setAddressValues) {
    setAddressValues = (values) => {};
  }

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProvinces = async () => {
      try {
        const response = await Fetch(
          "GET",
          "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
        );
        setProvinces(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProvinces();

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    if (
      !provinces ||
      !formikProps.values.province ||
      !provinces.find((x) => x.name === formikProps.values.province)
    )
      return;

    const fetchCities = async () => {
      try {
        const response = await Fetch(
          "GET",
          "https://vn-public-apis.fpo.vn/districts/getByProvince",
          {
            provinceCode: provinces.find(
              (x) => x.name === formikProps.values.province
            ).code,
            limit: -1,
          }
        );
        setCities(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCities();

    return () => abortController.abort();
  }, [provinces, formikProps.values.province]);

  useEffect(() => {
    const abortController = new AbortController();
    if (
      !cities ||
      !provinces ||
      !formikProps.values.province ||
      !formikProps.values.city ||
      !cities.find((x) => x.name === formikProps.values.city)
    )
      return;

    const fetchWards = async () => {
      try {
        const response = await Fetch(
          "GET",
          "https://vn-public-apis.fpo.vn/wards/getByDistrict",
          {
            districtCode: cities.find((x) => x.name === formikProps.values.city)
              .code,
            limit: -1,
          }
        );
        setWards(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWards();

    return () => abortController.abort();
  }, [cities, formikProps.values.city, provinces, formikProps.values.province]);

  return (
    <div className="AddressPickForm">
      <Field
        component={AntSelect}
        name="province"
        label="Chọn tỉnh/thành phố"
        defaultValue={formikProps.values.province}
        validate={
          requiredFields ? isRequired("Tỉnh/thành phố") : (value) => false
        }
        submitCount={formikProps.submitCount}
        tokenSeparators={[","]}
        style={Object.assign({ width: "400px" }, style)}
        hasFeedback
        showSearch
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={
          provinces
            ? provinces
                .map((province) => ({
                  value: province.name,
                  label: province.name,
                }))
                .concat({ value: "", label: "Không" })
            : []
        }
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onSelect={(value) => {
          formikProps.setFieldValue("city", "");
          formikProps.setFieldValue("ward", "");
          setAddressValues({
            ...addressValues,
            province: value,
            city: "",
            ward: "",
          });
        }}
      />
      <Field
        component={AntSelect}
        name="city"
        label="Chọn thành phố/quận/huyện"
        defaultValue={formikProps.values.city}
        validate={
          requiredFields ? isRequired("Thành phố/quận/huyện") : (value) => false
        }
        submitCount={formikProps.submitCount}
        tokenSeparators={[","]}
        style={Object.assign({ width: "400px" }, style)}
        hasFeedback
        showSearch
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={
          cities
            ? cities
                .map((province) => ({
                  value: province.name,
                  label: province.name,
                }))
                .concat({ value: "", label: "Không" })
            : []
        }
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onSelect={(value) => {
          formikProps.setFieldValue("ward", "");
          setAddressValues({ ...addressValues, city: value, ward: "" });
        }}
      />
      <Field
        component={AntSelect}
        name="ward"
        label="Chọn phường/xã"
        defaultValue={formikProps.values.ward}
        submitCount={formikProps.submitCount}
        tokenSeparators={[","]}
        style={Object.assign({ width: "400px" }, style)}
        hasFeedback
        showSearch
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={
          wards
            ? wards
                .map((province) => ({
                  value: province.name,
                  label: province.name,
                }))
                .concat({ value: "", label: "Không" })
            : []
        }
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onSelect={(value) =>
          setAddressValues({ ...addressValues, ward: value })
        }
      />
    </div>
  );
};

export default AddressPickForm;
