# Newtail Media APP VTEX

The installation involves the following steps:

**1** - Add the app as a theme dependency in the `manifest.json` file.

```json
  {
    "dependencies": {
      "vendor.newtail-media": "2.x"
    }
  }
```

**2** - Add the publisher ID in the app configuration in the VTEX admin.

**3** - Declare the app's blocks in the theme.

## Development Mode

> 🚧 `vtex workspace use newtail`

All implementation will be done in the development environment. We will use the newtail workspace. After validation, we will publish it in the store's master environment.

## Available Components

1. `newtail-media-banner`  
   This component is responsible for requesting, displaying, and managing events related to banner-type ads. It will display a banner in the designated location.
2. `newtail-media-shelf`  
   This component is responsible for requesting, displaying, and managing events related to product-type ads. It will create a product carousel in the designated location using native VTEX components.
3. `newtail-media-search`  
   This component is responsible for managing sponsored search results.
4. `newtail-media-conversion`  
   This component is responsible for managing conversion events.

| For more information, visit the components page. There you can find specific documentation for each component and the properties they receive through block properties or via site editor.

## Displaying Ads

We must add the corresponding components to the pages that will display the ads and make the necessary visual adjustments.

> It is essential to have at least a basic understanding of VTEX block declaration.

**📘 Implementation**  
Below, we will use the search page as an example.  
`store/blocks/search/`  

> The file name may vary depending on the theme if it has been customized.

1. Add ad display components.

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

2. If there are variations in components to handle responsiveness, follow the same procedure.

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

## Notifying Conversion

**📘 Implementation**  

We will also need to add a component to the `OrderPlaced` page to track conversion events.

1. Add the `newtail-media-conversion` to the configuration file of the Order Placed page `store/blocks/orderplaced.jsonc`.

> The file name may vary depending on the theme if it has been customized.

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