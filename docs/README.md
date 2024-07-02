📢 Use this project, [contribute](https://github.com/{OrganizationName}/{AppName}) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Newtail Media Vtex

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

[pt] O aplicativo Newtail Media tem a finalidade de fornecer componentes para implementar Retail Media em uma loja Vtex.      

[en] The Newtail Media app provides components to implement Retail Media in a Vtex store.      

[es] La aplicación Newtail Media proporciona componentes para implementar Retail Media en una tienda Vtex.


## Implementação completa do fluxo de Retail media
--- 

[pt] Para mais detalhes sobre a implementação no tema, acesse: [a documentação](https://newtail-media.readme.io/reference/vtex)      

[en] For more details on the implementation, visit: [the documentation](https://newtail-media.readme.io/reference/vtex)    

[es] Para más detalles sobre la implementación, visite: [la documentación](https://newtail-media.readme.io/reference/vtex)

## Configuration 

A configuração tem alguns passos:

**Step 1** - Adding the app as a theme dependency in the `manifest.json` file;

```json
  {
    "dependencies": {
      "vendor.newtail-media": "2.x"
    }
  }
```

**Step 2** - Adding publisher id on app config in the VTEX admin.

**Step 3** - Declaring the app's blocks in a given theme template or inside another block from the theme.

## Blocks
---

| Block name                   | Description      
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `newtail-media-search`       | Componente para tratar os resultados da busca. Adiciona um selo patrocinados nos produtos patrocinado e pode reodenar os resultados.
| `newtail-media-banner`       | Componente para renderizar banners patrocinados de acordo com o contexto da página.
| `newtail-media-shelf`        | Componente para renderizar uma carrossel de produtos patrocinados de acordo com o contexto da página.
| `newtail-media-conversion`   | Componente para tratar os eventos de conversão.


## Blocks props
---

As propriedades dos blocos podem ser definidas pelo site-editor ou diretamente pelo bloco. A prioridade será para os dados inseridos no site-editor.

### `newtail-media-search`
#### props block `isLayout: true`
Propriedades disponibilizadas apenas na definição do bloco.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantity`                   | `number`       | `20`                   | Quantidade de anúncios solicitados.         
| `placementName`              | `string`       | `search`               | Nome do placement usado na consulta.         
| `tagText`                    | `string`       | `Patrocinado`          | Texto que será usado na tag. Por padrão, será patrocinado com tradução automática.         
| `tagClassname`               | `string`       | `newtail-sponsored-tag`| Classe que será adicionada ao elemento HTML da tag.         
| `tagPosition`                | `[start,end]`  | `start`                | Indica se a tag estará no começo ou no final do card de produto.         
| `parentSearchSelector`       | `string`       | `in /settings`         | Indica o container que envolve o resultado da busca. Usamos o padrão do _store-theme_.         
| `onlyFirstSKU`               | `boolean`      | `false`                | Indica se devemos olhar apenas o SKU principal ou todos SKUs atrelados.
| `sponsoredSkusAtTop`         | `boolean`      | `true`                 | Indica se devemos reordenar o resultado de busca. Essa opção não deve ser usada com rolagem infinita.         

#### props admin
Propriedades disponibilizadas no site editor.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantityAdmin`              | `number`       | `20`                   | Quantidade de anúncios solicitados.         
| `placementNameAdmin`         | `string`       | `search`               | Nome do placement usado na consulta.         
| `tagTextAdmin`               | `string`       | `Patrocinado`          | Texto que será usado na tag. Por padrão, será patrocinado com tradução automática.         
| `tagClassnameAdmin`          | `string`       | `newtail-sponsored-tag`| Classe que será adicionada ao elemento HTML da tag.         
| `tagPositionAdmin`           | `[start,end]`  | `start`                | Indica se a tag estará no começo ou no final do card de produto.         
| `parentSearchSelectorAdmin`  | `string`       | `in /settings`         | Indica o container que envolve o resultado da busca. Usamos o padrão do _store-theme_.         
| `onlyFirstSKUAdmin`          | `boolean`      | `false`                | Indica se devemos olhar apenas o SKU principal ou todos SKUs atrelados.

### `newtail-media-banner`
#### props block `isLayout: true`
Propriedades disponibilizadas apenas na definição do bloco.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantity`                   | `number`       | `1`                    | Quantidade de anúncios solicitados.         
| `placementName`              | `string`       | `banner`               | Nome do placement usado na consulta.         
| `size`                       | `string`       | `desktop`              | Tamanho da imagem que deverá ser soliticado. Mesmo valor cadastrado na plataforma de retail media.

#### props admin
Propriedades disponibilizadas no site editor.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantityAdmin`              | `number`       | `1`                    | Quantidade de anúncios solicitados.         
| `placementNameAdmin`         | `string`       | `banner`               | Nome do placement usado na consulta.         
| `sizeAdmin`                  | `string`       | `desktop`              | Tamanho da imagem que deverá ser soliticado. Mesmo valor cadastrado na plataforma de retail media.

### `newtail-media-shelf`
#### props block `isLayout: true`
Propriedades disponibilizadas apenas na definição do bloco.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantity`                   | `number`       | `20`                    | Quantidade de anúncios solicitados.         
| `placementName`              | `string`       | `products`             | Nome do placement usado na consulta.         

#### props admin
Propriedades disponibilizadas no site editor.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantityAdmin`              | `number`       | `20`                   | Quantidade de anúncios solicitados.         
| `placementNameAdmin`         | `string`       | `products`             | Nome do placement usado na consulta.         


<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

