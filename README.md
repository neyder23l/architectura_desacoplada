# Arquitectura desacoplada: Microservicios

Guía educativa responsive hecha con HTML, CSS y JavaScript nativos. No requiere instalación de dependencias.

## Ejecutar

Abre `index.html` en un navegador. También puedes servir la carpeta con cualquier servidor estático local.

## Video

Coloca el archivo en `video/microservicios.mp4` y cambia `videoSource` en `js/app.js` por:

```js
const videoSource = "video/microservicios.mp4";
```

Para usar otra ruta o URL de video, sustituye ese valor. Mientras `videoSource` esté vacío, se muestra el estado de contenido próximamente.

## Cuestionario

Las preguntas están en el arreglo `questions` de `js/app.js`. Cada elemento tiene `question`, cuatro textos en `options`, el índice de la opción correcta en `answer` (desde 0) y una `explanation`. Añade un elemento con esa misma estructura para incorporar otra pregunta; el cálculo de resultados se adapta a la cantidad configurada.
