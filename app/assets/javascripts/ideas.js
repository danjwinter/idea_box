
$(document).ready(function(){
  var requestService = new RequestService()
  inLineEditBody(requestService)
  inLineEditTitle(requestService)
  addNewIdea(requestService)
  deleteIdeas(requestService)
  upIdeaQuality(requestService)
  downIdeaQuality(requestService)
  searchForIdea()
  getIdeas(requestService).then(renderIdeas)
            .then(addElementToPage);
})
