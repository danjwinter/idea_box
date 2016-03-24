var searchForIdea = function(){
  $('#search').on('keyup', function(e){
    e.preventDefault()

    var query = $(this).val()

    var ideas = $('.idea');

    $.each(ideas, function(index, idea){
      var title = $(idea).find('.title').text()
      var body = $(idea).find('.body').text()

      if (title.includes(query) || body.includes(query)) {
        $(idea).show()
      } else {
        $(idea).hide()
      }
    })
  })
}
