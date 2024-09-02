import { connectDB } from './db/db.js';
import { app } from './app.js';
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}/`);
});
