﻿# Instrucciones de ejecución

## Docker

### Clonar e iniciar submódulo

El código del backend de la aplicación se encuentra guardado en un [repositorio](https://github.com/aabarcam/ss-cat-facts-backend) aparte, y se añade a este mediante submódulos de git.

Para inicializar los archivos del proyecto, luego de clonar los archivos, puede ser necesario ejecutar el comando:

```
git submodule update --init
```

para obtener la última versión del backend.

### Ambiente de desarrollo

Para construir el proyecto con docker es necesario tener instalado [Docker Compose](https://docs.docker.com/compose/install/), y basta con ejecutar el comando:

```
docker compose up
```

Esto construye la imágenes del frontend y el backend de ser necesario, y levanta los contenedores con el proyecto en marcha. Finalmente, se debiese poder acceder a la aplicación web localmente en el puerto 8080. (http://localhost:8080)

### Tests

Los tests desarrollados prueban el funcionamiento del la API backend en Ruby on Rails.

Para ejecutar los tests existentes, basta con abrir una consola en el contenedor en ejecución, por ejemplo con el comando:

```
docker exec -ti <id-contenedor-backend> /bin/bash
```

Y en esta ejecutar el comando:

```
bin/rails test
```

Estos tests son también ejecutados mediante github actions cada vez que se actualiza la rama develop o main del repositorio en el backend.

# Decisiones de diseño

## Arquitectura

La versión del proyecto en el actual repositorio está construida a partir de un backend creado con Ruby on Rails, el cual sirve como API para servir información al frontend.

El frontend se desarrolló con Vue.js, gestionando las requests HTTP con axios.

El backend del proyecto utiliza SQLite como base de datos relacional, la cual es la opción por defecto al crear un proyecto en Ruby on Rails, y se juzgó que es suficiente para un proyecto de este tamaño.

## PMV

La [primera versión](https://github.com/aabarcam/ss-cat-facts-backend/tree/0f6a1fe2f2723c097c7eb92a849b5adf52f0d8ed) del proyecto, ubicada en el repositorio del backend con el tag de release versión 1.1 consiste en la aplicación pedida construida completamente en Ruby on Rails, utilizando las views para el propósito del frontend.

Esto debido a que se comenzó el desarrollo teniendo en cuenta el plazo límite de entrega, con lo cual se apuntó a alcanzar un producto mínimo viable que cumpliese con los requisitos pedidos, y luego extender el proyecto con los requerimientos menos escenciales.

Posteriormente, el repositorio del backend es actualizado a su [versión actual](https://github.com/aabarcam/ss-cat-facts-backend/tree/version.2.0) 2.0, la cual funciona como API y requiere el frontend desarrollado para funcionar. Los tests desarrollados fueron a su vez actualizados para probar la nueva funcionalidad de API del backend, sin utilizar Rails para renderizar vistas.

## Service objects

En el backend de Rails se utiliza el patrón de diseño Service Objects para comunicarse con la API externa CatFacts, creando un servicio que se encargue de aquella lógica. Esto separa esta lógica de la que manejan los controladores de Rails.

## Relación usuario y cat fact

Dado que no se quiere copiar toda la API de CatFacts en la base de datos del proyecto, se necesita una manera de relacionar un usuario con los CatFacts que le gustan. Se añade una tabla ```user_likes_cat_fact```, que actúa como relación de asociación entre la tabla de usuarios y los CatFacts, de cierta manera simulando que estos formen parte de otra tabla de la base de datos del proyecto. Esta tabla ```user_likes_cat_fact``` mapea usuarios a CatFacts utilizando el ID del usuario como una llave foránea, y una ID asignada a cada CatFact según la página en que se encuentra y su posición en ella. De esta manera, si alguna vez cambiara el formato de paginación de la API de CatFacts, los 'me gusta' de los usuarios debiesen seguir siendo los correctos.

Dado que CatFacts entrega el listado en varias páginas, para enseñar los CatFacts más populares, se decide enseñar los 10 con más me gusta y se busca en que página está cada uno según su ID. De esta manera se hacen a lo más 10 llamadas a la API externa, en lugar de 34 (páginas que hay actualmente) para obtener la totalidad de los CatFacts.

## Autenticación

En la primera versión del proyecto, cuando solo se utilizaba Rails, se autenticaba al usuario tan solo comparándolo con los registros de la base de datos.

Posteriormente, al momento de crear el frontend en Vue.js, se utiliza JWT para llevar a cabo la autenticación del usuario.

## Conexión API Cat Facts

Para simplificar un poco las llamadas a API externas se añade la Gem httparty. Se tomaron en cuenta otras alternativas como Faraday que ofrece mayor flexibilidad, pero dado el alcance del proyecto, se consideró que sería sobreingeniería de la solución.

## Testing

Para realizar testing de las llamadas a API externas hacia CatFacts, se añade la Gem Webmock al proyecto. Esta permite crear stubs que actúen en lugar de las llamadas http y así ejecutar los tests sin necesidad de conexión a internet ni dependiendo de la disponibilidad de la API de CatFacts.

## Control de versiones

Se mantiene el código en este repositorio de github, siguiendo la convención de ramas de [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/index.es_ES.html). Adicionalmente, el mensaje de cada commit intenta seguir las convenciones descritas en [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para mantener la claridad.
