const roomRouter = require("./lib/server_code/api/roomRoutes");
const { app } = require("./api_server");

app.use("/room", roomRouter);
