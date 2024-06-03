# WalletGO

WalletGO es una aplicación de gestión de ingresos y egresos personales. Te ayuda a llevar un control detallado de tus finanzas, permitiéndote registrar y categorizar tus ingresos y egresos, y proporcionándote una visión clara de tu situación financiera.

## Client

### Herramientas y Bibliotecas Utilizadas

- **React**: Framework de interfaz de usuario.
- **Axios**: Cliente HTTP para realizar peticiones al servidor.
- **React Icons**: Iconos para la interfaz de usuario.
- **React Router DOM**: Enrutamiento para la aplicación de una sola página (SPA).
- **SweetAlert2**: Biblioteca para crear alerts y diálogos personalizados.

## Server

### Herramientas y Bibliotecas Utilizadas

- **Express**: Marco de aplicación web para el servidor.
- **MySQL y MySQL2**: Bases de datos relacionales para almacenar datos.
- **Sequelize**: ORM para Node.js con soporte para varios dialectos de bases de datos.
- **Cors**: Middleware para permitir solicitudes de origen cruzado (CORS).
- **Morgan**: Middleware para el registro de solicitudes HTTP.
- **Bcryptjs**: Herramienta para cifrar contraseñas en formato hash
- **JSONWebToken**: Herramienta para la creación de tokes relacionadas con la autenticación

### Dependencias de Desarrollo

- **Nodemon**: Herramienta para reiniciar y ver los cambios en tiempo real del servidor durante el desarrollo.

## Antes de usar, instalar las siguientes herramientas para el correcto uso de la aplicación web

1. Contar MySQL instalado, ya sea WorkBench MySQL u otro gestor de base de datos, nosotros usamos Laragon
2. El proyecto esta realizado con el gestor de paquetes pnpm, en caso de no contar con el, ejecutar los siguientes pasos para habilitarlo

   2.1 Ejecutar el siguiente comando en la terminal de windows como administrador le permitira hacer uso de otros gestores de paquetes de Node js, en este caso pnpm que es el que buscamos habilitar
   
   ```bash
   corepack enable
   ```
   2.2 Seguido de esto actualizar pnpm a la versión mas reciente para un mejor funcionamiento
   
   ```bash
   corepack prepare pnpm@latest --activate
   ```

## Usage

1. 📥 Clona el repositorio:
   ```bash
   git clone https://github.com/user-sysc/mern-project-walletgo.git
   ```
2. Ingresa a la directorio client
   ```bash
   cd client/
   ```
3. Instala las dependencias necesarias
   ```bash
   pnpm install
   ```
4. Ingresa a la directorio server
   ```bash
   cd server/
   ```
5. Instala las dependencias necesarias
   ```bash
   pnpm install
   ```
6. Run on client/ and server/

   ```bash
   pnpm run dev
   ```
