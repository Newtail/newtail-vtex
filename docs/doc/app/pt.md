# newtail-media-app

O aplicativo Newtail Media tem a finalidade de fornecer componentes para implementar Retail Media em uma loja Vtex.   

O aplicativo tem um campo de configuração para inserir o publiser id. Os componentes shelf, banner e search possibilitam algumas edições via site editor. As mesmas edições também poderão ser feitas via declaração de bloco. Os valores do site editor sobrepõem os valores declarados no bloco.

## Install
--- 
Para mais detalhes sobre a instalação no tema, acesse: [a documentação](https://newtail-media.readme.io/reference/newtail-media-app-install-pt)      

## Blocos disponíveis
---

| Bloco                        | Descrição      
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `newtail-media-banner`       | Componente para renderizar banners patrocinados de acordo com o contexto da página.
| `newtail-media-search`       | Componente para tratar os resultados da busca. Adiciona um selo patrocinados nos produtos patrocinado e pode reodenar os resultados.
| `newtail-media-shelf`        | Componente para renderizar uma carrossel de produtos patrocinados de acordo com o contexto da página.
| `newtail-media-conversion`   | Componente para tratar os eventos de conversão.

## Propriedades dos blocos
---
As propriedades dos blocos podem ser definidas pelo site-editor ou diretamente pela declaração do bloco no tema. A prioridade será para os dados inseridos no site-editor.

## Newtail Media Banner
---
`newtail-media-banner`

Este componente renderiza banners na tela. Ele manipula o contexto da página e consulta o servidor de anúncios Newtail para verificar se há banners disponíveis.

#### Propriedades via bloco `isLayout: true`
Propriedades disponibilizadas apenas na definição `json` do bloco dentro no tema.

| Prop name       | Type     | Default value | Description      
| --------------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `placementName` | `string` | `placement_banner_default`      | Nome do placement usado na consulta. Por padrão, será usado 'placement_banner_default'. Dê preferência ao nome cadastrado na plataforma de anúncios.        
| `size`          | `string` | `banner`      | Tamanho da imagem que deverá ser solicitado. Mesmo valor cadastrado na plataforma de retail media.
| `sizeMobile`    | `string` | `null`        | Tamanho da imagem que deverá ser solicitado quando visto em dispositivos mobile. Mesmo valor cadastrado na plataforma de retail media. Se não for informado, será usando o valor informado para 'desktop'.
| `quantity`      | `number` | `1`           | Quantidade de anúncios solicitados.         
| `categoryName`  | `string` | `null`        | Nome da categoria caso deseje forçar uma segmentação

#### Propriedades via site editor
Propriedades disponibilizadas no site editor.

| Prop name            | Type      | Default value | Description      
| -------------------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `active`             | `boolean` | `true`        | Indica se o placement está ativo.         
| `placementNameAdmin` | `string`  | `null`        | Nome do placement usado na consulta.         
| `sizeAdmin`          | `string`  | `null`        | Tamanho da imagem que deverá ser soliticado. Mesmo valor cadastrado na plataforma de retail media.
| `sizeMobileAdmin`    | `string`  | `null`        | Tamanho da imagem que deverá ser solicitado quando visto em dispositivos mobile. Mesmo valor cadastrado na plataforma de retail media. Se não for informado, será usando o valor informado para 'desktop'.
| `quantityAdmin`      | `number`  | `null`        | Quantidade de anúncios solicitados.         
| `categoryNameAdmin`  | `string`  | `null`        | Nome da categoria caso deseje forçar uma segmentação.

## Newtail Media Search
---
`newtail-media-search`

Este componente deve ser chamado sempre dentro do provedor da busca. Ele verifica os resultados da busca, reúne os SKUs e consulta no servidor de anúncios Newtail quais estão patrocinados. Após o resultado, uma tag indicando patrocínio é adicionada ao item correspondente.

#### Propriedades via bloco `isLayout: true`
Propriedades disponibilizadas apenas na definição do bloco.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantity`                   | `number`       | `20`                   | Quantidade de anúncios solicitados.         
| `placementName`              | `string`       | `placement_search_default`               | Nome do placement usado na consulta. Por padrão, será usado 'placement_search_default'. Dê preferência ao nome cadastrado na plataforma de anúncios.
| `tagText`                    | `string`       | `Patrocinado`          | Texto que será usado na tag. Por padrão, será patrocinado com tradução automática.         
| `tagClassname`               | `string`       | `newtail-sponsored-tag`| Classe que será adicionada ao elemento HTML da tag.         
| `tagPosition`                | `[start,end]`  | `start`                | Indica se a tag estará no começo ou no final do card de produto.         
| `parentSearchSelector`       | `string`       | `.vtex-search-result-3-x-searchResultContainer #gallery-layout-container`         | Indica o container que envolve o resultado da busca. Usamos o padrão do _store-theme_.         
| `onlyFirstSKU`               | `boolean`      | `false`                | Indica se devemos olhar apenas o SKU principal ou todos SKUs atrelados.
| `sponsoredSkusAtTop`         | `boolean`      | `true`                 | Indica se devemos reordenar o resultado de busca. Essa opção não deve ser usada com rolagem infinita.         

#### Propriedades via site editor
Propriedades disponibilizadas no site editor.

| Prop name                    | Type           | Default value   | Description      
| ---------------------------- | -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------- | 
| `quantityAdmin`              | `number`       | `null`          | Quantidade de anúncios solicitados.         
| `placementNameAdmin`         | `string`       | `null`          | Nome do placement usado na consulta.         
| `tagTextAdmin`               | `string`       | `null`          | Texto que será usado na tag. Por padrão, será patrocinado com tradução automática.         
| `tagClassnameAdmin`          | `string`       | `null`          | Classe que será adicionada ao elemento HTML da tag.         
| `tagPositionAdmin`           | `[start,end]`  | `null`          | Indica se a tag estará no começo ou no final do card de produto.         
| `parentSearchSelectorAdmin`  | `string`       | `null`          | Indica o container que envolve o resultado da busca. Usamos o padrão do _store-theme_.         
| `onlyFirstSKUAdmin`          | `boolean`      | `null`          | Indica se devemos olhar apenas o SKU principal ou todos SKUs atrelados.

## Newtail Media Shelf
---
`newtail-media-shelf`    

Este componente monta uma prateleira com os SKUs patrocinados. Ele pega o contexto da página e consulta o servidor de anúncios Newtail para obter SKUs patrocinados. Após o resultado, é feita uma consulta no catálogo da loja para montar a prateleira de produtos.

#### Propriedades via bloco `isLayout: true`
Propriedades disponibilizadas apenas na definição do bloco.

| Prop name                    | Type           | Default value          | Description      
| ---------------------------- | -------------- | ---------------------- | -------------------------------------------------------- | 
| `quantity`                   | `number`       | `20`                   | Quantidade de anúncios solicitados.         
| `placementName`              | `string`       | `placement_product_default`             | Nome do placement usado na consulta. Por padrão, será usado 'placement_product_default'. Dê preferência ao nome cadastrado na plataforma de anúncios.| `categoryName`               | `string`       | `null`                 | Nome da categoria caso deseje forçar uma segmentação

#### Propriedades via editor
Propriedades disponibilizadas no site editor.

| Prop name                    | Type           | Default value  | Description      
| ---------------------------- | -------------- | -------------- | ------------------------------------------------------- | 
| `quantityAdmin`              | `number`       | `null`         | Quantidade de anúncios solicitados.         
| `placementNameAdmin`         | `string`       | `null`         | Nome do placement usado na consulta.    
| `categoryNameAdmin`          | `string`       | `null`         | Nome da categoria caso deseje forçar uma segmentação


## Newtail Media Conversion
---
`newtail-media-conversion`

Este componente é responsável por enviar para a Newtail dados sobre os pedidos feitos na loja. Serve quando não há uma integração de API fazendo isso.
