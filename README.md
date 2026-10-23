Esta API sirve para administrar una agenda de contactos, esta hecha con
Node.js y Express mostrados en clase.

Descargas:
Node.js
Express
express-validator
express-rate-limit
Helmet
CORS
Morgan

Requisitos
Node.js instalado
npm instalado
Postman para probar los endpoints

Instalar:
Clonar el repositorio y entrar a la carpeta

La API esta disponible en Postman:
GET

/contacts

Lista todos los contactos

GET

/contacts/:id

Obtiene un contacto por ID

POST

/contacts

Crea un contacto

PUT

/contacts/:id

Reemplaza un contacto

PATCH

/contacts/:id/favorite

Alterna el estado de favorito

DELETE

/contacts/:id

Elimina un contacto

GET

/contacts/stats/summary

Obtiene estadísticas de la agenda

Headers: 

Para consultar las estadisticas
x-client-id : postman-test

Para eliminar un contacto:
x-api-key: talendig-123

Validators:
1. El nombre debe tener entre 2 y 50 caracteres
2. El telefono 7 y 20 caracteres y con algunos caracteres permitidos como son +
3.El correo es opcional, pero debe ser valido si se proporciona
4.Las categorías permitidas son family, friends, work y other
5. no se permiten telefonos dobles o sea duplicados
6.Los errores se gestionan por middleware centralizado y se responden en formato JSON
7.Se utiliza limitación de solicitudes para cuidar las rutas contactos

Middleware:
La aplicación utiliza Helmet, CORS, Morgan, express.json(), requestTimer, requireClientId, validateApiKey, notFound, errorHandler y un limitador de solicitudes con Express Rate Limit.