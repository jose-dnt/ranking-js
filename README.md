# Gerenciador de Ranking Esportivo (CLI)

Uma ferramenta simples de linha de comando (Node.js) para gerenciar times, partidas e rankings esportivos. Este projeto fornece uma interface estruturada para registrar times, acompanhar resultados de partidas e visualizar rankings.

## Funcionalidades
- Registrar e remover times  
- Registrar e remover partidas  
- Atualizar automaticamente vitórias, derrotas e empates  
- Exibir rankings com pontos e estatísticas detalhadas  
- Menu interativo no terminal com navegação intuitiva  
- Visualização estilizada em caixas de texto  

## Requisitos
- Node.js 18 ou superior  
- Pacotes: `@inquirer/prompts`, `console-clear`, `yoctocolors-cjs`  

Instale as dependências via:

```bash
npm install
```

## Uso
Execute o script via Node.js:

```bash
node index.js
```

Use as setas (`↑ ↓`) para navegar pelos menus e `Enter` para selecionar opções.  

### Menus Disponíveis

#### Times

- **Registrar Time**: Adiciona um novo time com estatísticas iniciais  
- **Remover Time**: Remove um time do sistema  

#### Partidas

- **Registrar Partida**: Escolha dois times e defina o vencedor ou empate  
- **Remover Partida**: Exclui uma partida registrada e atualiza as estatísticas dos times  

#### Ranking

- Exibe o ranking ordenado por pontos (`Vitória = 3`, `Empate = 1`, `Derrota = 0`)  
- Mostra total de partidas, vitórias, empates, derrotas e aproveitamento  

#### Sair

- Encerra o programa com segurança  

## Observações
- Nomes de times devem ter até 50 caracteres e serem únicos  
- Resultados de partidas atualizam automaticamente as estatísticas dos times  
- Empates são exibidos como `=` e vitórias/derrotas como `>`/`<`  
- Todos os menus utilizam um layout em caixa para melhor visualização  

## Licença
MIT License. Livre para uso e modificação!
