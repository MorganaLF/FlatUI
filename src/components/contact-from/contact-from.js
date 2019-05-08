import 'jquery-validation';

class ContactForm {
  constructor(element) {
    this.$element = element;
    this.init();
  }

  init() {
    this.$element.validate({
      rules: {
        name: {
          required: true,
          minlength: 1,
        },
        email: {
          required: true,
          email: true,
          minlength: 1,
        },
      },
      errorPlacement() {
        return true;
      },
      errorClass: 'contact-form__input_with-error',
      validClass: 'contact-form__input_with-success',
    });
  }
}

$(() => {
  const $contactForm = $('.js-contact-form');

  $contactForm.each((index, item) => {
    new ContactForm($(item), index);
  });
});
