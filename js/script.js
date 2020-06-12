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
    console.log(tartgetArticle)

    /* [DONE] add class 'active' to the correct article */
    tartgetArticle.classList.add('active');
}


const articles = document.querySelectorAll('.post');
  


function generateTitleLinks(){
    //Clean siddebar
    document.querySelector('.titles').innerHTML = '';
    //get article id and title
    for(let article of articles){
        const articleID = article.getAttribute('id');
        const articleTitle = article.querySelector('h3').innerHTML;
        
        document.querySelector('.titles').innerHTML += ("<li><a href='#"+articleID+"'><span>"+articleTitle+"</span></a></li>");
        console.log(document.querySelector('.titles'))
    }
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
    //save id and title to html 
    //paste id and title into sidebar
}

generateTitleLinks()