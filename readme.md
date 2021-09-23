# TypeScript Express API Bootstrap (base / project starter)

## Running the app

```
# install dependencies
npm install

# run in dev mode on port 3000
npm run dev

# generate production build
npm run build

# run generated content in dist folder on port 3000
npm run start
```

## Testing

### Jest with supertest

```
npm run test
```

## Linting

```
# run linter
npm run lint

# fix lint issues
npm run lint:fix
```

1. Con sus propias palabras explique que es una inyección de dependencias y para qué sirve

   R. La inyección de dependencia permite añadir funcionalidad a las clases para realizar operaciones mas complejas; por lo tanto, nos permite utilizar correctamente los principios SOLID ya que al inyectar depencias podemos mantener clases con responsabilidades únicas que dependen de otras clases que aportan la funcionalidad extra, sin la necesidad de hacer mas compleja la clase base.

2. Explique con sus propias palabras las diferencias entre asincrono y sincrono

   R. las funciones sincronas se ejecutan en el orden de como son invocadas o ejecutadas, mientras que las funciones asincronas esperan a que una data se ejecute, ya sea el resultado de esta positivo o negativo, para dar una respuesta. Estas funciones asincronas, al ejecutarse, van al final del stack de ejecución sin detener los demás procesos; un ejemplo de esto son las promesas y los callbacks.

3. Cual es la importancia del uso de promesas en un proyecto

   R. Son muy importantes ya que no siempre obtenemos la data que necesitamos en tiempo real, por tanto se necesita un mecanismo que ponga en pausa las peticiones mientras el resto del código funciona correctamente a la espera de la respuesta de la promesa; ya sea rechazada o exitosa, es fundamental para pedir data a apis remotas o consultas a la bases de datos.

4. Cual es la importancia de usar ORM dentro de un proyecto, ventaja y desventaja

   R. La ventaja del ORM es que permite hacer consultas de manera más sencilla con el leguaje de backend que se esté utilizando en el momento, además de agregar algunas funcionalidades que algunos motores de base de datos no tienen. La desventaja es que algunas veces no son tan eficientes como el sql puro, y la curva de aprendizaje es más elevada que el lenguaje sql que es estándar.

5. Que diferencia hay entre una base de datos SQL, NOSQL

   R. La principal diferencia es que las SQL tienen toda su data relacionada con otra mediante tablas, y por lo tanto los datos dependen uno de los otros; en cuanto a NOSQL la data no esta relacionada, y por lo tanto hay mas flexibilidad pero también es menos ordenada y puede existir redundancia de datos.

   Las SQL son más robustas y confiables debido al tiempo que tienen existiendo y el gran soporte que éstas tienen, y las NOSQL no son tan consistentes y puede afectar a la integridad de los datos.

   Las NOSQL no tienen una estandarización como si lo tiene las SQL.

   Las NOSQL tienden a ser más escalables con facilidad y mucho mas rápidas a la hora de hacer consultas cuando se manejan grandes cantidades de data.

6. Si hablo de colección y documentos me refiero a?

   R. En base de datos no relacionales documento es una entrada de datos derivado de un schema; ejemplo: una data de un usuario en un objeto tipo json. Una colección es un conjunto de documentos agrupados que representan un conjunto de data.

7. Si una aplicación está sacando error de CORS a que se está refiriendo?

   R. Es un error muy común a la hora de desarrollar páginas web que indica que todos los datos deben provenir de la misma fuente, es decir, corresponder al mismo servidor. Ésto muchas veces no es posible pero se puede configurar el backend y el frontend para que, si son de confianza, intercambien data evitando este error.

## prueba 1

url: http://localhost:3000/challenge/average
data de prueba: {"a":5,"b":50}

## prueba 2

url :http://localhost:3000/challenge/stringManipulation
data prueba: {"str":"hi! hi!"}

## prueba 3

url: http://localhost:3000/challenge/sumArray
data prueba :{"array":[1,2,3,6,9]}

## prueba 4

url: http://localhost:3000/challenge/transformArray
data prueba:{"array": [[56,1],["skf",2],[995,3],["p",4],[10,5]],"ordenament":"DESC"}

## prueba 5

url: http://localhost:3000/challenge/myCows
data prueba: {"data":[{"1":3,"2":4,"3":2,"4":3,"5":4},{"1":2,"2":3,"3":4,"4":5,"5":5},{"1":3,"2":2,"3":2,"4":1,"5":2},{"1":1,"2":1,"3":1,"4":1,"5":1},{"1":2,"2":3,"3":5,"4":2,"5":2},{"1":4,"2":3,"3":4,"4":5,"5":1},{"1":2,"2":2,"3":2,"4":2,"5":2}]}

- En data[i] decimos que i === dia de la semana,
  data[i][j]=== key nombre de la vaca y value produccion de leche diaria en litros ejemplo en "1":3 el 1 representa nombre o numero de la vaca y el 3 los litros de leche que dio ese dia

## prueba 6

url: http://localhost:3000/challenge/tracking
data de la prueba :

- http://localhost:3000/challenge/tracking/734380016861001
- http://localhost:3000/challenge/tracking/34380016861

## prueba 7

url:http://localhost:3000/challenge/arrayScore
data de la prueba: {"array":[1,2,3,4,5,78,98,101]}
