var RequestService = function() {
};

RequestService.prototype.get = function(url) {
  return $.get(url)
}

RequestService.prototype.post = function(url, data) {
  return $.post(url, data)
}

RequestService.prototype.patch = function(url, data) {
  if ($.isFunction(data) || data === undefined) {
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'PATCH',
    data: data
  })
}

RequestService.prototype.delete = function(url, data) {
  if ($.isFunction(data) || data === undefined) {
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'DELETE',
    data: data
  })
}
