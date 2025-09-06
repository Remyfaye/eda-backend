import app from "./app.js";
import config from "./config/index.js";
import { connectDB } from "./config/db.js";

async function start() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

start().catch((err) => {
  console.log("failed to start server", err);
  process.exit(1);
});
