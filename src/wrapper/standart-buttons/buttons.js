window.addEventListener('load', function(){
  let buttonsArr = document.getElementsByClassName('button');

  function buttonOnClick (e) {
    let child = e.target.querySelector('.button__shadow');
    let parentCoord = this.getBoundingClientRect();
    let parentTop = parentCoord.top;
    let parentLeft = parentCoord.left;

    child.style.top = e.clientY - parentTop - 25 + 'px';
    child.style.left = e.clientX - parentLeft - 25 + 'px';
    child.style.display = 'block';

    console.log(e.clientY, parentTop)

  }

  function buttonRemoveClick (e) {
    let child = this.querySelector('.button__shadow');
    setTimeout(function(){
      child.style.display = 'none';
    }, 50);
  }

  for (let i = 0; i < buttonsArr.length; i++) {
    buttonsArr[i].addEventListener('mousedown', buttonOnClick);
    buttonsArr[i].addEventListener('mouseup', buttonRemoveClick);
  }
});




