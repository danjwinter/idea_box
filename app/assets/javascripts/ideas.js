
$(document).ready(function(){
  displayIdeas()
  addNewIdea()
  deleteIdeas()
  editIdea()
  upIdeaQuality()
  downIdeaQuality()
  searchForIdea()
})

var ideaQualityCollection = [
  'swill', 'plausible', 'genius'
]

var searchForIdea = function(){
  $('#search').on('keyup', function(e){
    e.preventDefault()

    var query = $(this).val()

    var ideas = $('#ideas').children()

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
  $('#ideas').delegate('.thumbsDown', 'click', function(){
    var idea = this.closest('.idea')
    var quality = $(idea).find('.quality')


    if ( quality !== 'swill') {
      var qualityIndex = ideaQualityCollection.indexOf(quality.text())
      var updatedQualityIndex = qualityIndex - 1
      $.ajax({
        url: '/api/v1/ideas/' + $(idea).attr('data-id'),
        type: 'PATCH',
        data: {'quality': updatedQualityIndex},
        success: function(){
          quality.text(ideaQualityCollection[updatedQualityIndex])
        }
      })
    }
  })
}

var upIdeaQuality = function(){
  $('#ideas').delegate('.thumbsUp', 'click', function(){
    var idea = this.closest('.idea')
    var quality = $(idea).find('.quality')


    if ( quality !== 'genius') {
      var qualityIndex = ideaQualityCollection.indexOf(quality.text())
      var updatedQualityIndex = qualityIndex + 1
      $.ajax({
        url: '/api/v1/ideas/' + $(idea).attr('data-id'),
        type: 'PATCH',
        data: {'quality': updatedQualityIndex},
        success: function(){
          quality.text(ideaQualityCollection[updatedQualityIndex])
        }
      })
    }
  })
}

var deleteIdeas = function() {
  $('#ideas').delegate('.delete', "click", function(){
    var idea = this.closest('.idea')

    $.ajax({
      url: '/api/v1/ideas/' + $(idea).attr('data-id'),
      type: 'DELETE',
      success: function(){
        $(idea).remove()
      }
    })
  })
}

var editIdea = function(){
  $('#ideas').delegate('.edit', 'click', function(){

    var idea = this.closest('.idea')
    var title = $(idea).find('.title')
    var body = $(idea).find('.body')

    title.attr('contentEditable', true)
    body.attr('contentEditable', true)
    $(idea).append('<button class="save">Save</button>')
    $(idea).find('.edit').remove()
    $(idea).delegate('.save', 'click', function(){

      title = $(idea).find('.title')
      body = $(idea).find('.body')
      var editedIdea = { title: title.text(), body: body.text()}

      $.ajax({
        url: '/api/v1/ideas/' + $(idea).attr('data-id'),
        type: 'PATCH',
        data: editedIdea,
        success: function(){
          title.attr('contentEditable', false)
          body.attr('contentEditable', false)
          $(idea).find('.save').remove()
          $(idea).append('<button class="edit">Edit</button>')
        }
      })
    })

  })
}

var addNewIdea = function() {
  $('.new-idea').on("click", "#ideaSave", function(event){
    event.preventDefault()
    var idea = { title: $('#newTitle').val(), body: $('#newBody').val()}

    $.ajax({
      url: '/api/v1/ideas',
      type: 'POST',
      data: idea,
      success: function(response){
        addSingleIdea(response)},
        error: function(xhr){
          console.log('FAIL', xhr)
        }
    })
  })
}

var displayIdeas = function() {
  $.ajax({
    url: '/api/v1/ideas',
    type: 'GET',
    success: function(response){
      addIdeasToDom(response)},
    error: function(xhr){
      console.log('FAIL', xhr)
    }
  })
}

var addIdeasToDom = function(ideas){
  var htmlIdeas = ideas.map(function(idea){
    return('<div class="idea" data-id=' + idea.id + '><h3 class="title">' + idea.title + '</h3>'
    + '<h4 class="quality">' + ideaQualityCollection[idea.quality] + '</h4>'
    + '<button class="thumbsUp">Thumbs Up</button><button class="thumbsDown">Thumbs Down</button>'
    + '<p class="body">' + truncate(idea.body) + '</p>'
    + '<button class="delete">Delete</button><button class="edit">Edit</button></div>')
  })

  $('#ideas').append(htmlIdeas)

}

var addSingleIdea = function(idea){

  var htmlIdea = ('<div class="idea" data-id=' + idea.id + '><h3>' + idea.title + '</h3>'
  + '<h4 class="quality">' + ideaQualityCollection[idea.quality] + '</h4>'
  + '<button class="thumbsUp">Thumbs Up</button><button class="thumbsDown">Thumbs Down</button>'
  + '<p>' + truncate(idea.body) + '</p>'
  + '<button class="delete">Delete</button><button class="edit">Edit</button></div>')
  $('#ideas').prepend(htmlIdea)
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
