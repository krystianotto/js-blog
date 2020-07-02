'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorTagLink : Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

const optArticleSelector = '.post';
const articles = document.querySelectorAll(optArticleSelector);
const optTitleListSelector = '.titles';
const articeTitleList = document.querySelector(optTitleListSelector);

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-',
  }
};
const select = {
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
    title: '.post-title',
  },
  all: {
    articles: '.post',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  listOf: {
    titles: '.titles',
    tags: '.tags .list',
    authors: '.authors .list',
  },
};


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

function generateTitleLinks(customSelector= ''){
  //clean siddebar
  let html = '';
  articeTitleList.innerHTML = '';
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  //get article id and title
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(select.article.title).innerHTML;

    //insert into html updated list
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags){
  const params = {
    'max': 0,
    'min': 9999,
  };

  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1 );
  return classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagList = article.querySelector(select.article.tags);

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
        //const htmlLink =`<li><a href='#tag-${value}'>${value} </a></li>`;
        const linkHTMLData = {id: value};
        const htmlLink = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
        html += htmlLink;

        /* [NEW] check if this link is NOT already in allTags */
        !allTags[value] ? allTags[value] = 1 : allTags[value]++;
      }
    );
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML += html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);

  const allTagsData = {tags:[]};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    //const tagLink = `<a href='#' class='${opts.tagSizes.classPrefix + calculateTagClass(allTags[tag], tagsParams)}'>${tag}</a>`;
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const activeTagLinks = document.querySelectorAll(select.all.linksTo.tags);

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
  let allAuthors = {};
  const authorList = document.querySelector('.authors');

  //for each article insert an author
  for(let article of articles){
    const authorTag = article.getAttribute('author-tags');
    const authorPost = article.querySelector(select.article.author);
    //authorPost.innerHTML = `<a href='#author-${authorTag}'>${authorTag}</a>`;
    const linkHTMLData = {id: authorTag};
    const htmlLink = templates.authorLink(linkHTMLData);
    authorPost.innerHTML = htmlLink;

    !allAuthors[authorTag] ? allAuthors[authorTag] = 1 :  allAuthors[authorTag]++;
  }
  const authorParams = calculateTagsParams(allAuthors);
  const allAuthorsData = {authors:[]};

  for(let author in allAuthors){
    //const AuthorLink = `<a href='#' class='${opts.tagSizes.classPrefix + calculateTagClass(allAuthors[author], authorParams)}'>${author}</a>`;
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorParams)
    });
  }
  authorList.innerHTML = templates.authorTagLink(allAuthorsData);
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
  /* START LOOP: for each link */
  for(let link of authorLinks){
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click',authorClickHander);
  }

  /* END LOOP: for each link */
}

addClickListenersToAuthors();
