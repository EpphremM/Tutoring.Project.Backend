import "reflect-metadata";
import app from "./app";
import ENV from "./src/shared/dot_env/utility";
import intializeConnection from "./src/database/data.source";
const port = ENV.express_port || 3000;
intializeConnection();
app.listen(port, () => {
  console.log(`server is up and running... http://localhost:${port}`);
});
