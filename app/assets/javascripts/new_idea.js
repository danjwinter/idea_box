var addNewIdea = function() {
  $('.new-idea').on("click", "#ideaSave", function(e){
    e.preventDefault()
    saveIdea()
  })
}

var saveIdea = function() {
  var newTitle = $('#newTitle').val()
  var newBody = $('#newBody').val()
  if (newTitle === '' || newBody === ''){
    flashEmptyIdeaMessage()
  } else {
    acceptNewIdea(newBody, newTitle)
  }
}

var acceptNewIdea = function(newBody, newTitle){
  var idea = { title: newTitle, body: newBody}
  sendNewIdeaToDatabase(idea).then(renderIdea)
  .then(addElementToPage)
  .then(clearNewFields)
}

var flashEmptyIdeaMessage = function(){
  $('.empty-idea-message').slideDown(function(){
    setTimeout(function(){
      $('.empty-idea-message').slideUp()
    }, 2000)
  })
}

var sendNewIdeaToDatabase = function(idea) {
  return requestService.post('/api/v1/ideas', idea)
}

var clearNewFields = function(){
  $('#newTitle').val('')
  $('#newBody').val('')
}
