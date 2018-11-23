import $ from 'jquery'

$( function() {
  let durarion;
  let time_update_interval;
  let video = $('.player').get(0);
  let playButton = $('.player__play-button');

  /* Воспроизведение видео */

  function playVideo () {
    if (video.paused) {
      $('.player__play-button').addClass('player__play-button_playing');
      video.play();
      time_update_interval = setInterval(function () {
        updateProgressBar();
      }, 1000);
    } else {
      $('.player__play-button').removeClass('player__play-button_playing');
      video.pause();
      clearInterval(time_update_interval);
    }
  }
  $('.player').click(playVideo);
  playButton.click(playVideo);

  /* Развернуть на весь экран */
          let isFull = false;
          function playFullscreen (){

           var doc = document.querySelector('.player__wrapper');

          if (!isFull) {
              document.querySelector('.player__full-button').classList.add('player__full-button_opened');
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
              document.querySelector('.player__full-button').classList.remove('player__full-button_opened');
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

  $('.player__full-button').click(playFullscreen);


  /* Линия прогресса */
         function progress (event) {

             let line_width = document.querySelector('.player__progress').clientWidth;
             // положение элемента
             //var pos = document.getElementById('line').offset();
             let elem_left = document.querySelector('.player__progress').getBoundingClientRect().left;
             // положение курсора внутри элемента
             let Xinner = event.pageX - elem_left;
             let newTime = video.duration * (Xinner / line_width);
             // Skip video to new time.
             video.currentTime = newTime;
             updateProgressBar();
         }

  // Обновляем прогресс
         function updateProgressBar(){
             let line_width = document.querySelector('.player__progress').clientWidth;
             let persent = (video.currentTime / video.duration);
             document.querySelector('.player__progress--full').style.width = persent * line_width + 'px';
         }

      document.querySelector('.player__progress').addEventListener('click', progress);


});


