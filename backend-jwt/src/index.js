import { PORT } from './configs/env.js';
import { app } from './app.js';

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
