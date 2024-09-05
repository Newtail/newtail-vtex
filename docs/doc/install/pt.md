# Newtail Media APP VTEX

A instalação conta com os seguintes passos:

**1** - Adicionar o app como uma dependência do tema no arquivo `manifest.json`.

```json
  {
    "dependencies": {
      "vendor.newtail-media": "2.x"
    }
  }
```

**2** - Adicionar o ID do publisher na configuração do app no admin da VTEX.

**3** - Declarar os blocos do app no tema.

## Modo desenvolvimento

> 🚧 `vtex workspace use newtail`

Toda implementação será feita em ambiente de desenvolvimento. Usaremos o workspace newtail. Após validação, publicaremos no ambiente master da loja.

## Componentes disponíveis

1. `newtail-media-banner`  
   Esse componente é responsável pela requisição, exibição e gerenciamento dos eventos relacionados aos anúncios do tipo banner. Ele exibirá uma banner no local que for inserido.
2. `newtail-media-shelf`  
   Esse componente é responsável pela requisição, exibição e gerenciamento dos eventos relacionados aos anúncios do tipo produtos. Ele montará um carrossel de produtos no local que for inserido usando componentes nativos VTEX.
3. `newtail-media-search`  
   Esse componente é responsável por gerenciar resultados patrocinados na busca.
4. `newtail-media-conversion`  
   Esse componente é responsável pelo gerenciamento dos eventos de conversão.

| Para saber mais, acesse a página sobre os componentes. Lá será possível encontrar a documentação específica de cada e as propriedades recebidas vida propriedades do bloco ou via site editor.

## Exibindo anúncios

Devemos adicionar os componentes correspondentes nas páginas que exibirão os anúncios e fazer os ajustes visuais necessários.

> É fundamental ter um conhecimento mínimo da declaração de blocos da VTEX.

**📘 Implementação**  
Abaixo usaremos a página de busca como exemplo.  
`store/blocks/search/`

> O nome do arquivo pode variar de tema para tema caso tenha customização.

1. Adicionar componentes de exibição de anúncios.

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

2. Caso tenha variação de componentes para resolver responsividade, fazer o mesmo procedimento.

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

## Notificando conversão

**📘 Implementação**  

Também vamos precisar adicionar um componente na página `OrderPlaced` para medir eventos de conversão.

1. Adicionar o `newtail-media-conversion` no arquivo de configuração da página Order Placed `store/blocks/orderplaced.jsonc`

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