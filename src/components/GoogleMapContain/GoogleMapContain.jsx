import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GoogleMapContain.scss";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import GetAddress from "../GetAddress/GetAddress";
import DoctorCard from "../DoctorCard/DoctorCard";
import BackNextButton from "../BackNextButton/BackNextButton";
import OpenDoctorCard from "../OpenDoctorCard/OpenDoctorCard";
import { Modal, notification } from "antd";

const libraries = ["places"];

const containerStyle = {
  width: "600px",
  height: "600px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const GoogleMapContain = ({
  DoctorData,
  handleDoubleClickMap,
  currentDoctor,
  setCurrentDoctor,
  id_staff,
  setID,
}) => {
  //declare variable
  const navigate = useNavigate();

  const [doctorState, setDoctorState] = useState(0);

  const location = GetAddress();

  // const [time, setTime] = useState(-1);

  //Google Map Handle
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXyl8cV0kbV42iLv6qmXmSU5wZie9F2n4",
    libraries,
  });

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  if (loadError) return <div>Error...</div>;

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="GoogleMapContain">
      <div className="container tw-flex tw-justify-center tw-items-center">
        <div className="GoogleMap">
          <Locate panTo={panTo} />
          <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            zoom={17}
            center={location.coordinates}
            options={options}
            onLoad={onMapLoad}
          >
            <MarkerF position={location.coordinates} />
            {DoctorData.map((doctor, index) => (
              <MarkerF
                position={{ lat: doctor.lat, lng: doctor.lng }}
                options={{
                  icon: `${process.env.PUBLIC_URL}/assets/cliniclogo.png`,
                }}
                onClick={() => {
                  setID(doctor.id_staff);
                  setCurrentDoctor(
                    DoctorData.find((item) => {
                      return item.id_staff === doctor.id_staff;
                    })
                  );
                  panTo({ lat: doctor.lat, lng: doctor.lng });
                }}
              />
            ))}
          </GoogleMap>
        </div>
        <div className="tw-ml-20">
          {Object.keys(currentDoctor).length === 0 ? (
            <DoctorCard
              {...DoctorData[0]}
              handleDoubleClick={handleDoubleClickMap}
            />
          ) : (
            <DoctorCard
              {...currentDoctor}
              handleDoubleClick={handleDoubleClickMap}
            />
          )}
        </div>
      </div>
    </div>
  );
};

function Locate({ panTo }) {
  const location = GetAddress();
  return (
    <button
      className="locate"
      onClick={() => {
        panTo(location.coordinates);
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/assets/currentlocation.png`}
        alt="location"
        width="40px"
        height="40px"
      />
    </button>
  );
}

export default GoogleMapContain;
