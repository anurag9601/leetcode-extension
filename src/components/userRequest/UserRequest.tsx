import { FaUser } from "react-icons/fa6";
import styles from "./UserRequest.module.css";

const UserRequest = ({ text, index }: { text: string; index: number }) => {
  return (
    <div className={styles.userRequestContainer} key={index}>
      <div className={styles.userRequest}>
        <div className={styles.userIcon}>
          <FaUser />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default UserRequest;
