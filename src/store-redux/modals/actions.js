export default {
  /**
   * Открытие модалки по названию
   * @param name
   */
  open: (name, id) => {
    return {type: 'modal/open', payload: {name, id }};
  },

  /**
   * Закрытие модалки
   * @param name
   */
  close: (name) => {
    return {type: 'modal/close', payload:{name}}
  }
}
