import React from "react";
import TripForm from "../../components/TripForm/TripForm";
import styles from "./AddTrip.module.css";

const AddTrip = () => {
  return (
    <div className={styles.tripWrapper}>
      <TripForm />
    </div>
  );
};

export default AddTrip;
