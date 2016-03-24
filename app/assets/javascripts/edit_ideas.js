

var inLineEditTitle = function(requestService){
  $('#ideas').on('click', '.idea-title', function(){
    var idea = this.closest('.idea')
    var element = $(idea).find('.idea-title')

    element.attr('contentEditable', true)

    $(idea).on('keydown', function(e){
      if (e.keyCode == 13){
        e.preventDefault()
        updateIdeaTitleOrBody(idea, requestService).then( function() {
          element.attr('contentEditable', false)
        })
      }
    })
  })
}

var inLineEditBody = function(requestService) {
  $('#ideas').on('click', '.body', function(){
    var idea = this.closest('.idea')
    var fullBody = $(idea).find('.full-body')
    var body = $(idea).find('.body')
    body.hide()
    fullBody.show()
    fullBody.focus()

    $(idea).on('keydown', function(e){
      if (e.keyCode == 13){
        e.preventDefault()
        var truncatedText = truncate(fullBody.text())

        updateIdeaTitleOrBody(idea, requestService).then( function() {
          fullBody.hide()
          body.text(truncatedText)
          body.show()
        });
      }
    })
  })
}

var downIdeaQuality = function(requestService){
  $('#ideas').on('click', '.thumbsDown', function(){
    var idea = this.closest('.idea')
    var quality = $(idea).find('.quality')

    if ( quality !== 'swill') {
      var qualityIndex = ideaQualityCollection.indexOf(quality.text())
      var updatedQualityIndex = qualityIndex - 1
      var data = {'quality': updatedQualityIndex}

      updateIdeaInDatabase(idea, data, requestService).then(function(){
        quality.text(ideaQualityCollection[updatedQualityIndex])
      })
    }
  })
}
var ideaQualityCollection = [
  'swill', 'plausible', 'genius'
]

var upIdeaQuality = function(requestService){
  $('#ideas').on('click', '.thumbsUp', function(){
    var idea = this.closest('.idea')
    var quality = $(idea).find('.quality')

    if ( quality.text() !== 'genius') {
      var qualityIndex = ideaQualityCollection.indexOf(quality.text())
      var updatedQualityIndex = qualityIndex + 1
      var data = {'quality': updatedQualityIndex}

      updateIdeaInDatabase(idea, data, requestService).then(function() {
        quality.text(ideaQualityCollection[updatedQualityIndex])
      })
    }
  })
}

var updateIdeaTitleOrBody = function(idea, requestService) {
  var id = $(idea).attr('data-id')
  var title = $(idea).find('.title')
  var body = $(idea).find('.body')
  var editedIdea = { title: title.text(), body: body.text()}

  return updateIdeaInDatabase(idea, editedIdea, requestService)
}



var updateIdeaInDatabase = function(idea, data, requestService) {
  var id = $(idea).attr('data-id')
  return requestService.patch('/api/v1/ideas/' + id, data)
}
