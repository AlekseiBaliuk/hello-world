import React, { useEffect, useState } from "react";
import styles from "./EditUser.module.css";
import { getDoc, update } from "../../firebase";
import { Button } from "bootstrap-4-react/lib/components";

const EditUser = () => {
  const [usersData, setUsersData] = useState([]);
  // const [disabled, setDisabled] = useState(true);
  // const [role, setRole] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDoc();
        const docsArray = data.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            disabled: true,
          };
        });
        setUsersData(docsArray);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleClick = (id) => {
    setUsersData((prev) => {
      return prev.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            disabled: !user.disabled,
          };
        }
        return user;
      });
    });
  };

  const handleChange = (e, id) => {
    const value = e.target.value;
    setUsersData((prev) => {
      return prev.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            role: value,
          };
        }
        return user;
      });
    });
  };

  const handleSave = (id) => {
    const user = usersData.find((user) => user.id === id);
    const { role } = user;
    update(role, id);
    setUsersData((prev) => {
      return prev.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            disabled: true,
          };
        }
        return user;
      });
    });
  };

  return (
    <div className={styles.editWrapper}>
      <ul>
        {usersData &&
          usersData.map((user) => (
            <li className={styles.editList} key={user.id}>
              <p>Name: {Object.values(user.name)}</p>
              <p>Email: {Object.values(user.email)}</p>
              <p className={styles.editRole}>
                Role:
                <select
                  className={styles.editSelect}
                  disabled={user.disabled}
                  onChange={(e) => handleChange(e, user.id)}
                  defaultValue=""
                >
                  <option value="Водій">Водій</option>
                  <option value="Пасажир">Пасажир</option>
                  <option value="Диспетчер">Диспетчер</option>
                </select>
                {user.disabled ? (
                  <Button
                    className={styles.editButton}
                    primary
                    type="button"
                    onClick={() => handleClick(user.id)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    primary
                    type="button"
                    onClick={() => handleSave(user.id)}
                    disabled={user.role === ""}
                  >
                    Save
                  </Button>
                )}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EditUser;
