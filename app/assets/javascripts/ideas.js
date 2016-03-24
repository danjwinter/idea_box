
$(document).ready(function(){
  var requestService = new RequestService()
  inLineEditBody(requestService)
  inLineEditTitle(requestService)
  addNewIdea(requestService)
  deleteIdeas(requestService)
  upIdeaQualityListener(requestService)
  downIdeaQualityListener(requestService)
  searchForIdea()
  getIdeas(requestService).then(renderIdeas)
            .then(addElementToPage);
})
