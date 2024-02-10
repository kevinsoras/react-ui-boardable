import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import styles from "./styles.module.css";
import { authProvider } from "../../auth";

export async function action({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");
  let password = formData.get("password");

  try {
    await authProvider.login(username, password);
  } catch (error) {
    let errorMessage="Invalid login attempt"
    if (error.error) errorMessage = error.error.message;
    return {
      error:errorMessage,
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("from");

  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles["title-icon"]}
          src="src/assets/login-icon.svg"
          alt="Image Logo login"
        ></img>
        <h1 className={styles.title}>Welcome to Boardable</h1>
        <Form className={styles.form} method="POST">
          {redirectTo && (
            <input type="hidden" name="redirectTo" value={redirectTo} />
          )}
          <div className={styles["input-group"]}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder=""
              name="username"
              required
              className={styles.input}
            />
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              autoComplete=""
              id="password"
              type="password"
              name="password"
              required
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entering..." : "Login"}
          </button>
          {actionData?.error && (
            <p className={styles.error}>{actionData.error}</p>
          )}
        </Form>
        <div className={styles["content-link"]}>
          <a href="#">Create an account</a>
          <img src="src/assets/arrow-right.svg" alt="Arrow right"></img>
        </div>
      </div>
    </>
  );
}
export default Login;
