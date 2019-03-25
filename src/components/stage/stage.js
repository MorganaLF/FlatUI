import $ from 'jquery'

$('.stage__list').each(function () {
  let stage = $(this);
  let containerWidth = $(stage).width();
  let currentIndex;

  $(stage).closest('.stage').find('.stage__content').eq(0).css('width', containerWidth * $('.stage__item').length + 'px')

  $(window).resize(function () {
    let containerWidth = $(stage).width();
    $(stage).closest('.stage').find('.stage__content').eq(0).css('width', containerWidth * $('.stage__item').length + 'px')

  });

  $(stage).find('.stage__item').each(function (index) {
    let stageItem = $(this);

    $(stageItem).on('click', function(){
      currentIndex = index;
      for (let i = 0; i <= index; i++){
        $(stageItem).closest('.stage__list').find('.stage__item').eq(i).removeClass('stage__item_inactive')
      }
      for (let i = 0; i < index; i++){
        $(stageItem).closest('.stage__list').find('.stage__line').eq(i).removeClass('stage__line_inactive')
      }
      for (let i = index + 1; i <= $('.stage__item').length; i++) {
        $(stageItem).closest('.stage').find('.stage__item').eq(i).addClass('stage__item_inactive')
      }
      for (let i = index; i < $('.stage__item').length; i++) {
        $(stageItem).closest('.stage').find('.stage__line').eq(i).addClass('stage__line_inactive')
      }
      let contentHeight = $(stageItem).closest('.stage').find('.stage__content>*').eq(index).outerHeight();
      $(stageItem).closest('.stage').find('.stage__content').eq(0).css('transform', 'translateX(-' + containerWidth * index + 'px)');
      $(stageItem).closest('.stage').find('.stage__content').eq(0).css('height', contentHeight)
    });

    $(window).resize(function () {
      let containerWidth = $(stage).width();
      let contentHeight = $(stageItem).closest('.stage').find('.stage__content>*').eq(currentIndex).height();
      $(stageItem).closest('.stage').find('.stage__content').eq(0).css('height', contentHeight);
      $(stageItem).closest('.stage').find('.stage__content').eq(0).css('transform', 'translateX(-' + containerWidth * currentIndex + 'px)');
      $(stageItem).on('click', function(){
        $(stageItem).closest('.stage').find('.stage__content').eq(0).css('transform', 'translateX(-' + containerWidth * index + 'px)')
      });
    });

  });

});