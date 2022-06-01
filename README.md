# Projecte-final
## Introducción
### Datos
- **Títulp del proyecto**: Tienda
- **Datos de los Autores**: Berta Vergés Rodríguez
- **Ciclo Formativo**: Desarrollo de aplicaciones web
- **Fecha de entrega**: 8 de junio de 2022
- **Link del Despliegue**:
- **Link del Proyecto**: 
### Descripción
### Objetivos
#### Objetivos de Software
- Este software pretende satisfacer la necesidad de una tienda online: Por una parte poder crear, modificar, ver y borrar ciertos elementos de una tienda (parte de gestión). Además, se trata de una aplicación en la cual a partir de items puedes crear packs, los cuales están a la venta. Las características de los packs se calculan (en el backend) en función de ciertas reglas de negocio, de manera que al crear o editar un pack no es necesario pensar en qué precio ponerle o qué stock queda, basta con añadir los items y hay una lógica por detrás que te genera los packs. Por otra parte poder comprar objetos y añadirlos a un carrito pudiendo calcular el precio final. Uno de los objetivos es hacer un software lo más usable y visualmente atractivo posible.
#### Objetivos personales
-  Dentro de los objetivos personales está el hecho de poder crear un software de cero por primera vez pudiendo tener una parte front y una parte back. Quería tocar todos los conocimientos aprendidos durante el curso: desarrollo de API rests, maquetación front (y fetch), programación funcional, localStorage... 
### Tecnologies
#### Front
- Para el front he usado el framework **Vue**.  Elegí Vue porque es el framework que más conocía (el único que habíamos llegado a tocar en clase), y me parece una manera de simplificar el trabajo y reusar código.
- **Vuetify** como librería de maquetación.  Vuetify me parece una librería muy fácil de usar y con componentes reusables y muy estéticos, no la había usado nunca y quería aprender a usarla. 
- HTML y CSS.
-  Como librería de validación en el front he usado **Vuelidate**
#### BACK
- Para el back he usado **node** y **express** porque creo que para un proyecto pequeño como este son suficientes y simplifican mucho la conexión a base de datos.
#### BASE DE DATOS
- La base de datos es una **MongoDB** -> porque es rápida y flexible. Además he reutilizado parte de un proyecto anterior, el cual ya estaba hecho con mongoDB, node  y express
## Desenvolupament de l’Aplicació
### Planificación
### Análisis previo
#### Modelo relacional.
Como he comentado anteriormente, he utilizado MongoDB. MongoDB es una base de datos **no relacional**. A pesar de ello, se pueden tener varias coleciones y "relacionarlas" (valga la contradicción con el nombre "no-relacional") mediante **referencias**. He utilizado esta opción, tengo dos colecciones, una de las cuales contiene referencias a la otra. A pesar de que así se pierde un poco el encanto que tiene MongoDB de manejarlo todo en un documento. Sin embargo, la decisión de tener dos colecciones fue más una decisión orientada al aprendizaje y a aprender cosas nuevas (ya que creo que en última instancia ese es el objetivo principal de ese proyecto) que una decisión con justificación técnica.

Visto que el proyecto trata de Packs que contienen **items**(en notación UML podríamos afirmar que es items y packs mantienen una relación de **agregación**) la asociación entre colecciones se da de la siguiente manera:
- Cada item tiene un id (además de otras propiedades como nommbre, stock, calidad, demanda, precio y material)
- Cada pack tiene ciertas propiedades que no implican relación (id, nombre,precio, calidad, stock). Por otro lado, también tiene una propiedad que SÍ implica "relación" (entendida como asociacion entre objetos) llamada "items". Esta propiedad es un array. El array contiene los ids de los items que vienen incluidos en el pack (recordemos que hemos dicho que los items tenían un id), y cada id hace referencia al objeto con esa id que está en la colección "items".  
    ![Modelo de composición](/doc/img/referencia-items.png)

### Disseny i implementació
### Producció
## Desplegament
## Resultats i conclusions
- Estoy muy contenta con la elección del framework y las librerías (Vuetify, Vuelidate). Aunque era el primer proyecto con VUe en el que aplicaba lógica, creo que puedo mejorar en temas de dominio del framework, y tengo muchas ganas de conocerlo más a fondo e investigar sin prisas.
- La elección de una base de datos no relacional no la repetiría.
Creo que con el tiempo que ha habido para terminar la aplicación he hecho un buen trabajo. Sin embargo, se han quedado puntos pendientes a incluir de cara a una fase 2:
- Poder añadir la foto al producto.
- Tal vez podría ser buena idea poder vender, editar y borrar los items (no solo los packs) -> Para ello habrá que migrar la base de datos a una relacional.
- Poder implementar la pasarela de pego y una compra real.
- El descuento que se aplica a la suma de los precios de los items al estar en un pack puede hacerse dinámico. Esto es: ahora mismo el descuento es un porcentaje fijo establecido (15%) se me ocurre que de cara a una fase dos se pueda elegir o modificar el descuento.
- Al comprar un elemento habría que comprobar que hay stock del mismo (no lo he implementado porque no he llegado a implementar las compras, pero sería algo a tener en cuenta).
- Faltan la autenticación y autorización. Las cuales son importantes para el proyecto y las he dejado para una fase dos porque aún tengo pendiente aprender sobre este tema.
## Bibliografia i webgrafia
Navbar -> https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
login -> https://codesandbox.io/s/0q4kvj8n0l
filtros -> https://codepen.io/yosafatade/pen/gyEKeW
icono shopping cart -> https://www.flaticon.com/free-icons/shopping-cart
