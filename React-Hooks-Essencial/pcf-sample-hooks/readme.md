## HOOKS ESSENTIAL

### useState
Hook para manter estado local em um componente funcional; atualizações re-renderizam o componente.
**Utilização**: controlar o valor de um input de formulário (``const [value, setValue] = useState('')``).

### useEffect
Executa efeitos colaterais (fetch, subscrições, timers) após renderizações; pode depender de variáveis. 
**Utilização**: buscar dados ao montar o componente (``useEffect(() => { fetch(...) }, [])``)

### useCallback
Memoiza uma função para evitar recriação em cada render; útil para prevenir renders desnecessários em filhos que dependem de igualdade de referência. 
**Utilização**: passar handler memoizado para um componente filho com React.memo.

### useMemo
Memoiza um valor computado para evitar re-cálculos caros quando dependências não mudam. **Utilização**: memorizar uma lista filtrada/ordenada derivada de props grandes.

### useRef
Cria uma referência mutável que persiste entre renders (não causa re-render ao mudar). 
**Utilização****: referenciar um elemento DOM (``const inputRef = useRef<HTMLInputElement>(null)``) para foco.

### useContext
Acessa o valor de um contexto React sem passar props manualmente. 
**Utilização**: ler tema ou usuário autenticado definidos por um Context.Provider.