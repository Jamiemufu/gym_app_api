import { app, initializeApp } from "./app";

const startServer = async () => {
  await initializeApp();
  // TODO DO NOT MAKE TO PRODUCTION
  const PORT = process.env.NODE_ENV === "test" ? 3001 : 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
