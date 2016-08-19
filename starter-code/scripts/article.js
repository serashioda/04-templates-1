var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

// ADD PROPERTIES USED BY TEMPLATE . EXCUTE LOGIC HERE SINCE TEMPLATE CAN'T HOLD JS LOGIC. ADD RESULT TO OBJECT AS NEW PROPERTY BY KEY IN TEMPLATE. //
Article.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // TODO: DONE! Use handlebars to render your articles!
  //       - Select your template from the DOM.
  //       - Now "compile" your template with Handlebars.
  //       - Don't forget to return your template for this article.
  var source = $('#articles-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};

//  AUTHOR-FILTER FUNCTION //
Article.prototype.authorFilterToHtml = function(){
  console.log('hello');
  var source = $('#author-filter-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};
// END AUTHOR-FILTER FUNCTION //
// //  CATEGORY-FILTER FUNCTION //
Article.prototype.categoryFilterToHtml = function(){
  console.log('bye');
  var source = $('#category-filter-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};
// // END CATEGORY-FILTER FUNCTION //

ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

//articles is the array we declared in the global space
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
  $('#author-filter').append(a.authorFilterToHtml());
  $('#category-filter').append(a.categoryFilterToHtml());
});
