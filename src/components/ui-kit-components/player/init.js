import Player from './Player';

$(() => {
  const $player = $('.js-player__video');

  $player.each((index, item) => {
    new Player($(item), index);
  });
});
