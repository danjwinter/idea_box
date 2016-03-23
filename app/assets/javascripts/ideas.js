
$(document).ready(function(){
  inLineEdit()
  addNewIdea()
  deleteIdeas()
  editIdea()
  upIdeaQuality()
  downIdeaQuality()
  searchForIdea()
  getIdeas().then(renderIdeas)
            .then(addElementToPage);
})


var inLineEdit = function() {
    clickableElementClasses = ['.title', '.body']
    clickableElementClasses.forEach(function(elementClass){
      addInLineEditingForElement(elementClass)
    })
   }

var addInLineEditingForElement = function(elementClass){
  $('#ideas').on('click', elementClass, function(){
    var idea = this.closest('.idea')

    var element = $(idea).find(elementClass)
    toggleContentEditable(element)
    $(idea).on('keydown', function(e){
      if (e.keyCode == 13){
        updateIdea(idea).then(toggleContentEditable(element))
      }
    })
  })
}

var ideaQualityCollection = [
  'swill', 'plausible', 'genius'
]

var searchForIdea = function(){
  $('#search').on('keyup', function(e){
    e.preventDefault()

    var query = $(this).val()

    var ideas = $('.idea');

    $.each(ideas, function(index, idea){
      var title = $(idea).find('.title').text()
      var body = $(idea).find('.body').text()

      if (title.includes(query) || body.includes(query)) {
        $(idea).show()
      } else {
        $(idea).hide()
      }
    })
  })
}

var downIdeaQuality = function(){
  $('#ideas').on('click', '.thumbsDown', function(){
    var idea = this.closest('.idea')
    var quality = $(idea).find('.quality')

    if ( quality !== 'swill') {
      var qualityIndex = ideaQualityCollection.indexOf(quality.text())
      var updatedQualityIndex = qualityIndex - 1
      var data = {'quality': updatedQualityIndex}
      updateIdeaInDatabase(idea, data).then(quality.text(ideaQualityCollection[updatedQualityIndex]))
    }
  })
}

var upIdeaQuality = function(){
  $('#ideas').on('click', '.thumbsUp', function(){
    var idea = this.closest('.idea')
    var quality = $(idea).find('.quality')

    if ( quality.text() !== 'genius') {
      var qualityIndex = ideaQualityCollection.indexOf(quality.text())
      var updatedQualityIndex = qualityIndex + 1
      var data = {'quality': updatedQualityIndex}

      updateIdeaInDatabase(idea, data).then(quality.text(ideaQualityCollection[updatedQualityIndex]))
    }
  })
}

var updateIdeaInDatabase = function(idea, data) {
  var id = $(idea).attr('data-id')
  return $.patch('/api/v1/ideas/' + id, data)
}

var deleteIdeas = function() {
  $('#ideas').on('click', '.delete', function(){
    var idea = this.closest('.idea')
    deleteIdeaInDatabase(idea).then($(idea).remove())
  })
}

var deleteIdeaInDatabase = function(idea) {
  var id = $(idea).attr('data-id')
  return $.delete('/api/v1/ideas/' + id)
}

$.delete = function(url, data) {
  if ($.isFunction(data) || data === undefined) {
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'DELETE',
    data: data
  })
}

var editIdea = function(){
  $('#ideas').on('click', '.edit', function(){
    var idea = this.closest('.idea')
    var title = $(idea).find('.title')
    var body = $(idea).find('.body')

    toggleContentEditable(title, body)
    toggleHideAndEditButtons(idea)
    $(idea).on('click', '.save', function(){

    updateIdea(idea).then(toggleContentEditable(title, body))
                    .then(toggleHideAndEditButtons(idea))
    })
  })
}

var toggleContentEditable = function() {
  $.each(arguments, function(index, element){
    if (element.attr('contentEditable')){
      element.attr('contentEditable', false)
    } else {
      element.attr('contentEditable', true)
    }
  })
}


var toggleHideAndEditButtons = function(idea) {
  $(idea).find('.edit').toggle()
  $(idea).find('.save').toggle()
}

$.patch = function(url, data) {
  if ($.isFunction(data) || data === undefined) {
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'PATCH',
    data: data
  })
}

var updateIdea = function(idea) {
  var id = $(idea).attr('data-id')
  title = $(idea).find('.title')
  body = $(idea).find('.body')
  var editedIdea = { title: title.text(), body: body.text()}

  return $.patch('/api/v1/ideas/' + id, editedIdea)
}

var addNewIdea = function() {
  $('.new-idea').on("click", "#ideaSave", function(event){
    event.preventDefault()
    var idea = { title: $('#newTitle').val(), body: $('#newBody').val()}
    sendNewIdeaToDatabase(idea).then(renderIdea)
                               .then(addElementToPage)
                               .then(clearNewFields)
  })
}

var sendNewIdeaToDatabase = function(idea) {
  return $.post('/api/v1/ideas', idea)
}


var getIdeas = function () {
  return $.get('/api/v1/ideas');
}

var renderIdea = function (idea) {
  return $('<div class="idea" data-id=' + idea.id + '><h3 class="title">' + idea.title + '</h3>'
  + '<h4 class="quality">' + ideaQualityCollection[idea.quality] + '</h4>'
  + '<button class="thumbsUp">Thumbs Up</button><button class="thumbsDown">Thumbs Down</button>'
  + '<p class="body">' + truncate(idea.body) + '</p>'
  + '<button class="delete">Delete</button><button class="edit">Edit</button><button style="display: none" class="save">Save</button></div>')
}

var renderIdeas = function (ideas) {
  return ideas.map(renderIdea);
}

var addElementToPage = function (element) {
  $('#ideas').prepend(element);
}

var clearNewFields = function(){
  $('#newTitle').val('')
  $('#newBody').val('')
}

var truncate = function(string){
  if (string.length > 100) {
    return $.trim(string).substring(0, 100).split(" ").slice(0, -1).join(" ") + "..."
  } else {
    return string
  }
}
