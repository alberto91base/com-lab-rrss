# Componente Lab Ejemplo

Estructura básica de un componente para el LAB

## Uso

Para poder crear un componente, primero nos bajamos esta estructura, y dentro de la carpeta SRC dejaremos el código de nuestro componente. En caso de utilizar dependencias aparte, se añadirán en su package.json y procederemos con un: 

```node
npm install
```

Las dependencias que necesita nuestro componente NO SE DEBEN COMPILAR, ya que usará las del propio proyecto, para ello, necesitamos añadir en el webpack.config.js, en la parte de externals, qué dependencias no debe compilar:

```json
externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'prop-types': {
       commonjs: 'prop-types',
       commonjs2: 'prop-types',
       amd: 'PropTypes',
       root: 'PropTypes',
    },
  },

```

Una vez dejemos todo nuestro código preparado, ejecutamos el siguiente comando:

```node
npm run build
```

Para que nuestro código lo interprete BABEL y lo transforme en la carpeta BUILD, los proyectos donde se utilice ese componente tiraran del código de esta carpeta para que funcione.

Una vez terminado, para poder usarlo en un componente desde el gitlab, la ruta que hemos de poner es la siguiente:

```json
"com-lab-rrss": "git+http://git.lab.rtve.es:20004/evoluciona/com-lab-rrss.git#version"

```

## Referencias
[Creando componentes en React y publicando en NPM](https://medium.com/canariasjs/creando-componentes-en-react-y-publicando-en-npm-16eee85f9fba)