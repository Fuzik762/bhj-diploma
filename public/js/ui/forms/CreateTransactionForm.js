
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const selectList = this.element.querySelector('.accounts-select');
    if(User.current()) {
     Account.list( User.current(), (err, response) => {
      if(response.success) {
        const accountList = response.data
        if(selectList.innerHTML === '') {
          accountList.forEach(option => {
            selectList.insertAdjacentHTML('beforeend', `
              <option value="${option['id']}">${option['name']}</option>
            `)
          });
        }
      } else {
        alert(err)
      }
    })
  }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(response.success) {
        App.update();
        this.element.reset();
        const modal = this.element.closest('.modal')
        App.getModal(modal.dataset.modalId).close()
      } else { 
        alert(err)
      }
    })  
  }
}