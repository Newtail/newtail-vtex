# Integración Vtex

Guía de implementación del Newtail Media App VTEX - una aplicación de escaparate de Vtex para integrar tiendas que usan la plataforma Vtex y el servicio de anuncios Newtail.

---

La implementación consiste en llamar a la aplicación en algunas páginas de la tienda. Dentro de esta aplicación, tendremos componentes que tendrán dos funcionalidades principales: mostrar anuncios y gestionar eventos.

> 🚧 Develop mode: `workspace newtail`
> 
> 🚧 Toda la implementación se realizará en un entorno de desarrollo. Usaremos el espacio de trabajo newtail. Después de la validación, lo publicaremos en la versión mayor del tema.

***

## Etapas del desarrollo

1. Crear una clave API para acceder a los endpoints de consulta de productos de VTEX
2. Crear acceso para Vtex.io para permitir que Newtail cree un `workspace` y una aplicación privada
3. Integración (Catálogo y Aplicación de Anuncios en la tienda Vtex)
4. Homologación en el workspace newtail
5. Publicación de la Aplicación en Producción

## Instalación de la Aplicación en el Tema en un Entorno de Desarrollo

> 📘 Vendor
> 
> Recuerde cambiar el `vendor` al valor correcto.

1. Agregar al `manifest.json` la aplicación `{vendor}.newtail-media@2.x` dentro del **workspace** `newtail`
2. Agregar el `publisher id` en las configuraciones de la aplicación a través del panel administrativo.

## Componentes de Visualización de Anuncios

1. `newtail-media-banner`  
   Este componente es responsable de la solicitud, visualización y gestión de eventos relacionados con los anuncios tipo banner. Mostrará un banner en el lugar donde se inserte.
2. `newtail-media-shelf`  
   Este componente es responsable de la solicitud, visualización y gestión de eventos relacionados con los anuncios tipo producto. Creará un carrusel de productos en el lugar donde se inserte.
3. `newtail-media-search`  
   Este componente es responsable de gestionar los resultados patrocinados en la búsqueda.
4. `newtail-media-conversion`  
   Este componente es responsable de la gestión del evento de conversión.

***

## Visualización de Anuncios

### Agregar Componentes en las Páginas que Mostrarán los Anuncios

> 📘 Implementación
> 
> A continuación, usaremos el ejemplo con la página de búsqueda.

1. Agregar componentes de visualización de anuncios en el archivo de configuración de la página de búsqueda `store/blocks/search/`

> El nombre del archivo puede variar de un tema a otro en caso de que haya personalización.

```json
{
  "newtail-media-search": {
    "props": {
      "placementName": "nome_do_placement"
    }
  },
  "store.search": {
    "blocks": [
      "newtail-media-banner",
      "newtail-media-shelf",
      "search-result-layout"
    ],
  },
	// ...
  "search-result-layout.desktop": {
    "children": [
      "newtail-media-search",
      "others-children"
    ],
  },
}
```

2. En caso de que haya variación de componentes para resolver la responsividad, realizar el mismo procedimiento

```json
{
  "my-mobile-search-component": {
    "props": {},
    "children": [
      "newtail-media-banner",
      "newtail-media-shelf",
      "another-children"
    ]
  }
}
```

***

## Agregar Componente de Conversión

### Implementación del Componente

También necesitaremos agregar un componente en la página `OrderPlaced` para medir eventos de conversión.

1. Agregar el `newtail-media-conversion` en el archivo de configuración de la página Order Placed`store/blocks/orderplaced.jsonc`

> O nome do arquivo pode variar de tema para tema caso tenha customização.

```json
{
  "store.orderplaced": {
    "blocks": [
      "order-placed",
      "newtail-media-conversion"
    ]
  }
}
```