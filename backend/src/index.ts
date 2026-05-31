import { env } from "./config/env.js";
import { app } from "./app.js";

const { PORT } = env;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
