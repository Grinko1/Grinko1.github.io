/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */

export default function codeGenerator(start:number = 0): Function {
  return () => ++start;
}
