No teste E2E nós vamos testar como o frondEnd vai usar a nossa Api. No Teste E2E ele testa desde a rota ate a fanada do banco de dados
ou ate a ultima camada necessária para retornar os dados necessário, que o FrondEnd precisa.

Neste tipo de teste (E2E) é necessário que temos um banco de dados só para testes e outro para desenvolvimento. Outra opção melhor ainda
é separar o nosso banco de dados por suites de testes, ou seja existe uma forma que o nossos testes execute totalmente isolados, É muito importante que o teste E2E não tenha
interferência de outros teste que executaram antes dele, por exemplo um teste que cria um usuário não pode interferi no teste que eu vou lista o usuário.

Vitest
  test Environment

Para usar test Environment é precisos criar um pacote, com o nome vitest-environment-prisma

&nbsp;

---

&nbsp;

## Cria uma pasta dentro da pasta /prisma, com o nome vitest-environment-prisma
dentro desta pasta roda o comando
```npm
npm init -y
```

com isso vai criar um pacote que ele vai ficar hospedado na nossa própria maquina

&nbsp;

---

&nbsp;

## dentro da pasta /prisma/vitest-environment-prisma/
cria um arquivo com o nome prisma-test-environment

é no package.json, no main colocar o seguinte
```json
"main": "prisma-test-environment.ts",
```

este <b>main</b> basicamente significa que se um dia eu publicar este pacote, e a pessoa fazer um import deste pacote qual que é o arquivo padrão que vai vim no import

&nbsp;



```ts
import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('setup')

    return {
      async teardown() { // vai executar apos os meus teste executarem
        console.log('teardown')
      },
    }
  },
}

```

&nbsp;

---

&nbsp;

## Agora dentro _http/controller_ vamos testar os controllers

toda vezes que um teste de dentro da pasta http for executado, vai usar o ambiente que foi configurado acima, ele execute o mento **setup** é quando ele finalizar os teste ele execute o **teardown**.

```ts
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// este arquivo vai fazer com que o vitest recolhença as importações por exemplo @lib/...
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma'], // o 1 paramento, vai ser o caminho dos testes que eu quero que tenha este ambiente novo, 2 paramento precisa ser o ultimo nome da pasta vitest-environment-prisma
    ],
  },
})

```

agora acessar a pasta **vitest-environment-prisma** pelo terminal, e la dentro roda o seguinte comando.

```npm
npm link
```

&nbsp;

este comando vai criar um repositório local na minha maquina. E agora eu para a minha aplicação na pasta raiz, e eu posso instalar este pacote que **foi criado o link** na minha aplicação global.

```npm
npm link vitest-environment-prisma
```

&nbsp;
