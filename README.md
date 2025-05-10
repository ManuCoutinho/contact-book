Este projeto trás uma api para cadastro e gerenciamento de contato, por usuário. Podendo identificar cada endereço cadastrado, no mapa.

## :pushpin: Iniciando

Você precisará do [Node](https://nodejs.org/en) à partir da versão 22.x, instalado no seu ambiente.

Primeiro, instale as dependências e inicialize o servidor de desenvolvimento:

```bash
# instale as dependências
npm install

# gere e atualize as migrations do Prisma
npx prisma generate

npx prisma migrate

# inicialize o servidor de desenvolvimento
npm run dev

```

Abra [http://localhost:3000](http://localhost:3000) em seu browser para interagir com a aplicação.
