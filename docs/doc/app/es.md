# newtail-media-app

La aplicación Newtail Media proporciona componentes para implementar Retail Media en una tienda Vtex.

La aplicación tiene un campo de configuración para insertar el ID del publicador. Los componentes shelf, banner y search permiten algunas ediciones a través del site editor. Las mismas ediciones también se pueden hacer mediante declaración de bloques. Los valores del site editor sobrescriben los valores declarados en el bloque.

## Install
--- 
Para más detalles sobre la instalación, visite: [la documentación](https://newtail-media.readme.io/reference/newtail-media-app-install-es)

## Bloques disponibles
---

| Bloque                       | Descripción      
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `newtail-media-banner`       | Componente para renderizar banners patrocinados según el contexto de la página. |
| `newtail-media-search`       | Componente para gestionar los resultados de búsqueda. Agrega una etiqueta de patrocinado a los productos patrocinados y puede reorganizar los resultados. |
| `newtail-media-shelf`        | Componente para renderizar un carrusel de productos patrocinados según el contexto de la página. |
| `newtail-media-conversion`   | Componente para gestionar los eventos de conversión. |

### Propiedades de los bloques
---
Las propiedades de los bloques pueden definirse a través del editor de sitios o directamente en la declaración del bloque en el tema. La prioridad se dará a los datos ingresados en el editor de sitios.

## Newtail Media Banner
---
`newtail-media-banner`

Este componente muestra banners en la pantalla. Toma el contexto de la página y consulta el servidor de anuncios de Newtail para verificar la disponibilidad de banners.

#### Propiedades vía bloque `isLayout: true`
Propiedades disponibles solo en la definición del bloque.

| Nombre de la Propiedad       | Tipo           | Default value         | Descripción                                                                                           |
| ---------------------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `quantity`                   | `number`       | `1`                    | Cantidad de anuncios solicitados.                                                                    |
| `placementName`              | `string`       | `banner`               | Nombre del placement usado en la consulta.                                                            |
| `size`                       | `string`       | `desktop`              | Tamaño de la imagen que debe solicitarse. Mismo valor registrado en la plataforma de retail media.    |
| `categoryName`               | `string`       | `null`                 | Nombre de la categoría si deseas forzar una segmentación.                                             |

#### Propiedades vía editor de sitios
Propiedades disponibles en el editor de sitios.

| Nombre de la Propiedad       | Tipo           | Default value          | Descripción                                                                                           |
| ---------------------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `quantityAdmin`              | `number`       | `null`                 | Cantidad de anuncios solicitados.                                                                    |
| `placementNameAdmin`         | `string`       | `null`                 | Nombre del placement usado en la consulta.                                                            |
| `sizeAdmin`                  | `string`       | `null`                 | Tamaño de la imagen que debe solicitarse. Mismo valor registrado en la plataforma de retail media.    |
| `categoryNameAdmin`          | `string`       | `null`                 | Nombre de la categoría si deseas forzar una segmentación.                                             |

## Newtail Media Search
---
`newtail-media-search`

Este componente debe ser llamado siempre dentro del proveedor de búsqueda. Verifica los resultados de la búsqueda, reúne los SKUs y consulta en el servidor de anuncios de Newtail cuáles están patrocinados. Después de obtener los resultados, se agrega una etiqueta que indica patrocinio al artículo correspondiente.

#### Propiedades vía bloque `isLayout: true`
Propiedades disponibles solo en la definición del bloque.

| Nombre de la Propiedad       | Tipo           | Default value          | Descripción                                                                                           |
| ---------------------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `quantity`                   | `number`       | `20`                   | Cantidad de anuncios solicitados.                                                                    |
| `placementName`              | `string`       | `search`               | Nombre del placement usado en la consulta.                                                            |
| `tagText`                    | `string`       | `Patrocinado`          | Texto que se usará en la etiqueta. Por defecto, será "Patrocinado" con traducción automática.         |
| `tagClassname`               | `string`       | `newtail-sponsored-tag`| Clase que se añadirá al elemento HTML de la etiqueta.                                                  |
| `tagPosition`                | `[start,end]`  | `start`                | Indica si la etiqueta debe estar al principio o al final de la tarjeta del producto.                  |
| `parentSearchSelector`       | `string`       | `.vtex-search-result-3-x-searchResultContainer #gallery-layout-container`         | Indica el contenedor que envuelve el resultado de la búsqueda. Usamos el Default value        del _store-theme_. |
| `onlyFirstSKU`               | `boolean`      | `false`                | Indica si debemos mirar solo el SKU principal o todos los SKUs relacionados.                         |
| `sponsoredSkusAtTop`         | `boolean`      | `true`                 | Indica si debemos reordenar el resultado de búsqueda. Esta opción no debe usarse con desplazamiento infinito. |

#### Propiedades vía editor de sitios
Propiedades disponibles en el editor de sitios.

| Nombre de la Propiedad       | Tipo           | Default value          | Descripción                                                                                           |
| ---------------------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `quantityAdmin`              | `number`       | `null`                 | Cantidad de anuncios solicitados.                                                                    |
| `placementNameAdmin`         | `string`       | `null`                 | Nombre del placement usado en la consulta.                                                            |
| `tagTextAdmin`               | `string`       | `null`                 | Texto que se usará en la etiqueta. Por defecto, será "Patrocinado" con traducción automática.         |
| `tagClassnameAdmin`          | `string`       | `null`                 | Clase que se añadirá al elemento HTML de la etiqueta.                                                  |
| `tagPositionAdmin`           | `[start,end]`  | `null`                 | Indica si la etiqueta debe estar al principio o al final de la tarjeta del producto.                  |
| `parentSearchSelectorAdmin`  | `string`       | `null`                 | Indica el contenedor que envuelve el resultado de la búsqueda. Usamos el Default value        del _store-theme_. |
| `onlyFirstSKUAdmin`          | `boolean`      | `null`                 | Indica si debemos mirar solo el SKU principal o todos los SKUs relacionados.                         |

### Newtail Media Shelf
---
`newtail-media-shelf`    

Este componente monta una estantería con los SKUs patrocinados. Toma el contexto de la página y consulta el servidor de anuncios Newtail para obtener los SKUs patrocinados. Tras el resultado, se realiza una consulta en el catálogo de la tienda para construir la estantería de productos.

#### Bloque propiedades `isLayout: true`
Propiedades disponibles solo en la definición del bloque.

| Nombre de la propiedad       | Tipo           | Default value     | Descripción                               |
| ---------------------------- | -------------- | ----------------- | ----------------------------------------- |
| `quantity`                   | `number`       | `20`              | Cantidad de anuncios solicitados.         |
| `placementName`              | `string`       | `products`        | Nombre del placement usado en la consulta.|
| `categoryName`               | `string`       | `null`            | Nombre de la categoría si se desea forzar una segmentación. |

#### Site editor propiedades
Propiedades disponibles en el editor de sitios.

| Nombre de la propiedad       | Tipo           | Default value     | Descripción                               |
| ---------------------------- | -------------- | ----------------- | ----------------------------------------- |
| `quantityAdmin`              | `number`       | `null`            | Cantidad de anuncios solicitados.         |
| `placementNameAdmin`         | `string`       | `null`            | Nombre del placement usado en la consulta.|
| `categoryNameAdmin`          | `string`       | `null`            | Nombre de la categoría si se desea forzar una segmentación. |

### Newtail Media Conversion
`newtail-media-conversion`

Este componente es responsable de enviar datos de pedidos de la tienda a Newtail. Se utiliza cuando no hay una integración de API haciendo esto.
