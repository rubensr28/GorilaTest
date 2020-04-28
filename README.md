# AngularHttp

Esse projeto foi gerado utilizando-se da tecnologia [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Para Testá-lo

1. Rode `npm install` na raiz do projeto para instalar a node modules.
2. Rode `ng serve` para inicia a aplicação;
3. Vá ao endereço `http://localhost:4200/`.

## Funcionalidades

A aplicação exibe todos os dados do portifolio do cliente,sem alicar nenhum filtro, em uma tabela.

## Observações

1. Foi feito o desenvolvimento do metodo POST para Ações, porém apesar de retornar codigo 200 durante a chamada, a inserção não ocorre, exibindo a seguinte mensagem: `ErrorMessage: "Not allowed to insert trade".`
2. O token JWT foi chumbado no código após ser pego com a análise da chamada de login pelo DevTools. Acredito que isso possa gerar problemas caso o JWT expire.
