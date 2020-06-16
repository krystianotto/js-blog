'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /*  [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const tartgetArticle = document.querySelector(articleSelector);
  console.log(tartgetArticle);

  /* [DONE] add class 'active' to the correct article */
  tartgetArticle.classList.add('active');
};

const articles = document.querySelectorAll('.post');
const optTitleListSelector = '.titles';
const optTitleSelector = '.post-title';
const articeTitleList = document.querySelector(optTitleListSelector);

let html = '';

function generateTitleLinks(){
  //clean siddebar
  articeTitleList.innerHTML = '';
  //get article id and title
  for(let article of articles){
    const articleID = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    //insert into html updated list
    const linkHTML = `<li><a href='#${articleID}'><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  }

  // insert into html code updated list
  articeTitleList.innerHTML += html;

  //add event which open corect article on page
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
