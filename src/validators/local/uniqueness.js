import $ from 'jquery'

const isLocallyUnique = (currentElement, value, otherValue, caseSensitive) => {
  if (!caseSensitive) {
    value = value.toLowerCase()
    otherValue = otherValue.toLowerCase()
  }

  if (otherValue === value) {
    $(currentElement).data('notLocallyUnique', true)
    return false
  }

  if ($(currentElement).data('notLocallyUnique')) {
    $(currentElement).removeData('notLocallyUnique').data('changed', true)
  }

  return true
}

export const uniquenessLocalValidator = (element, options) => {
  const elementName = element.attr('name')
  const matches = elementName.match(/^(.+_attributes\])\[\d+\](.+)$/)

  if (!matches) {
    return
  }

  const form = element.closest('form')

  const value = element.val()
  let valid = true

  form.find(':input[name^="' + matches[1] + '"][name$="' + matches[2] + '"]').not(element).each(function () {
    const otherValue = $(this).val()

    if (!isLocallyUnique(this, value, otherValue, options.case_sensitive)) {
      valid = false
    }
  })

  if (!valid) {
    return options.message
  }
}

export default {
  uniquenessLocalValidator
}
