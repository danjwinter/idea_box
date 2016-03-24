var ideaQualityCollection = [
  'swill', 'plausible', 'genius'
]

var inLineEditTitle = function(){
  $('#ideas').on('click', '.title', function(){
    var that = this
    allowTitleEdits(that)
  })
}

var allowTitleEdits = function(that) {
  var idea = that.closest('.idea')
  var element = $(idea).find('.title')

  element.attr('contentEditable', true).focus()

  $(idea).on('keydown blur', function(e){
    updateTitle(idea, element, e)
  })
}

var updateTitle = function(idea, element, e) {
    updateIdeaTitleOrBody(idea).then( function() {
      if (e.keyCode === 13 || e.type === 'blur'){
      e.preventDefault()
      element.attr('contentEditable', false)
      }
  })
}

var inLineEditBody = function() {
  $('#ideas').on('click', '.body', function(){
    var that = this
    allowBodyEdits(that)
  })
}

var allowBodyEdits = function(that) {
  var idea = that.closest('.idea')
  var fullBody = $(idea).find('.full-body')
  var body = $(idea).find('.body')
  body.hide()
  fullBody.show().focus()
  listenForEnterOrBlur(idea, body, fullBody)
}

var listenForEnterOrBlur = function(idea, body, fullBody) {
  fullBody.on('blur', function(e){
    sendOnEnter(idea, e, body, fullBody)
  })

  $(idea).on('keydown blur', function(e){
    sendOnEnter(idea, e, body, fullBody)
  })
}

var sendOnEnter = function (idea, e, body, fullBody) {
  if (e.keyCode == 13 || e.type === 'blur'){
    e.preventDefault()
    updateIdeaTitleOrBody(idea).then( function() {
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

var downIdeaQualityListener = function(){
  $('#ideas').on('click', '.thumbsDown', function(){
    var that = this
    lowerIdeaQuality(that)
  })
}

var lowerIdeaQuality = function(that) {
  var idea = that.closest('.idea')
  var quality = $(idea).find('.quality')

  if ( quality !== 'swill') {
    var qualityIndex = ideaQualityCollection.indexOf(quality.text())
    var updatedQualityIndex = qualityIndex - 1
    var data = {quality: updatedQualityIndex}

    updateIdeaInDatabase(idea, data).then(function(){
      quality.text(ideaQualityCollection[updatedQualityIndex])
    })
  }
}


var upIdeaQualityListener = function(){
  $('#ideas').on('click', '.thumbsUp', function(){
    var that = this
    increaseIdeaQuality(that)
  })
}

var increaseIdeaQuality = function(that) {
  var idea = that.closest('.idea')
  var quality = $(idea).find('.quality')

  if ( quality.text() !== 'genius') {
    var qualityIndex = ideaQualityCollection.indexOf(quality.text())
    var updatedQualityIndex = qualityIndex + 1
    var data = {quality: updatedQualityIndex}

    updateIdeaInDatabase(idea, data).then(function() {
      quality.text(ideaQualityCollection[updatedQualityIndex])
    })
  }
}

var updateIdeaTitleOrBody = function(idea) {
  var id = $(idea).data('id')
  var title = $(idea).find('.title')
  var body = $(idea).find('.full-body')
  var editedIdea = { title: title.text(), body: body.text()}

  return updateIdeaInDatabase(idea, editedIdea)
}



var updateIdeaInDatabase = function(idea, data) {
  var id = $(idea).data('id')
  return requestService.patch('/api/v1/ideas/' + id, data)
}
