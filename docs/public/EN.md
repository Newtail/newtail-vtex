# Vtex Integration

Implementation guide for the Newtail Media App VTEX - a Vtex storefront app to integrate stores using the Vtex platform and the Newtail ad service.

---

The implementation consists of calling the application on some store pages. Within this application, we will have components with two main functionalities: displaying ads and managing events.

> 🚧 Develop mode: `workspace newtail`
> 
> All implementation will be done in a development environment. We will use the workspace newtail. After validation, we will publish it in the major version of the theme.


***

## Development Steps

1. Create an API key to access the VTEX product query endpoints
2. Create access for Vtex.io to allow Newtail to create a workspace and a private app
3. Integration (Catalog and Ad App in the Vtex store)
4. Approval in the newtail workspace
5. Publish the App in Production

## Installing the APP in the theme in a development environment

> 📘 Vendor
> 
> Remember to change the `vendor` to the correct value.

1. Add the app `{vendor}.newtail-media@2.x` to the `manifest.json` within the **workspace** `newtail`
2. Add the `publisher id` in the app settings via the admin panel.

## Ad Display Components

1. `newtail-media-banner`  
   This component is responsible for the request, display, and event management related to banner-type ads. It will display a banner at the location where it is inserted.
2. `newtail-media-shelf`  
   This component is responsible for the request, display, and event management related to product-type ads. It will create a product carousel at the location where it is inserted.
3. `newtail-media-search`  
   This component is responsible for managing sponsored results in the search.
4. `newtail-media-conversion`  
   This component is responsible for managing the conversion event.

***

## Ad Display

### Add Components to Pages that will Display Ads

> 📘 Implementation
> 
> Below we will use the example with the search page.

1. Add ad display components in the configuration file of the search page `store/blocks/search/`

> The file name may vary from theme to theme if there is customization.

```json
{
  "newtail-media-search": {
    "props": {
      "placementName": "placement_name"
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

2. If there are component variations to handle responsiveness, do the same procedure

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

## Add Conversion Component

### Component Implementation

We will also need to add a component on the `OrderPlaced` page to measure conversion events.

1. Add the `newtail-media-conversion` in the configuration file of the Order Placed page `store/blocks/orderplaced.jsonc`

> The file name may vary from theme to theme if there is customization.

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