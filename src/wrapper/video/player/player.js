import $ from 'jquery'

$( function() {

  $('.player').each(function () {
    let video = $(this)[0];
    let playButton = $(video).closest('.player__wrapper').find('.player__play-button');
    let fullButton = $(video).closest('.player__wrapper').find('.player__full-button');
    let progressLine = $(video).closest('.player__wrapper').find('.player__progress');
    let fullProgressLine = $(video).closest('.player__wrapper').find('.player__progress--full');
    let durarion;
    let time_update_interval;

    /* Воспроизведение видео */

    function playVideo () {
      if (video.paused) {
        $(playButton).addClass('player__play-button_playing');
        video.play();
        time_update_interval = setInterval(function () {
          updateProgressBar();
        }, 1000);
      } else {
        $(playButton).removeClass('player__play-button_playing');
        video.pause();
        clearInterval(time_update_interval);
      }
    }
    $(video).click(playVideo);
    playButton.click(playVideo);

    /* Развернуть на весь экран */
    let isFull = false;

    function playFullscreen (){

      let doc = $(video).closest('.player__wrapper')[0]; /* Исправить? */

      if (!isFull) {
        $(fullButton).addClass('player__full-button_opened');
        if (doc.requestFullscreen) {
          doc.requestFullscreen();
        }
        else if (doc.mozRequestFullScreen) {
          doc.mozRequestFullScreen();
        }
        else if (doc.webkitRequestFullScreen) {
          doc.webkitRequestFullScreen();
        }
        else if (doc.msRequestFullscreen) {
          doc.msRequestFullscreen();
        }
      } else {
        $(fullButton).removeClass('player__full-button_opened');

        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }

      isFull = !isFull;
    }

    $(fullButton).click(playFullscreen);


    /* Линия прогресса */
    function progress (event) {

      let line_width = $(progressLine).width();
      // положение элемента
      let elem_left = $(progressLine).offset().left;
      // положение курсора внутри элемента
      let Xinner = event.pageX - elem_left;
      let newTime = video.duration * (Xinner / line_width);
      // Skip video to new time.
      video.currentTime = newTime;
      updateProgressBar();
    }

    // Обновляем прогресс
    function updateProgressBar(){
      let line_width = $(progressLine).width();
      let persent = (video.currentTime / video.duration);
      $(fullProgressLine).css('width', persent * line_width + 'px');
    }

    $(progressLine).on('click', progress);

  });


});


