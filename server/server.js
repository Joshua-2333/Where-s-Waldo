// server/server.js
const app = require("./app");

// ADD DEBUG ROUTES
const debugRouter = require("./routes/debug");
app.use("/debug", debugRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Using DB URL:", process.env.NODE_ENV, process.env.DATABASE_URL ? "Render DB" : "Local DB");

});
