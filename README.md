# newtail-media-app
[pt] O aplicativo Newtail Media tem a finalidade de fornecer componentes para implementar Retail Media em uma loja Vtex.      

[en] The Newtail Media app provides components to implement Retail Media in a Vtex store.      

[es] La aplicación Newtail Media proporciona componentes para implementar Retail Media en una tienda Vtex.


## Install
--- 

[pt] Para mais detalhes sobre a implementação no tema, acesse: [a documentação](https://newtail-media.readme.io/reference/vtex)      

[en] For more details on the implementation, visit: [the documentation](https://newtail-media.readme.io/reference/vtex)    

[es] Para más detalles sobre la implementación, visite: [la documentación](https://newtail-media.readme.io/reference/vtex)

## Components

### Newtail Media Shelf
`newtail-media-shelf`    

[pt] Este componente monta uma prateleira com os SKUs patrocinados. Ele pega o contexto da página e consulta o servidor de anúncios Newtail para obter SKUs patrocinados. Após o resultado, é feita uma consulta no catálogo da loja para montar a prateleira de produtos.

[en] This component creates a shelf with sponsored SKUs. It takes the page context and queries the Newtail ad server to get sponsored SKUs. After obtaining the results, it queries the store catalog to build the product shelf.

[es] Este componente crea una estantería con SKUs patrocinados. Toma el contexto de la página y consulta el servidor de anuncios de Newtail para obtener SKUs patrocinados. Después de obtener los resultados, consulta el catálogo de la tienda para construir la estantería de productos.

### Newtail Media Banner
`newtail-media-banner`      

[pt] Este componente renderiza banners na tela. Ele pega o contexto da página e consulta o servidor de anúncios Newtail para verificar se há banners disponíveis.

[en] This component renders banners on the screen. It takes the page context and queries the Newtail ad server to check for available banners.
[es] Este componente muestra banners en la pantalla. Toma el contexto de la página y consulta el servidor de anuncios de Newtail para verificar la disponibilidad de banners.

### Newtail Media Search
`newtail-media-search`      

[pt] Este componente deve ser chamado sempre dentro do provedor da busca. Ele verifica os resultados da busca, reúne os SKUs e consulta no servidor de anúncios Newtail quais estão patrocinados. Após o resultado, uma tag indicando patrocínio é adicionada ao item correspondente.

[en] This component should always be called within the search provider. It checks the search results, gathers the SKUs, and queries the Newtail ad server to identify which are sponsored. After obtaining the results, a tag indicating sponsorship is added to the corresponding item.

[es] Este componente debe ser llamado siempre dentro del proveedor de búsqueda. Verifica los resultados de la búsqueda, reúne los SKUs y consulta en el servidor de anuncios de Newtail cuáles están patrocinados. Después de obtener los resultados, se agrega una etiqueta que indica patrocinio al artículo correspondiente.

### Newtail Media Conversion
`newtail-media-conversion`      
[pt] Este componente é responsável por enviar para a Newtail dados sobre os pedidos feitos na loja. Serve quando não há uma integração de API fazendo isso.

[en] This component is responsible for sending order data from the store to Newtail. It is used when there is no API integration doing this.

[es] Este componente es responsable de enviar datos de pedidos de la tienda a Newtail. Se utiliza cuando no hay una integración de API haciendo esto.

## API settings
[pt] O aplicativo tem um campo de configuração para inserir o publiser id. Os componentes shelf, banner e search possibilitam algumas edições via site editor. As mesmas edições também poderão ser feitas via declaração de bloco. Os valores do site editor sobrepõem os valores declarados no bloco.

[en] The app has a configuration field to enter the publisher id. The shelf, banner, and search components allow some edits via the site editor. The same edits can also be made via block declaration. The values from the site editor override the values declared in the block.

[es] La aplicación tiene un campo de configuración para insertar el ID del publicador. Los componentes shelf, banner y search permiten algunas ediciones a través del site editor. Las mismas ediciones también se pueden hacer mediante declaración de bloques. Los valores del site editor sobrescriben los valores declarados en el bloque.