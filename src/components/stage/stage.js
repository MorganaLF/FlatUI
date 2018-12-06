import $ from 'jquery'

$('.stage').each(function () {
  let stage = $(this);
  let containerWidth = $(stage).width();
  let currentIndex;

  $(stage).closest('.stage__container').find('.stage__content').eq(0).css('width', containerWidth * $('.stage__item').length + 'px')

  $(window).resize(function () {
    let containerWidth = $(stage).width();
    $(stage).closest('.stage__container').find('.stage__content').eq(0).css('width', containerWidth * $('.stage__item').length + 'px')

  });

  $(stage).find('.stage__item').each(function (index) {
    let stageItem = $(this);

    $(stageItem).on('click', function(){
      currentIndex = index;
      for (let i = 0; i <= index; i++){
        $(stageItem).closest('.stage').find('.stage__item').eq(i).removeClass('stage__item_inactive')
      }
      for (let i = 0; i < index; i++){
        $(stageItem).closest('.stage').find('.stage__line').eq(i).removeClass('stage__line_inactive')
      }
      for (let i = index + 1; i <= $('.stage__item').length; i++) {
        $(stageItem).closest('.stage').find('.stage__item').eq(i).addClass('stage__item_inactive')
      }
      for (let i = index; i < $('.stage__item').length; i++) {
        $(stageItem).closest('.stage').find('.stage__line').eq(i).addClass('stage__line_inactive')
      }
      let contentHeight = $(stageItem).closest('.stage__container').find('.stage__content-item').eq(index).height();
      $(stageItem).closest('.stage__container').find('.stage__content').eq(0).css('transform', 'translateX(-' + containerWidth * index + 'px)');
      $(stageItem).closest('.stage__container').find('.stage__content').eq(0).css('height', contentHeight)
    });

    $(window).resize(function () {
      let containerWidth = $(stage).width();
      let contentHeight = $(stageItem).closest('.stage__container').find('.stage__content-item').eq(currentIndex).height();
      $(stageItem).closest('.stage__container').find('.stage__content').eq(0).css('height', contentHeight);
      $(stageItem).closest('.stage__container').find('.stage__content').eq(0).css('transform', 'translateX(-' + containerWidth * currentIndex + 'px)');
      $(stageItem).on('click', function(){
        $(stageItem).closest('.stage__container').find('.stage__content').eq(0).css('transform', 'translateX(-' + containerWidth * index + 'px)')
      });
    });

  });

});