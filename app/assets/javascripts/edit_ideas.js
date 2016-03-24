var ideaQualityCollection = [
  'swill', 'plausible', 'genius'
]

var inLineEditTitle = function(requestService){
  $('#ideas').on('click', '.title', function(){
    var that = this
    allowTitleEdits(that, requestService)
  })
}

var allowTitleEdits = function(that, requestService) {
  var idea = that.closest('.idea')
  var element = $(idea).find('.title')

  element.attr('contentEditable', true)

  $(idea).on('keydown', function(e){
    updateTitle(idea, element, e, requestService)
  })
}

var updateTitle = function(idea, element, e, requestService) {
  if (e.keyCode === 13){
    e.preventDefault()
    updateIdeaTitleOrBody(idea, requestService).then( function() {
      element.attr('contentEditable', false)
    })
  }
}

var inLineEditBody = function(requestService) {
  $('#ideas').on('click', '.body', function(){
    var that = this
    allowBodyEdits(that, requestService)
  })
}

var allowBodyEdits = function(that, requestService) {
  var idea = that.closest('.idea')
  var fullBody = $(idea).find('.full-body')
  var body = $(idea).find('.body')
  body.hide()
  fullBody.show().focus()

  $(idea).on('keydown', function(e){
    sendOnEnter(idea, e, body, fullBody, requestService)
  })
}

var sendOnEnter = function (idea, e, body, fullBody, requestService) {
  if (e.keyCode == 13){
    e.preventDefault()
    updateIdeaTitleOrBody(idea, requestService).then( function() {
      showTruncatedBody(body, fullBody)
    });
  }
}

var showTruncatedBody = function(body, fullBody){
  var truncatedText = truncate(fullBody.text())
  fullBody.hide()
  body.text(truncatedText)
  body.show()
}

var downIdeaQualityListener = function(requestService){
  $('#ideas').on('click', '.thumbsDown', function(){
    var that = this
    lowerIdeaQuality(that, requestService)
  })
}

var lowerIdeaQuality = function(that, requestService) {
  var idea = that.closest('.idea')
  var quality = $(idea).find('.quality')

  if ( quality !== 'swill') {
    var qualityIndex = ideaQualityCollection.indexOf(quality.text())
    var updatedQualityIndex = qualityIndex - 1
    var data = {quality: updatedQualityIndex}

    updateIdeaInDatabase(idea, data, requestService).then(function(){
      quality.text(ideaQualityCollection[updatedQualityIndex])
    })
  }
}


var upIdeaQualityListener = function(requestService){
  $('#ideas').on('click', '.thumbsUp', function(){
    var that = this
    increaseIdeaQuality(that, requestService)
  })
}

var increaseIdeaQuality = function(that, requestService) {
  var idea = that.closest('.idea')
  var quality = $(idea).find('.quality')

  if ( quality.text() !== 'genius') {
    var qualityIndex = ideaQualityCollection.indexOf(quality.text())
    var updatedQualityIndex = qualityIndex + 1
    var data = {quality: updatedQualityIndex}

    updateIdeaInDatabase(idea, data, requestService).then(function() {
      quality.text(ideaQualityCollection[updatedQualityIndex])
    })
  }
}

var updateIdeaTitleOrBody = function(idea, requestService) {
  var id = $(idea).data('id')
  var title = $(idea).find('.title')
  var body = $(idea).find('.full-body')
  var editedIdea = { title: title.text(), body: body.text()}

  return updateIdeaInDatabase(idea, editedIdea, requestService)
}



var updateIdeaInDatabase = function(idea, data, requestService) {
  var id = $(idea).data('id')
  return requestService.patch('/api/v1/ideas/' + id, data)
}
