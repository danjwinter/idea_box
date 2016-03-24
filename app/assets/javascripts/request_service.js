var requestService = {};

requestService.get = function(url) {
  return $.get(url)
}

requestService.post = function(url, data) {
  return $.post(url, data)
}

requestService.patch = function(url, data) {
  if ($.isFunction(data) || data === undefined) {
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'PATCH',
    data: data
  })
}

requestService.delete = function(url, data) {
  if ($.isFunction(data) || data === undefined) {
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'DELETE',
    data: data
  })
}
