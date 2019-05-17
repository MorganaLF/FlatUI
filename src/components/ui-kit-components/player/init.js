import Player from './player';

$(() => {
  const $player = $('.js-player__video');

  $player.each((index, item) => {
    new Player($(item), index);
  });
});
