window.onload = () => { 
  const language = document.querySelector(".language-choices");
  const languageEnglish = document.querySelector(".language-choices-english");
  const turkish = document.querySelector(".header-content");
  const english = document.querySelector(".header-content-english");
  const turkishFooter = document.querySelector(".footer");
  const englishFooter = document.querySelector(".footer-english"); 
  const content = document.querySelector(".all-content");
  const englishContent = document.querySelector(".all-content-english"); 
  const rode = document.querySelector(".rode");
  const englishRode = document.querySelector(".rode-english"); 

  language.onclick = () => {
    turkish.style.display = 'none';
    english.style.display = 'flex';
    turkishFooter.style.display = 'none';
    englishFooter.style.display = 'flex';
    content.style.display = 'none';
    englishContent.style.display = 'block';
    rode.style.display = 'none';
    englishRode.style.display = 'block';
  };
  languageEnglish.onclick = () => {
    turkish.style.display = 'flex';
    english.style.display = 'none';
    turkishFooter.style.display = 'flex';
    englishFooter.style.display = 'none';
    content.style.display = 'block';
    englishContent.style.display = 'none';
    rode.style.display = 'block';
    englishRode.style.display = 'none';
  };
  
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
