var articles = [];
// var categoryArray = [];
//
// //pushing the categories into a for loop
// for (var i = 0; i < ourLocalData.length; i++){
//   categoryArray.push(ourLocalData[i].category);
// }


//used this from stackoverflow user Christian Landgren
//http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
// var removeCategoryDups = categoryArray.reduce(function(a,b){
//   console.log(a , b);
//   if(a.indexOf(b) < 0 ) a.push(b);
//   return a;
// },[]);

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
  var source = $('#author-filter-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};
// END AUTHOR-FILTER FUNCTION //
// //  CATEGORY-FILTER FUNCTION //
Article.prototype.categoryFilterToHtml = function(){
  var source = $('#category-filter-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};
// // END CATEGORY-FILTER FUNCTION //

//DISPLAYS ARTICLES IN ASCENDING ORDER
ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

//PUTS OBJECTS INTO articles ARRAY
ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));

});

//LOOPS THROUGH ARRAY OF ARTICLES AND APPENDS RESPECTIVE PROPERTY TO APPROPRIATE DOM ELEMENT
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
  $('#author-filter').append(a.authorFilterToHtml());
  if ($('#category-filter option[value="' + a.category + '"]').length === 0){
    $('#category-filter').append(a.categoryFilterToHtml());
  }

});
