var addNewIdea = function(requestService) {
  $('.new-idea').on("click", "#ideaSave", function(e){
    e.preventDefault()
    saveIdea(requestService)
  })
}

var saveIdea = function(requestService) {
  var newTitle = $('#newTitle').val()
  var newBody = $('#newBody').val()
  if (newTitle === '' || newBody === ''){
    flashEmptyIdeaMessage()
  } else {
    acceptNewIdea(newBody, newTitle, requestService)
  }
}

var acceptNewIdea = function(newBody, newTitle, requestService){
  var idea = { title: newTitle, body: newBody}
  sendNewIdeaToDatabase(idea, requestService).then(renderIdea)
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

var sendNewIdeaToDatabase = function(idea, requestService) {
  return requestService.post('/api/v1/ideas', idea)
}

var clearNewFields = function(){
  $('#newTitle').val('')
  $('#newBody').val('')
}
