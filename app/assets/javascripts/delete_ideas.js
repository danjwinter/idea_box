var deleteIdeas = function(requestService) {
  $('#ideas').on('click', '.delete', function(){
    var idea = this.closest('.idea')
    deleteIdeaInDatabase(idea, requestService).then($(idea).remove())
  })
}

var deleteIdeaInDatabase = function(idea, requestService) {
  var id = $(idea).attr('data-id')
  return requestService.delete('/api/v1/ideas/' + id)
}
