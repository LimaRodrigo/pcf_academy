## HOOKS ESSENTIAL

### useState
Hook para manter estado local em um componente funcional; atualizações re-renderizam o componente.
**Quando usar?**: controlar o valor de um input de formulário (``const [value, setValue] = useState('')``).

### useEffect
Executa efeitos colaterais (fetch, subscrições, timers) após renderizações; pode depender de variáveis. 
**Quando usar?**: Quando precisar disparar uma ação em resposta a uma mudança, ou buscar dados ao montar o componente (``useEffect(() => { fetch(...) }, [])``)

### useCallback
Memoiza uma função para evitar recriação em cada render; útil para prevenir renders desnecessários em filhos que dependem de igualdade de referência. 
**Quando usar?**: Passar handler memoizado para um componente filho com React.memo afim manter funções estáveis e evitar re-renders de filhos.

### useMemo
Memoiza um valor computado para evitar re-cálculos caros quando dependências não mudam. 
**Quando usar?**: memorizar uma lista filtrada/ordenada derivada de props grandes, assim evitando que transformações de dados pesadas travem a UI.

### useRef
Cria uma referência mutável que persiste entre renders (não causa re-render ao mudar). 
**Quando usar?****: Quando você precisa interagir com um elemento HTML de forma que o React não consegue fazer sozinho. Exemplo referenciar um elemento DOM (``const inputRef = useRef<HTMLInputElement>(null)``) para foco.

### useContext
Acessa o valor de um contexto React sem passar props manualmente. 
**Quando usar?**: Ideal para temas, dados de login, configurações de chat, Autenticação (dados do usuário) e Idioma, evitando [Prop Drilling](#observações).

---


## 📑 Comparativo: `useCallback` vs `useMemo` no React

Ambos os hooks são ferramentas de **memoização**, mas resolvem problemas diferentes de performance. Abaixo está a comparação detalhada.

 

### 📊 Tabela Comparativa

| Característica | `useCallback` | `useMemo` |
| :--- | :--- | :--- |
| **O que ele retorna?** | A própria **função** memorizada (a definição). | O **valor/resultado** da execução de uma função. |
| **Principal Objetivo** | Garantir a **estabilidade referencial** de funções. | Evitar **reprocessamento caro** de dados. |
| **Quando usar?** | Ao passar funções para componentes filhos (`React.memo`). | Ao filtrar, ordenar ou transformar listas e dados. |
| **O que o React "guarda"?** | Guarda o "endereço" da função na memória. | Guarda o "resultado final" de um cálculo. |
| **Exemplo no Chat** | A função `handleSendMessage` enviada ao input. | O agrupamento de mensagens por data no histórico. |

 

### 💻 Exemplos de Código (TypeScript)

#### 1. `useCallback`
Mantém a mesma função na memória para que o componente `MessageInput` não re-renderize desnecessariamente.

```typescript
const handleSendMessage = useCallback((text: string) => {
  setMessages(prev => [...prev, { text }]);
}, []); // Identidade estável: a função nunca muda.
```
#### 2. `useMemo`
Processa a lista de mensagens e guarda o resultado. Só reprocessa se messages mudar.
```typescritp
const unreadTotal = useMemo(() => {
  return messages.filter(m => !m.read).length;
}, [messages]); // Só recalcula se a lista de mensagens for alterada.
```
### 💡 Qual escolher?
1. Use `useCallback` quando você estiver passando uma função para um componente filho que está envolvido em `React.memo`. Isso evita que o filho renderize só porque a função mudou de referência.
2. Use `useMem`o quando você tem uma lógica que exige processamento (ex: `.filter()`, `.map()`, `.reduce()`) e não quer que ela rode em todo render do componente (como ao digitar em um input de busca).
---
## 📑 Comparativo: `useState` vs `useRef`

Embora ambos os hooks preservem valores entre as renderizações do componente, a grande diferença está em como eles interagem com o ciclo de vida do React.

### 📊 Tabela Comparativa

| Característica | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Dispara Re-render?** | **Sim**. Sempre que o estado muda, o componente é redesenhado. | **Não**. Você pode mudar o valor e a tela continuará igual. |
| **Acesso ao Valor** | Acesso direto ao estado (ex: `message`). | Acesso através da propriedade `.current` (ex: `inputRef.current`). |
| **Sincronização com UI** | Síncrono com o que o usuário vê na tela. | Independente da interface (os dados mudam "nos bastidores"). |
| **Uso Principal** | Dados que devem ser exibidos ou afetar o layout. | Acesso ao DOM real ou armazenamento de IDs de timers e variáveis técnicas. |
| **Exemplo no Chat** | A lista de mensagens (`messages`) ou o texto digitado. | O elemento do input para dar foco ou o ID do timer do bot. |


### 💻 Exemplos de Código (TypeScript)

#### 1. Com `useState` (A tela atualiza)
Ideal para o que o usuário **vê**.

```typescript
const [text, setText] = useState("");
/* Cada vez que setText é chamado, o componente renderiza de novo
 para mostrar a letra nova no campo ou na tela.*/
```

#### 2. Com `useRef` (A tela NÃO atualiza)
Ideal para o que o usuário **não vê** ou para controle direto.

```typescript
const countRef = useRef(0);
const handleClick = () => {
  countRef.current += 1; // O valor muda, mas o React não redesenha o componente.
  console.log("Cliques totais:", countRef.current);
};
```

### 💡 Qual escolher?
1. Escolha `useState` se a informação for ser usada no seu JSX (dentro do `return`) para ser exibida ao usuário.
2. Escolha `useRef` se você precisar guardar um valor que dure todo o ciclo de vida do componente, mas que a mudança desse valor não precise "avisar" o navegador para pintar a tela novamente.
---

#### 📣Observações
**Prop Drilling** é quando você percebe que está passando a mesma prop por 3 ou 4 níveis de componentes.