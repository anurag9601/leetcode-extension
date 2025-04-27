import styles from "./App.module.css";
import Form from "./components/form/Form";
import Logo from "./components/logo/Logo";

function App() {
  return (
    <div className={styles.popupContainer}>
      <Logo />
      <Form />
    </div>
  );
}

export default App;
