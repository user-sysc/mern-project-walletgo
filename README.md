# WalletGO

WalletGO es una aplicación de gestión de ingresos y egresos personales. Te ayuda a llevar un control detallado de tus finanzas, permitiéndote registrar y categorizar tus ingresos y egresos, y proporcionándote una visión clara de tu situación financiera.

## Client

### Herramientas y Bibliotecas Utilizadas

- **React**: Framework de interfaz de usuario.
- **Axios**: Cliente HTTP para realizar peticiones al servidor.
- **React Icons**: Iconos para la interfaz de usuario.
- **React Router DOM**: Enrutamiento para la aplicación de una sola página (SPA).
- **SweetAlert2**: Biblioteca para crear alerts y diálogos personalizados.
- **js-cookie**: Biblioteca de JavaScript para manejar cookies en el lado del cliente.
- **prop-types**: Biblioteca de React para la comprobación de tipos en tiempo de ejecución.

## Server

### Herramientas y Bibliotecas Utilizadas

- **Express**: Marco de aplicación web para el servidor.
- **MySQL y MySQL2**: Bases de datos relacionales para almacenar datos.
- **Sequelize**: ORM para Node.js con soporte para varios dialectos de bases de datos.
- **Cors**: Middleware para permitir solicitudes de origen cruzado (CORS).
- **Morgan**: Middleware para el registro de solicitudes HTTP.
- **bcryptjs**: Biblioteca de JavaScript para cifrar y comparar contraseñas de manera segura.
- **jsonwebtoken**: Biblioteca de JavaScript que implementa el estándar JSON Web Tokens (JWT) para la transmisión segura de información.
- **cookie-parser**: Middleware de Node.js para analizar las cookies del cliente.

### Dependencias de Desarrollo

- **Nodemon**: Herramienta para reiniciar y ver los cambios en tiempo real del servidor durante el desarrollo.

## Antes de usar, instalar las siguientes herramientas para el correcto uso de la aplicación web

1. Contar con MySQL instalado, ya sea [MySql WorkBench](https://www.mysql.com/products/workbench/) u otro gestor de base de datos, nosotros usamos [Laragon](https://laragon.org/).
2. Yo uso [pnpm](https://pnpm.io/installation) como gestor de dependencias y empaquetador., en caso de no contar con el, ejecutar los siguientes pasos para habilitarlo

   2.1 Ejecutar el siguiente comando en la terminal le permitira hacer uso de otros gestores de paquetes de Nodejs y actualizarlo, en este caso pnpm que es el que buscamos habilitar.

   ```bash
   # Activa pnpm en MacOS, WSL & Linux:
   corepack enable
   corepack prepare pnpm@latest --activate
   ```

   2.2 Para comprobar que ya contamos con el gestor de paquetes habilitado:

   ```bash
   pnpm --version
   ```

## Usage

1. 📥 Clona el repositorio:
   ```bash
   git clone https://github.com/user-sysc/mern-project-walletgo.git
   ```
2. Ingresa a la directorio client:
   ```bash
   cd client/
   ```
3. Instala las dependencias necesarias:
   ```bash
   pnpm install
   ```
4. Ingresa a la directorio server:
   ```bash
   cd server/
   ```
5. Instala las dependencias necesarias:
   ```bash
   pnpm install
   ```
6. Run on client/ and server/
   ```bash
   pnpm run dev
   ```
