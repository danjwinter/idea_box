var getIdeas = function (requestService) {
  return requestService.get('/api/v1/ideas');
}

var renderIdea = function (idea) {
  // debugger
  return $('<div class="idea" data-id=' + idea.id + '><h3 class="title" contentEditable="false">' + idea.title + '</h3>'
  + '<h4 class="quality">' + ideaQualityCollection[idea.quality] + '</h4>'
  + '<button class="thumbsUp">Thumbs Up</button><button class="thumbsDown">Thumbs Down</button>'
  + '<p class="body">' + truncate(idea.body) + '</p>'
  + '<p class="full-body" contentEditable="true" style="display: none">' + idea.body + '</p>'
  + '<button class="delete">Delete</button></div>')
}

var renderIdeas = function (ideas) {
  return ideas.map(renderIdea);
}

var addElementToPage = function (element) {
  $('#ideas').prepend(element);
}

var truncate = function(string){
  var shortendString = $.trim(string).substring(0, 99)
  var idx = string.lastIndexOf(' ')

  if (idx == -1 || string[100] === undefined) {
    return shortendString
  } else {
  return shortendString.substring(0, idx)
  }
}
