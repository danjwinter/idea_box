
$(document).ready(function(){
  displayIdeas()
  addNewIdea()
})

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
    return('<div data-id=' + idea.id + '><h3>' + idea.title + '</h3>'
    + '<h4>' + idea.quality + '</h4>'
    + '<p>' + truncate(idea.body) + '</p></div>')
  })

  $('#ideas').append(htmlIdeas)
}

var addSingleIdea = function(idea){

  var htmlIdea = ('<div data-id=' + idea.id + '><h3>' + idea.title + '</h3>'
  + '<h4>' + idea.quality + '</h4>'
  + '<p>' + truncate(idea.body) + '</p></div>')
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
