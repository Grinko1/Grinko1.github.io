export default {
  /**
   * Открытие модалки по названию
   * @param name
   */
  open: (name: string, id:string) => {
    return {type: 'modal/open', payload: {name, id }};
  },

  /**
   * Закрытие модалки
   * @param name
   */
  close: (name:string) => {
    return {type: 'modal/close', payload:{name}}
  }
}
