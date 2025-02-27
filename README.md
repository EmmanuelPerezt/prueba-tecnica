# prueba tecnica de inbest

esta es mi solucion hacia la prueba tecnica solicitada a continuacion describo un poco las caracteristicas

# Ejecucion del programa

para correr el programa puede ejecutar un 
```bash
docker-compose build
```
posteriormente un 
```bash
docker-compose up -d
```
la api corre en el puerto 3000 y puede visitar la documentacion de swagger en:
http://localhost:3000/api-docs


# preguntas

<h3> ¿Qué lenguaje y framework elegirías y por qué?</h3>
<p>para esta ocasion en el backend utilizamos node js con express ya que son tecnologias que domino bien</p>
<h3> o ¿Cómo estructurarías controladores y servicios en el framework elegido?</h3>
<p>en este caso el patron de diseño fue practicamente MVC creo que le da limpieza al proyecto y es adecuado/legible y escalable a largo plazo</p>
<h3> ¿Qué servicios en la nube usarías para almacenar imágenes?</h3>
<p>amazon s3 seria una opcion ideal en este caso</p>

<h3>¿Cómo implementarías la autenticación y autorización usando servicios en la
nube?</h3>

<p>se podria implementar OAauth para autentificar a los usuarios con su  credenciales de google/github</p>
<h3>¿Qué estructura de tablas usarías para gestionar usuarios, archivos y resultados
de análisis en Postgres?</h3>
<p>para este ejemplo al no ser un proyecto tan extenso creo que la tabla de usuarios y tracking puede ser suficiente</p>
<h3>¿Qué ORM utilizarías para mapear los modelos?</h3>
<p>para este proyecto use typeorm ya que se integra perfecto con nodejs</p>

<h3>¿Qué biblioteca o herramienta usarías y por qué?</h3>
<p>use sharp ya que es una libreria muy facil de usar y muy rapida, por lo que puse adecuarme a ella rapidamente</p>
<h3>¿Cómo optimizarías el procesamiento de imágenes para alto rendimiento?</h3>
<p>se podria distribuir el procesamiento de las imagenes en multiples hilos, asi como compirmir las imagenes</p>

<h3>¿Cómo escalarías la aplicación para manejar un incremento en la carga de
trabajo?</h3>

<p>al ser un monolito la solucion de botepronto podria ser escalabilidad hacia arriba es decir aumentar los recursos del servidor, o escalabilidad hacia los lados, es decir crear mas instancias del mismo servicio, otra solucion seria modularizar la app en microservicios</p>


<h3>¿Qué herramientas o bibliotecas usarías para implementar el sistema de logging?</h3>
<p>al ser node js lo mas optimo y mas usaso seria usar winston</p>

# diagrama