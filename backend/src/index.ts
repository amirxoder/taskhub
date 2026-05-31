import { env } from "./config/env.js";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

const { PORT } = env;

async function startSerer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      `Failed to start server: ${error instanceof Error ? error.message : error}`,
    );
    process.exit(1);
  }
}

startSerer();
