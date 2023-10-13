import buildClient from "../api/build-client";

const app = ({ currentUser }) => {
  return currentUser ? <h1>Logged in </h1> : <h1>Not signed in</h1>;
};

app.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  console.log("Landing data");
  return data;
};

export default app;
