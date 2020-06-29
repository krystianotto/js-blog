'use strict';

//const { formatters } = require("stylelint");

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

  /* [DONE] add class 'active' to the correct article */
  tartgetArticle.classList.add('active');
};

const optArticleSelector = '.post';
const articles = document.querySelectorAll(optArticleSelector);
const optTitleListSelector = '.titles';
const optTitleSelector = '.post-title';
const articeTitleList = document.querySelector(optTitleListSelector);

let html = '';

function generateTitleLinks(customSelector= ''){
  //clean siddebar
  articeTitleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function generateTags(){
  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagList = article.querySelector('.post-tags .list');

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');

    /* split tags into array */
    const tagsArray = dataTags.split(' ');

    /* START LOOP: for each tag */
    tagsArray.forEach(
      function (value){
        /* generate HTML of the link */
        const htmlLink =`<li><a href='#tag-${value}'>${value} </a></li>`;

        /* add generated code to html variable */
        html += htmlLink;
      }
    );
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML += html;
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const equelTags = document.querySelectorAll('a[href= "' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let equelTag of equelTags){
    /* add class active */
    equelTag.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="'+ tag +'"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for(let link of tagLinks){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click',tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthor(){
  //for each article insert an author
  for(let article of articles){
    const authorTag = article.getAttribute('author-tags');
    const authorPost = article.querySelector('.post-author');
    authorPost.innerHTML = `<a href='#author-${authorTag}'>${authorTag}</a>`;
  }
}

generateAuthor();

function authorClickHander(event){
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const tag = href.replace('#author-', '');

  generateTitleLinks('[author-tags="'+ tag +'"]');

}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('.post-author a');
  console.log(authorLinks);
  /* START LOOP: for each link */
  for(let link of authorLinks){
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click',authorClickHander);
  }

  /* END LOOP: for each link */
}

addClickListenersToAuthors();
