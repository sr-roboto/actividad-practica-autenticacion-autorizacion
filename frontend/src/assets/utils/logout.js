// Manejar el cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
  const response = await fetch('http://localhost:4000/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  } else {
    window.location.href = '../../../index.html';
  }
});

const logout = async () => {
  const response = await fetch('http://localhost:4000/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  } else {
    window.location.href = '../../../index.html';
  }
};
