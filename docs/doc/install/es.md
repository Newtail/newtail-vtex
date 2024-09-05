# Newtail Media APP VTEX

La instalación incluye los siguientes pasos:

**1** - Agregar la app como una dependencia del tema en el archivo `manifest.json`.

```json
  {
    "dependencies": {
      "vendor.newtail-media": "2.x"
    }
  }
```

**2** - Agregar el ID del publisher en la configuración de la app en el admin de VTEX.

**3** - Declarar los bloques de la app en el tema.

## Modo de Desarrollo

> 🚧 `vtex workspace use newtail`

Toda la implementación se realizará en el entorno de desarrollo. Usaremos el workspace newtail. Después de la validación, lo publicaremos en el entorno master de la tienda.

## Componentes Disponibles

1. `newtail-media-banner`  
   Este componente es responsable de la solicitud, visualización y gestión de eventos relacionados con anuncios de tipo banner. Mostrará un banner en el lugar designado.
2. `newtail-media-shelf`  
   Este componente es responsable de la solicitud, visualización y gestión de eventos relacionados con anuncios de tipo productos. Creará un carrusel de productos en el lugar designado utilizando componentes nativos de VTEX.
3. `newtail-media-search`  
   Este componente es responsable de gestionar resultados patrocinados en la búsqueda.
4. `newtail-media-conversion`  
   Este componente es responsable de gestionar eventos de conversión.

| Para más información, visita la página sobre los componentes. Allí podrás encontrar la documentación específica de cada uno y las propiedades que reciben a través de las propiedades del bloque o del editor del sitio.

## Mostrando Anuncios

Debemos agregar los componentes correspondientes en las páginas que mostrarán los anuncios y hacer los ajustes visuales necesarios.

> Es fundamental tener al menos un conocimiento básico de la declaración de bloques de VTEX.

**📘 Implementación**  
A continuación, usaremos la página de búsqueda como ejemplo.  
`store/blocks/search/`  

> El nombre del archivo puede variar según el tema si ha sido personalizado.

1. Agregar componentes de visualización de anuncios.

```json
{
  "newtail-media-search": {
    "props": {
      "placementName": "nome_do_placement"
    }
  },
  "newtail-media-banner": {
    "title": "Newtail Banner - search_header",
    "props": {
      "placementName": "search_header",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle",
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

2. Si hay variaciones en los componentes para manejar la capacidad de respuesta, sigue el mismo procedimiento.

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

## Notificando Conversión

**📘 Implementación**  

También necesitaremos agregar un componente en la página `OrderPlaced` para medir eventos de conversión.

1. Agregar el `newtail-media-conversion` en el archivo de configuración de la página Order Placed `store/blocks/orderplaced.jsonc`.

> El nombre del archivo puede variar según el tema si ha sido personalizado.

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