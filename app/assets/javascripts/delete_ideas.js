var deleteIdeas = function() {
  $('#ideas').on('click', '.delete', function(){
    var idea = this.closest('.idea')
    deleteIdeaInDatabase(idea).then(function(){
      $(idea).remove()
    })
  })
}

var deleteIdeaInDatabase = function(idea) {
  var id = $(idea).data('id')
  return requestService.delete('/api/v1/ideas/' + id)
}
