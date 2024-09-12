# newtail-media-app

The Newtail Media app provides components to implement Retail Media in a Vtex store.   

The app has a configuration field to enter the publisher id. The shelf, banner, and search components allow some edits via the site editor. The same edits can also be made via block declaration. The values from the site editor override the values declared in the block.

## Install
--- 
For more details on the installation, visit: [the documentation](https://newtail-media.readme.io/reference/newtail-media-app-install-en)    

## Available Blocks
---

| Block                        | Description      
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `newtail-media-banner`       | Component to render sponsored banners according to the page context. |
| `newtail-media-search`       | Component to handle search results. Adds a sponsored label to sponsored products and can reorder the results. |
| `newtail-media-shelf`        | Component to render a carousel of sponsored products according to the page context. |
| `newtail-media-conversion`   | Component to handle conversion events. |

## Block Properties
---
Block properties can be defined either through the site editor or directly in the block declaration in the theme. The priority will be given to the data entered in the site editor.

## Newtail Media Banner
---
`newtail-media-banner`

This component renders banners on the screen. It handles the page context and queries the Newtail ad server to check if there are available banners.

#### Properties via block `isLayout: true`
Properties provided only in the block's `json` definition inside the theme.

| Prop name       | Type     | Default value | Description      
| --------------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `placementName` | `string` | `placement_banner_default`      | Name of the placement used in the query. By default, 'placement_banner_default' will be used. Prefer the name registered on the ad platform.        
| `size`          | `string` | `banner`      | Image size to be requested. Same value registered on the retail media platform.
| `sizeMobile`    | `string` | `null`        | Image size to be requested when viewed on mobile devices. Same value registered on the retail media platform. If not provided, the desktop value will be used.
| `quantity`      | `number` | `1`           | Quantity of ads requested.         
| `categoryName`  | `string` | `null`        | Category name if you want to force segmentation.

#### Properties via site editor
Properties provided in the site editor.

| Prop name            | Type      | Default value | Description      
| -------------------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `active`             | `boolean` | `true`        | Indicates if the placement is active.         
| `placementNameAdmin` | `string`  | `null`        | Name of the placement used in the query.         
| `sizeAdmin`          | `string`  | `null`        | Image size to be requested. Same value registered on the retail media platform.
| `sizeMobileAdmin`    | `string`  | `null`        | Image size to be requested when viewed on mobile devices. Same value registered on the retail media platform. If not provided, the desktop value will be used.
| `quantityAdmin`      | `number`  | `null`        | Quantity of ads requested.         
| `categoryNameAdmin`  | `string`  | `null`        | Category name if you want to force segmentation.

## Newtail Media Search
---
`newtail-media-search`

This component should always be called within the search provider. It checks the search results, gathers the SKUs, and queries the Newtail ad server to identify which are sponsored. After obtaining the results, a tag indicating sponsorship is added to the corresponding item.

#### Properties via block `isLayout: true`
Properties available only in the block definition.

| Prop name                    | Type           | Default value          | Description                                                                                           |
| ---------------------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `quantity`                   | `number`       | `20`                   | Number of requested ads.                                                                            |
| `placementName`              | `string`       | `placement_search_default`               | Placement name used in the query. By default, 'placement_search_default' will be used. Prefer the name registered in the ad platform. |
| `tagText`                    | `string`       | `Sponsored`            | Text to be used in the tag. By default, it will be "Sponsored" with automatic translation.           |
| `tagClassname`               | `string`       | `newtail-sponsored-tag`| Class to be added to the HTML element of the tag.                                                    |
| `tagPosition`                | `[start,end]`  | `start`                | Indicates if the tag should be at the start or end of the product card.                             |
| `parentSearchSelector`       | `string`       | `.vtex-search-result-3-x-searchResultContainer #gallery-layout-container`         | Indicates the container that wraps the search result. We use the _store-theme_ default.              |
| `onlyFirstSKU`               | `boolean`      | `false`                | Indicates if we should look at only the main SKU or all related SKUs.                               |
| `sponsoredSkusAtTop`         | `boolean`      | `true`                 | Indicates if we should reorder the search result. This option should not be used with infinite scroll.|

#### Properties via site editor
Properties available in the site editor.

| Prop name                    | Type           | Default value   | Description                                                                                           |
| ---------------------------- | -------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| `quantityAdmin`              | `number`       | `null`          | Number of requested ads.                                                                            |
| `placementNameAdmin`         | `string`       | `null`          | Placement name used in the query.                                                                    |
| `tagTextAdmin`               | `string`       | `null`          | Text to be used in the tag. By default, it will be "Sponsored" with automatic translation.           |
| `tagClassnameAdmin`          | `string`       | `null`          | Class to be added to the HTML element of the tag.                                                    |
| `tagPositionAdmin`           | `[start,end]`  | `null`          | Indicates if the tag should be at the start or end of the product card.                             |
| `parentSearchSelectorAdmin`  | `string`       | `null`          | Indicates the container that wraps the search result. We use the _store-theme_ default.              |
| `onlyFirstSKUAdmin`          | `boolean`      | `null`          | Indicates if we should look at only the main SKU or all related SKUs.                               |

## Newtail Media Shelf
---
`newtail-media-shelf`    

This component creates a shelf with sponsored SKUs. It takes the page context and queries the Newtail ad server to retrieve sponsored SKUs. After the result, a query is made to the store catalog to build the product shelf.

#### Block props `isLayout: true`
Properties available only in the block definition.

| Prop name                    | Type           | Default value  | Description                                        |
| ---------------------------- | -------------- | -------------- | -------------------------------------------------- |
| `quantity`                   | `number`       | `20`           | Number of requested ads.                           |
| `placementName`              | `string`       | `placement_product_default`     | Placement name used in the query. By default, 'placement_product_default' will be used. Prefer the name registered in the ad platform.|
| `categoryName`               | `string`       | `null`         | Category name if you want to enforce segmentation. |

#### Site editor props
Properties available in the site editor.

| Prop name                    | Type           | Default value  | Description                                        |
| ---------------------------- | -------------- | -------------- | -------------------------------------------------- |
| `quantityAdmin`              | `number`       | `null`         | Number of requested ads.                           |
| `placementNameAdmin`         | `string`       | `null`         | Placement name used in the query.                  |
| `categoryNameAdmin`          | `string`       | `null`         | Category name if you want to enforce segmentation. |

## Newtail Media Conversion
`newtail-media-conversion`

This component is responsible for sending order data from the store to Newtail. It is used when there is no API integration doing this.
