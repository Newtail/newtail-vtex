# Integração Vtex

Guia de implementação do Newtail Media App VTEX - um vtex storefront app para integrar lojas que usam a plataforma Vtex e o serviço de anúncios Newtail.

---

A implementação consiste em chamar a aplicação em algumas páginas do loja. Dentro dessa aplicação teremos componente que terão duas principais funcionalidades: exibir anúncios e gerenciar eventos.

> 🚧 Develop mode: `workspace newtail`
> 
> Toda implementação será feita em ambiente de desenvolvimento. Usaremos o workspace newtail. Após validação, publicaremos na versão major do tema.

***

## Etapas do desenvolvimento

1. Criar chave de API para acesso aos endpoint de consulta de produtos da VTEX
2. Criar acesso para o Vtex.io para permitir a Newtail criar um workspace e um app privado
3. Integração (Catálogo e App de Anúncios na loja Vtex)
4. Homologação no workspace newtail
5. Publicação do App em Produção

## Instalação do APP no tema em ambiente de desenvolvimento

> 📘 Vendor
> 
> Lembre-se de alterar o `vendor` para o valor correto.

1. Adicionar ao `manifest.json` o app `{vendor}.newtail-media@2.x` dentro do **workspace** `newtail`
2. Adicionar o `publisher id` nas configurações do app via painel administrativo.

## Componentes de exibição de anúncio

1. `newtail-media-banner`  
   Esse componente é responsável pela requisição, exibição e gerenciamento dos eventos relacionados aos anúncios do tipo banner. Ele exibirá uma banner no local que for inserido.
2. `newtail-media-shelf`  
   Esse componente é responsável pela requisição, exibição e gerenciamento dos eventos relacionados aos anúncios do tipo produtos. Ele montará um carrossel de produtos no local que for inserido.
3. `newtail-media-search`  
   Esse componente é responsável por gerenciar resultados patrocinados na busca.
4. `newtail-media-conversion`  
   Esse componente é responsável pelo gerenciamento do evento de conversão.

***

## Exibição de anúncios

### Adicionar componentes nas páginas que exibirão os anúncios

> 📘 Implementação
> 
> Abaixo usaremos o exemplo com a página de busca.

1. Adicionar componentes de exibição de anúncios no arquivo de configuração da página de busca `store/blocks/search/`

> O nome do arquivo pode variar de tema para tema caso tenha customização.

```json
{
  "newtail-media-search": {
    "props": {
      "placementName": "nome_do_placement"
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

2. Caso tenha variação de componentes para resolver responsividade, fazer o mesmo procedimento

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

## Adicionar componente de conversão

### Implementação do componente

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