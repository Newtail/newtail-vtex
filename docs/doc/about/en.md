**Implementation of the Newtail Retail Media Ecosystem**

# About the Integration

The integration is composed of two stages: **[1] catalog synchronization** and **[2] implementation of the logic** for handling ads and events.

# 1 - Catalog Synchronization

To synchronize the catalog, you can integrate it via **API** or **XML**.

1. **API** - Generate API keys for catalog reading.
2. **XML** - Provide a link to the XML following the Google Shopping standard.

# 2 - Ad Implementation

The implementation involves developing all the logic and components to display ads and trigger events: impression, view, click, and conversion.

> 📘 How to do
> 
> All the necessary endpoints and payloads are available in our documentation under the sections [Ad Request](https://newtail-media.readme.io/reference/requisicao-de-anuncios) and [Event Notification](https://newtail-media.readme.io/reference/notificacao-de-eventos).

> 👍 Extra
> 
> We provide a repository with a storefront app example to assist in development - Newtail Media APP VTEX. It includes banner components, product carousel, and search result handling using native VTEX components with all the logic for requesting and triggering events. If needed, contact us for more information.

If you choose the **Newtail implementation**, there will be a few additional steps. Not all of them may be necessary.

1. Create Newtail users for access to VTEX.IO.
2. Install the app in the workspace newtail.
3. Grant access to the theme for component installation (or install them yourself).
4. Implement the APP components in the theme.
5. Validate the components.
6. Publish in production.