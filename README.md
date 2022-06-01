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
### Objectivos
#### Objetivos de Software
- Este software pretende satisfacer la necesidad de una tienda online: Por una parte poder crear, modificar, ver y borrar ciertos elementos de una tienda (parte de gestión). Además, se trata de una aplicación en la cual a partir de items puedes crear packs, los cuales están a la venta. Las características de los packs se calculan (en el backend) en función de ciertas reglas de negocio, de manera que al crear o editar un pack no es necesario pensar en qué precio ponerle o qué stock queda, basta con añadir los items y hay una lógica por detrás que te genera los packs. Por otra parte poder comprar objetos y añadirlos a un carrito pudiendo calcular el precio final. Uno de los objetivos es hacer un software lo más usable y visualmente atractivo posible.
#### Objetivos personales
-  Dentro de los objetivos personales está el hecho de poder crear un software de cero por primera vez pudiendo tener una parte front y una parte back. Quería tocar todos los conocimientos aprendidos durante el curso: desarrollo de API rests, maquetación front (y fetch), programación funcional, localStorage... 
### Tecnologies
- Para el front he usado el framework **Vue** y **Vuetify** como librería de maquetación. Elegí Vue porque es el framework que más conocía (el único que habíamos llegado a tocar en clase), y me parece una manera de simplificar el trabajo y reusar código. Por otra parte Vuetify me parece una librería muy fácil de usar y con componentes reusables y muy estéticos. Como librería de validación en el front he usado **Vuelidate**
- Para el back he usado **node** y **express** porque creo que para un proyecto pequeño como este son suficientes y simplifican mucho la conexión a base de datos.
- La base de datos es una **MongoDB** -> porque es rápida y flexible. Además he reutilizado parte de un proyecto anterior, el cual ya estaba hecho con mongoDB, node  y express
## Desenvolupament de l’Aplicació
### Planificación
### Análisis previo
#### Modelo relacional.
Como he comentado anteriormente, he utilizado MongoDB. MongoDB es una base de datos **no relacional**. A pesar de ello, se pueden tener varias coleciones y "relacionarlas" (valga la contradicción con el nombre "no-relacional") mediante **referencias**. He utilizado esta opción, tengo dos colecciones, una de las cuales contiene referencias a la otra. A pesar de que así se pierde un poco el encanto que tiene MongoDB de manejarlo todo en un documento. Sin embargo, la decisión de tener dos colecciones fue más una decisión orientada al aprendizaje y a aprender cosas nuevas (ya que creo que en última instancia ese es el objetivo principal de ese proyecto) que una decisión con justificación técnica.
### Disseny i implementació
### Producció
## Desplegament
## Resultats i conclusions
## Bibliografia i webgrafia
Navbar -> https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
login -> https://codesandbox.io/s/0q4kvj8n0l
filtros -> https://codepen.io/yosafatade/pen/gyEKeW
icono shopping cart -> https://www.flaticon.com/free-icons/shopping-cart
