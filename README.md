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
* En el modelo de ordenes de trabajo devolver el tipo den entrada y salida de string a date
* Añadir permisos por roles
* Componentizar label container
* Cambiar nombre de modelo de gettoken a validar o autenticar
* Poner toast