import $ from 'jquery'

$( function() {
  let durarion;
  let time_update_interval;
  let video = $('.video').get(0);
  let playButton = $('.video__play-button');

  /* Воспроизведение видео */

  function playVideo () {
    if (video.paused) {
      $('.video__play-button').addClass('video__play-button_playing');
      video.play();
      time_update_interval = setInterval(function () {
        updateProgressBar();
      }, 1000);
    } else {
      $('.video__play-button').removeClass('video__play-button_playing');
      video.pause();
      clearInterval(time_update_interval);
    }
  }
  //$('.video__wrapper').click(playVideo);
  playButton.click(playVideo);

  /* Развернуть на весь экран */
          let isFull = false;
          function playFullscreen (){

           var doc = document.querySelector('.video__wrapper');

          if (!isFull) {
              document.querySelector('.video__full-button').classList.add('video__full-button_opened')
              if (doc.requestFullscreen) {
                doc.requestFullscreen();
              }
              else if (doc.mozRequestFullScreen) {
                doc.mozRequestFullScreen();
              }
              else if (doc.webkitRequestFullScreen) {
               doc.webkitRequestFullScreen();
             }
            } else {
              document.querySelector('.video__full-button').classList.remove('video__full-button_opened');
             if (document.exitFullscreen) {
               document.exitFullscreen();
              }
             else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
             }
              else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
              }
            }

            isFull = !isFull;
          }

  $('.video__full-button').click(playFullscreen);


  /* Линия прогресса */
         function progress (event) {

             let line_width = document.querySelector('.video__progress').clientWidth;
             // положение элемента
             //var pos = document.getElementById('line').offset();
             let elem_left = document.querySelector('.video__progress').getBoundingClientRect().left;
             // положение курсора внутри элемента
             let Xinner = event.pageX - elem_left;
             let newTime = video.duration * (Xinner / line_width);
             // Skip video to new time.
             video.currentTime = newTime;
             updateProgressBar();
         }

  // Обновляем прогресс
         function updateProgressBar(){
             let line_width = document.querySelector('.video__progress').clientWidth;
             let persent = (video.currentTime / video.duration);
             document.querySelector('.video__progress--full').style.width = persent * line_width + 'px';
             //var per = persent * 100;
             //document.getElementById('fader').style.left = per+'%';
         }

      document.querySelector('.video__progress').addEventListener('click', progress);


});


