var deleteIdeas = function(requestService) {
  $('#ideas').on('click', '.delete', function(){
    var idea = this.closest('.idea')
    deleteIdeaInDatabase(idea, requestService).then(function(){
      $(idea).remove()
    })
  })
}

var deleteIdeaInDatabase = function(idea, requestService) {
  var id = $(idea).data('id')
  return requestService.delete('/api/v1/ideas/' + id)
}
