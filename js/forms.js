document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('#form');
  const modalSuccess = document.getElementById('modal-success');
  const modalForm = document.getElementById('modal-form');
  const closeModalButton = document.getElementById('modal-close-button');
  const makeOrderButtons = document.querySelectorAll('.make-order');
  const barPanel = document.getElementById('bar-panel');
  const formWithAgree = document.getElementById('form-with-agree');

  function openModal(modal) {
    if (modal) {
      modal.classList.add('pagecrm_modal--open');
      const childWithBorderClass = modal.querySelector(
        '.pagecrm_modal__form-border'
      );
      if (childWithBorderClass) {
        childWithBorderClass.classList.add('pagecrm_modal__form-border--open');
      }
      document.body.classList.add('body-no-scroll');
      if (barPanel) {
        barPanel.classList.add('bar-panel--hidden');
      }
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('pagecrm_modal--open');
      const childWithBorderClass = modal.querySelector(
        '.pagecrm_modal__form-border'
      );
      if (childWithBorderClass) {
        childWithBorderClass.classList.remove(
          'pagecrm_modal__form-border--open'
        );
      }
      document.body.classList.remove('body-no-scroll');
      if (barPanel) {
        barPanel.classList.remove('bar-panel--hidden');
      }
    }
  }

  function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });
    return data;
  }

  function sendSubmit(form) {
    const formData = getFormData(form);
    console.log(formData);
    closeModal(modalForm);
    openModal(modalSuccess);
    form.reset();
  }

  if (formWithAgree) {
    formWithAgree.addEventListener('submit', (event) => {
      event.preventDefault();
      const checkbox = formWithAgree.querySelector('#checkbox');
      const error = formWithAgree.querySelector('.pagecrm_form__checkbox');
      if (!checkbox.checked) {
        error.classList.add('pagecrm_form__checkbox--error');
        return;
      }
      error.classList.remove('pagecrm_form__checkbox--error');
      sendSubmit(formWithAgree);
    });
  }

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      sendSubmit(event.target);
    });
  });

  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      closeModal(modalSuccess);
    });
  }

  makeOrderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      openModal(modalForm);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal(modalSuccess);
      closeModal(modalForm);
    }
  });

  modalForm.addEventListener('mousedown', (e) => {
    if (e.target === modalForm) {
      closeModal(modalForm);
    }
  });

  modalSuccess.addEventListener('mousedown', (e) => {
    if (e.target === modalSuccess) {
      closeModal(modalSuccess);
    }
  });
});
