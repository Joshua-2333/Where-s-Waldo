const app = require("./app");

// ADD DEBUG ROUTES
const debugRouter = require("./routes/debug");
app.use("/debug", debugRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
