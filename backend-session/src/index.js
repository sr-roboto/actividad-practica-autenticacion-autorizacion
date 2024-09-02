import { app } from './app.js';
import { PORT } from './configs/dotenv.js';

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
