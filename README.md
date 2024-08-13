# Bienvenido a la aplicación de The Weather Map App

# iniciando proyecto

>**Nota importante**: Es importante que hayas configurado el ambiente de desarrollo, si no lo haz hecho puedes dirigirte aca [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup), encontraras las instrucciones para poder crear una nueva aplicacion paso a paso, antes de proceder.

### Recomendaciones generales

-   Tener instalado una versino de node 18 o superior, se recomienda la la version 20.10.0, si no sabes la version puedes usar el siguiente comando en tu terminal```node -v```
-   Tener instalado el JDK version 17 o superior y configurarlo en la variale de entorno JAVA_HOME
-   Tener instalado el IDE Android Studio y configurar un emulador o bien conectar un equipo fisico el cual previamente debe estar habilitado en modo desarrollo
-   Tener una cuenta y APIKEY de Auth0 para la gestion de autenticacion del usuario
-   Tener una cuenta y APIKEY de la API de Google Map
-   Tener una cuenta y APIKEY de la API de [OpenWeatherMap](https://openweathermap.org/api)
-   Este proyecto se ha desarrollado enteramente para dispositivos Android


## Paso 1: Configurando las variables de entorno

Este proyecto necesita de 4 variables de entorno, en la raiz del proyecto se encuentra el template del .env

Variables:
##
```BASE_URL```       - Esta es la base de URL para la consulta de la api del clima
##
```APIKEY_WEATHER``` - Esta es la APIKEY del clima, la cual es necesaria para poder realizar las consultas
##
```AUTH0_DOMAIN```   - Este es el dominio que te otorga Auth0 para la gestión de la autenticacion
##
```AUTH0_APIKEY```   - Esta es la APIKEY que te otorga Auth0 para la gestión de la autenticacion


## Paso 2: Iniciar el servidor de Metro

Primero que todo deberas iniciar **Metro**, el empaquetador de javascript para React Native

Para inicializar Metro, corre el siguiente comando en tu terminal estando unicado en la raiz de tu proyecto React Native

```bash
# usando npm
npm start

# O usando Yarn
yarn start
```

## Paso 3: Inicializa la aplicación

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### Para Android

```bash
# usando npm
npm run android

# O usando Yarn
yarn android
```

Si todo sale correcto y el ambiente de desarrollo esta debidamente configurado segun la documentacion de React Native, veras la aplicación correr en el emulador de android siempre que hayas configurado un emulador desde el IDE Android Studio


Tambien puedes correr la app directamente desde el IDE de Android Studio

## Felicitaciones! :tada:

Has podido inicializar la app de The Weather Map App en React Native

## Funcionalidades

-   Gestión de usuario usando la API de Auth0
-   Uso de SQLite para almacenar en el dispositivo los datos principales, como la seión del usuario y los marcadores del mapa
-   Guarda un historial de las sesiones abiertas dentro de la Base de datos
-   Uso de la API de Google Map
-   interacción con el Mapa
-   Guardar Marcadores, y al hacerlo se genera un icono con la temperatura que marca la ubicacion que hayas guardado
-   Se abre un modal donde se podra ver información mas amplia y tener la opcion de Guardar en Base de datos o borrarla
-   Solo persistiran los marcadores que se haya guardado en base de datos
-   Se crea un listado de marcadores, los cuales al seleccionarlo se dirigira automaticamente al punto guardado
-   Tiene Float Action Button para salir de sesión, y en base de datos la sesion queda guardada pero como no activa

## Equipo desarrollador

Ramiro Grisales [Mi Perfil de Github](https://github.com/orimarselasirg)
