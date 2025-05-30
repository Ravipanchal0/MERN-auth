import app from "./app.js";
import connectDb from "./db/connect.js";

connectDb();
const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
  console.log(`Server start at port ${PORT}`);
});
