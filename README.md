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
* Cambiar nombre de modelo de gettoken a validar o autenticar
* Pasar rawquerys a views
* Tomar los datos del usuario en la autenticación e inyectarlo cómo segundo parámetro en el controlador
* Una sóla vista para las rutas con autenticación y sin props
* Fotos de personas
* Quitar la opcionalidad del name en input y select