Ingeniería inversa · Eventbrite

Sitio de referencia: https://www.eventbrite.com
Historia: H1.1.
Herramientas utilizadas: Firefox DevTools y Google Chrome Lighthouse.

1. Estructura (pestaña Elements)

Durante la inspección del código HTML de Eventbrite se identificaron cinco bloques principales en la página de inicio:

GlobalHeader: encabezado principal y navegación.

HomePageBannerCarousel: sección del banner principal.

BrowseContainer: sección de categorías.

HomeBottomShelfContainer: sección donde se muestran eventos.

footer-section: sección inferior de la página.

En el encabezado se observaron etiquetas HTML como header, nav, div, a, svg y span. También se identificaron atributos como aria-label, data-testid y tabindex, utilizados para identificar elementos y proporcionar información adicional.

En el botón de búsqueda se encontró un elemento button de tipo button, acompañado de un icono SVG. El elemento incluye atributos relacionados con la accesibilidad, como aria-label y aria-hidden.

En las tarjetas de eventos se observó el uso de propiedades de Flexbox, entre ellas flex: 1 0 0%. También se identificó una regla CSS adaptable mediante una media query que comienza a aplicarse a partir de 792 píxeles de ancho.

Evidencias:

docs/img/01-estructura-general.png

docs/img/02-encabezado.png

docs/img/03-boton-busqueda.png

docs/img/04-tarjetas-imagenes.png

docs/img/10-responsive.png

Observación: Los nombres GlobalHeader, HomePageBannerCarousel, BrowseContainer, HomeBottomShelfContainer y footer-section corresponden a identificadores observados durante la inspección. No se consideran necesariamente etiquetas HTML.

2. Sistema de diseño (pestaña Elements -> Computed)

Durante la inspección de las tarjetas de eventos se identificaron los siguientes valores:

| Elemento                     | Valor observado                                               |
| ---------------------------- | ------------------------------------------------------------- |
| Color principal              | No determinado                                                |
| Color de fondo de la tarjeta | #fff                                                          |
| Color de texto observado     | #3a3a47                                                       |
| Tipografía de títulos        | font-size: 1.125rem, font-weight: 600, letter-spacing: 0.25px |
| Tipografía de texto          | Precio y fecha: font-size: 0.875rem, font-weight: 600         |
| Tamaño base del texto        | No determinado                                                |
| Espaciado típico             | padding: 16px                                                 |
| Radio de bordes              | No determinado                                                |

El título de las tarjetas utiliza un tamaño de 1.125 rem, equivalente a 18 píxeles tomando como referencia una raíz de 16 píxeles. El precio y la fecha utilizan 0.875 rem, equivalente a 14 píxeles bajo la misma referencia.

También se observó un fondo blanco en el contenedor de la tarjeta y un espaciado interno de 16 píxeles.

Evidencias:

- docs/img/04-tarjetas-imagenes.png
- docs/img/05-tipografia-fondo.png
- docs/img/06-fondo-tarjeta.png
- docs/img/07-espaciado-tarjeta.png
- docs/img/08-precio-evento.png
- docs/img/09-fecha-evento.png

3. Red (pestaña Network)

Durante la inspección de la pestaña Network, utilizando el filtro Fetch/XHR, se identificaron solicitudes que permiten observar la comunicación entre Eventbrite y sus servidores.

Una de las solicitudes relacionadas con la búsqueda utiliza la siguiente configuración:

URL: https://www.eventbrite.com/api/v3/destination/search/

Método HTTP: POST.

Código de respuesta: 200 (solicitud procesada correctamente a nivel HTTP).

En la pestaña Request se observó que el navegador envía un objeto JSON con los campos browse_surface, event_search, online_events_only, places, sort y expand_destination_events. Estos campos forman parte de los criterios y opciones utilizados durante la búsqueda.

En la pestaña Response se identificó un arreglo denominado results, que contiene información de los eventos encontrados. Entre las propiedades observadas en uno de sus elementos están name, summary, start_date, start_time, primary_venue_id, image_id y locations.

Resultado de la observación: Eventbrite utiliza solicitudes HTTP para enviar los criterios de búsqueda al servidor y recibir resultados estructurados en formato JSON. La respuesta contiene información que permite representar los eventos en la interfaz, como su nombre, descripción, fecha, hora, imagen y ubicación.

Evidencia: solicitud de búsqueda y respuesta JSON inspeccionadas mediante las herramientas de desarrollo del navegador.

4. Estado (pestaña Almacenamiento / Storage)

Durante la inspección de la pestaña Almacenamiento de Firefox se revisaron los parámetros de la URL, las cookies y el almacenamiento local de Eventbrite.

Parámetros de URL

Al realizar una búsqueda con el término «música», la dirección del sitio cambió a una ruta estructurada:

www.eventbrite.com/d/venezuela--miranda/musica/

Se observó que el término de búsqueda forma parte de la ruta de la URL y que, en esta búsqueda, no se utilizaron parámetros posteriores al símbolo `?`.

Cookies

En el dominio https://www.eventbrite.com se identificaron 45 cookies. Entre los nombres observados se encuentran:

- \_cs_id
- \_cs_s
- \_dd_s
- \_fbp
- \_ga_TOV...

No se copiaron los valores de las cookies, debido a que pueden contener identificadores o información asociada a la navegación.

LocalStorage

En el apartado Almacenamiento local se observó una tabla con las columnas Key y Value, que contenía aproximadamente 20 claves. Entre los nombres identificados aparecen location:, search:... y bsp-sdk-...

Resultado de la observación: Eventbrite utiliza rutas estructuradas para representar búsquedas y almacena información en cookies y LocalStorage del navegador. Estos mecanismos forman parte de la gestión del estado y de los datos utilizados durante la navegación. No se determinó la finalidad individual de cada cookie o clave.

5. Rendimiento y accesibilidad (pestaña Lighthouse)

Se realizó una auditoría de la versión móvil de Eventbrite mediante Lighthouse en Google Chrome.

Los resultados registrados fueron los siguientes:

| Métrica             | Sitio original | Mi versión |
| ------------------- | -------------- | ---------- |
| Rendimiento         | 39             | Pendiente  |
| Accesibilidad       | 85             | Pendiente  |
| Buenas prácticas    | 77             | Pendiente  |
| SEO                 | 69             | Pendiente  |
| LCP                 | 5.9 s          | Pendiente  |
| Total Blocking Time | 11,490 ms      | Pendiente  |

Estos resultados constituyen la referencia inicial para comparar posteriormente el rendimiento de la versión recreada.

Evidencia:

docs/img/13-lighthouse.png

6. Hallazgos
   | # | Hallazgo | Captura |
   |---|---|---|
   | 1 | La página de inicio presenta cinco bloques principales que organizan el encabezado, el banner, las categorías, los eventos y el pie de página. | 01-estructura-general.png |
   | 2 | El encabezado utiliza elementos HTML como header, nav, enlaces y elementos gráficos SVG. | 02-encabezado.png |
   | 3 | El botón de búsqueda utiliza un elemento button con un icono SVG y atributos relacionados con la accesibilidad. | 03-boton-busqueda.png |
   | 4 | Las imágenes de las tarjetas utilizan object-fit: cover, object-position y propiedades Flexbox para controlar su presentación. | 04-tarjetas-imagenes.png |
   | 5 | Los títulos de las tarjetas utilizan un tamaño de 1.125 rem, peso de fuente 600 y separación entre letras de 0.25 píxeles. | 05-tipografia-fondo.png |
   | 6 | El contenedor de la tarjeta presenta un fondo blanco, identificado mediante la propiedad --ContainerBgColor: #fff. | 06-fondo-tarjeta.png |
   | 7 | El contenedor de las tarjetas presenta un espaciado interno de 16 píxeles, observado mediante el modelo de caja. | 07-espaciado-tarjeta.png |
   | 8 | El precio de los eventos utiliza un tamaño de texto de 0.875 rem, peso 600 y color #3a3a47. | 08-precio-evento.png |
   | 9 | La fecha de los eventos utiliza un tamaño de texto de 0.875 rem, peso 600 y color #3a3a47. | 09-fecha-evento.png |
   | 10 | Se identificó una media query @media screen and (min-width: 792px) para aplicar estilos según el ancho de pantalla. | 10-responsive.png |
   | 11 | En una ejecución de la pestaña Network se registraron 481 solicitudes y 1.96 MB transferidos. Entre las solicitudes observadas se encontraron comunicaciones con servicios como analytics y rokt-api. | 11-network-solicitudes.png |
   | 12 | Firefox bloqueó una solicitud a analytics.tiktok.com mediante su protección contra rastreo mejorada, mostrando el error NS_ERROR_DOM_BLOCKED_BY_CLIENT. | 12-bloqueo-tiktok.png |
   | 13 | La auditoría móvil de Lighthouse registró 39 en rendimiento, 85 en accesibilidad, 77 en buenas prácticas y 69 en SEO. | 13-lighthouse.png |

7. Tres mejoras que hice en mi versión (H1.3)

Pendiente de implementación.

Las tres mejoras se definirán después de analizar los problemas verificables del sitio original y desarrollar la versión propia. Se documentarán junto con sus respectivas evidencias y la comparación de Lighthouse.
