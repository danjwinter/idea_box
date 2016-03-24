var addNewIdea = function(requestService) {
  $('.new-idea').on("click", "#ideaSave", function(event){
    event.preventDefault()
    var idea = { title: $('#newTitle').val(), body: $('#newBody').val()}
    sendNewIdeaToDatabase(idea, requestService).then(renderIdea)
                               .then(addElementToPage)
                               .then(clearNewFields)
  })
}

var sendNewIdeaToDatabase = function(idea, requestService) {
  return requestService.post('/api/v1/ideas', idea)
}

var clearNewFields = function(){
  $('#newTitle').val('')
  $('#newBody').val('')
}
