# Ejecutar

### Colocar variables de entorno
```env
DATABASE_CONNECTION_STRING=<string de conexión de postgresql>
```

### Instalar y ejecutar
```bash
npm install
npm run dev
```

# Por hacer
* Hacer bd idempotente
* Añadir permisos por roles
* Componentizar label container
* Cambiar nombre de modelo de gettoken a validar o autenticar
* Pasar rawquerys a views
* Tomar los datos del usuario en la autenticación e inyectarlo cómo segundo parámetro en el controlador