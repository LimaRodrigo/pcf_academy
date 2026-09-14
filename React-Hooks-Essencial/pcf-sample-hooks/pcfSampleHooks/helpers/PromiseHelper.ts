/**
 * Pausa a execução de uma função assíncrona (async) pelo tempo especificado.
 *
 * @param ms O número de milissegundos para esperar.
 * @returns Uma Promise que resolve após o tempo especificado.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}