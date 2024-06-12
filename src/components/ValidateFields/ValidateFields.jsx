import moment from "moment";

export const validateEmail = (value) => {
  let errors;

  if (!value) {
    errors = "Email đăng nhập không được bỏ trống";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    errors = "Email không hợp lệ";
  }

  return errors;
};

export const isRequired = (labelName) => (value) =>
  !value ? `${labelName} không được bỏ trống` : "";

export const validatePassword = (values) => {
  let error = "";
  const passwordRegex = /(?=.*[0-9])/;
  if (!values) {
    error = "Mật khẩu không được bỏ trống";
  } else if (values.length < 8) {
    error = "Mật khẩu phải dài ít nhất 8 kí tự";
  } else if (!passwordRegex.test(values)) {
    error = "Mật khẩu phải bao gồm ít nhất 1 chữ số (1-9)";
  }
  return error;
};

export const validateConfirmPassword = (pass, value) => {
  let error = "";
  if (pass) {
    if (pass !== value) {
      error = "Mật khẩu nhập lại không đúng";
    }
  }
  return error;
};

///
export const validateFullName = (value) => {
  let errors;

  if (!value) {
    errors = "Họ và tên không được bỏ trống";
  }
  return errors;
};

//export const isRequired = (value) => (!value ? "không được bỏ trống" : "");

export const dateFormat = "DD/MM/YYYY";
export const validateBirthDay = (value) => {
  let errors;

  if (!value) {
    errors = "Ngày sinh không được bỏ trống";
  } //
  else if (value >= Date.now()) {
    errors = "Ngày sinh không hợp lệ";
  }
  return errors;
};

export const validateGioiTinh = (value) => {
  let errors;

  if (!value) {
    errors = "Vui lòng chọn giới tính";
  }
  return errors;
};

export const validateDate = (value) => {
  let errors;

  if (!value) {
    errors = "Vui lòng chọn ngày khám";
  }
  return errors;
};

export const validateTime = (value) => {
  let errors;

  if (!value) {
    errors = "Vui lòng chọn giờ khám";
  }
  return errors;
};

export const validateDiaChi = (value) => {
  let errors;

  if (!value) {
    errors = "Địa chỉ không được bỏ trống";
  }
  return errors;
};

export const validateEmailBooking = (value) => {
  let errors;

  if (!value) {
    errors = "Email không được bỏ trống";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    errors = "Email không hợp lệ";
  }

  return errors;
};

export const validatePhoneNumber = (value) => {
  let errors;

  if (!value) {
    errors = "Số điện thoại không được bỏ trống";
  } else if (!/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
    errors = "Số điện thoại không hợp lệ";
  }
  return errors;
};

export const validateLat = (value) =>
  value && isFinite(value) && Math.abs(value) <= 90 ? "" : "Vĩ độ không đúng";

export const validateLng = (value) =>
  value && isFinite(value) && Math.abs(value) <= 180
    ? ""
    : "Kinh độ không đúng";
