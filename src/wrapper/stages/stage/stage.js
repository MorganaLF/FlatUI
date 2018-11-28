import $ from 'jquery'

$('.stage').each(function () {
  let containerWidth = $(this).width();

  $(this).find('.stage__item').each(function (index) {

    $(this).on('click', function(){
      for (let i = 0; i <= index; i++){
        $(this).closest('.stage').find('.stage__item').eq(i).removeClass('stage__item_inactive')
      }
      for (let i = 0; i < index; i++){
        $(this).closest('.stage').find('.stage__line').eq(i).removeClass('stage__line_inactive')
      }
      for (let i = index + 1; i <= $('.stage__item').length; i++) {
        $(this).closest('.stage').find('.stage__item').eq(i).addClass('stage__item_inactive')
      }
      for (let i = index; i < $('.stage__item').length; i++) {
        $(this).closest('.stage').find('.stage__line').eq(i).addClass('stage__line_inactive')
      }

      $(this).closest('.stage__container').find('.stage__content').eq(0).css('transform', 'translateX(-' + containerWidth * index + 'px)')
    })

  });

  $(this).closest('.stage__container').find('.stage__content').eq(0).css('width', containerWidth * $('.stage__item').length + 'px')
});