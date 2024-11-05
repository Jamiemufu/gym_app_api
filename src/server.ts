import { app, initializeApp } from "./app";

const startServer = async () => {
  await initializeApp();
  const PORT = process.env.APP_PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
