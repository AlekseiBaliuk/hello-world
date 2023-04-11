import { useState } from "react";
import { Form, Button } from "bootstrap-4-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const TripForm = () => {
  const [carNumber, setCarNumber] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [passengerCount, setPassengerCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tripData = {
      carNumber: carNumber,
      startLocation: startLocation,
      endLocation: endLocation,
      passengerCount: passengerCount,
    };

    try {
      const docRef = await addDoc(collection(db, "trips"), tripData);
      toast.info("Document written");

      setCarNumber("");
      setStartLocation("");
      setEndLocation("");
      setPassengerCount("");
    } catch (e) {
      toast.error("Error adding document: ", e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <label htmlFor="carNumber">Car Number:</label>
        <Form.Input
          type="text"
          id="carNumber"
          placeholder="Enter car number"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <label htmlFor="startLocation">Start Location:</label>
        <Form.Input
          type="text"
          id="startLocation"
          placeholder="Enter start location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <label htmlFor="endLocation">End Location:</label>
        <Form.Input
          type="text"
          id="endLocation"
          placeholder="Enter end location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <label htmlFor="passengerCount">Passenger Count:</label>
        <Form.Input
          type="number"
          id="passengerCount"
          placeholder="Enter end location"
          value={passengerCount}
          onChange={(e) => setPassengerCount(e.target.value)}
        />
      </Form.Group>

      <Button primary type="submit">
        Create Trip
      </Button>
    </Form>
  );
};

export default TripForm;
