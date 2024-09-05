Implementação do ecossistema de Retail Media Newtail.

# Sobre a integração

A integração é composta por 2 etapas:  
**[1] sincronização de catálogo**  
**[2] implementação da lógica** de manipulação de anúncios e eventos.

# 1 - Sincronização de catálogo

Para sincronizarmos o catálogo pode integrar o catálogo via **API** ou via **XML**.

1. **API** - Gerar chaves de API para leitura do catálogo.
2. **XML** - Enviar link do XML com padrão Google Shopping.

# 2 - Implementação dos anúncios

A implementação consiste em desenvolver toda lógica e componentes para exibir anúncios e disparar os eventos: impressão, visualização, clique e conversão.   

> 📘 Como fazer
> 
> Todos os endpoints e payloads necessários constam na nossa documentação nas seções [Requisição de anúncios](https://newtail-media.readme.io/reference/requisicao-de-anuncios) e [Notificação de eventos](https://newtail-media.readme.io/reference/notificacao-de-eventos).

> 👍 Extra
> 
> Disponibilizamos um repositório com um exemplo de storefront app para auxiliar o desenvolvimento - Newtail Media APP VTEX. Ele conta com componentes de banner, carrosel de produtos e tratamento do resultadoo de busca usando componentes nativos VTEX com toda lógica de requisição e disparo de eventos. Se necessário, entre em contato para saber como.

Caso opte pela **implementação Newtail**, teremos alguns passos a mais. Nem todos serão necessários.

1. Criar usuários Newtail para acesso ao VTEX.IO.
2. Instalação do app no workspace newtail. 
3. Dar acesso ao tema para instalação dos componentes. (ou fazer instalação por conta própria)
4. Implementação dos componentes do APP no tema.
5. Validação dos componentes.
6. Publicação em produção.