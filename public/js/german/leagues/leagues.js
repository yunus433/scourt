window.onload = () => { 
  
  const ended = document.getElementById('checkbox-ended');
  const endedEnglish = document.getElementById('checkbox-ended-english');
  const allCondition = document.querySelectorAll('.condition');

  ended.onclick = function() {
    if (ended.checked === true) {
      allCondition.forEach(condition => {
        if(condition.innerHTML === 'Durum: Tamamlandı') {
          condition.parentNode.parentNode.style.display = 'none';
        } else {
          condition.parentNode.parentNode.style.display = 'block';
        }
      });
    } 
    else {
      allCondition.forEach(condition => {
        condition.parentNode.parentNode.style.display = 'block';
      });
    }
  }

  endedEnglish.onclick = function() {
    if (endedEnglish.checked === true) {
      allCondition.forEach(condition => {
        if(condition.innerHTML === 'Status: Ended' ) {
          condition.parentNode.parentNode.style.display = 'none';
        } else {
          condition.parentNode.parentNode.style.display = 'block';
        }
      });
    } 
    else {
      allCondition.forEach(condition => {
        condition.parentNode.parentNode.style.display = 'block';
      });
    }
  }
}
