**Implementación del Ecosistema de Retail Media de Newtail**

# Sobre la Integración

La integración se compone de dos etapas: **[1] sincronización de catálogo** y **[2] implementación de la lógica** para el manejo de anuncios y eventos.

# 1 - Sincronización de Catálogo

Para sincronizar el catálogo, puedes integrarlo a través de **API** o **XML**.

1. **API** - Generar claves de API para la lectura del catálogo.
2. **XML** - Proporcionar un enlace al XML siguiendo el estándar de Google Shopping.

# 2 - Implementación de Anuncios

La implementación consiste en desarrollar toda la lógica y los componentes para mostrar anuncios y activar eventos: impresión, visualización, clic y conversión.

> 📘 Cómo hacer
> 
> Todos los endpoints y cargas útiles necesarios están disponibles en nuestra documentación en las secciones [Solicitud de anuncios](https://newtail-media.readme.io/reference/requisicao-de-anuncios) y [Notificación de eventos](https://newtail-media.readme.io/reference/notificacao-de-eventos).

> 👍 Extra
> 
> Proporcionamos un repositorio con un ejemplo de app de tienda para ayudar en el desarrollo - Newtail Media APP VTEX. Incluye componentes de banner, carrusel de productos y manejo de resultados de búsqueda utilizando componentes nativos de VTEX con toda la lógica para la solicitud y activación de eventos. Si es necesario, contáctanos para más información.

Si eliges la **implementación de Newtail**, habrá algunos pasos adicionales. No todos serán necesarios.

1. Crear usuarios de Newtail para acceso a VTEX.IO.
2. Instalar la app en el workspace newtail.
3. Dar acceso al tema para la instalación de los componentes (o instalar por cuenta propia).
4. Implementar los componentes de la APP en el tema.
5. Validar los componentes.
6. Publicar en producción.