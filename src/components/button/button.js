import $ from 'jquery';

class Button {
  constructor(element) {
    this.element = element;
  }

  createRipple(e, $this) {
    if ($this.find('.button__ripple').length === 0) {
      $this.prepend("<span class='button__ripple'></span>");
    }

    const ripple = $this.find('.button__ripple');
    ripple.removeClass('button__ripple_animated');

    if (!ripple.height() && !ripple.width()) {
      const rippleDiameter = Math.max($this.outerWidth(), $this.outerHeight());
      ripple.css({ height: rippleDiameter, width: rippleDiameter });
    }

    const rippleXCoord = e.pageX - $this.offset().left - ripple.width() / 2;
    const rippleYCoord = e.pageY - $this.offset().top - ripple.height() / 2;

    ripple
      .css({ top: `${rippleYCoord}px`, left: `${rippleXCoord}px` })
      .addClass('button__ripple_animated');
  }

  restoreDefault($this) {
    if ($this.attr('href')) {
      const link = $this.attr('href');
      setTimeout(() => {
        window.location.href = link;
      }, 650);
    }

    if ($this.attr('type') === 'submit') {
      const form = $this.closest('form');
      setTimeout(() => {
        form.submit();
      }, 650);
    }
  }

  callListeners(e) {
    e.preventDefault();

    const $this = $(e.target);

    this.createRipple(e, $this);
    this.restoreDefault($this);
  }

  addListener() {
    this.element.on('click', this.callListeners.bind(this));
  }
}

const button = new Button($('.button'));
button.addListener();
