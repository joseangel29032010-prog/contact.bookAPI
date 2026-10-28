Este proyecto consiste en una API para gestionar contactos, realizada con Node.js y Express. Permite registrar usuarios, iniciar sesión y manejar contactos, además de tener diferentes permisos según el rol de cada usuario.

¿Qué puede hacer?

Registrar usuarios e iniciar sesión.

Proteger las rutas usando JWT.

Guardar las contraseñas de forma segura con bcryptjs.

Crear, consultar, editar y eliminar contactos.

Organizar los contactos por categorías y marcarlos como favoritos.

Consultar estadísticas de los contactos.

Administrar los usuarios y cambiar sus roles.

Validar los datos y limitar los intentos de inicio de sesión.

Instalación

Primero, instala las dependencias:

npm install

Después, crea un archivo .env basándote en .env.example y configura las variables necesarias.

Para iniciar el servidor en modo desarrollo, ejecuta:

npm run dev

La API estará disponible en http://localhost:3000.

Pruebas

Utilicé Postman para probar las rutas y comprobar que las funciones principales trabajaran correctamente, incluyendo el inicio de sesión, la gestión de contactos y los permisos de los usuarios.

Nota

Los usuarios y los contactos se guardan en memoria, por lo que los datos se pierden cuando se reinicia el servidor.

