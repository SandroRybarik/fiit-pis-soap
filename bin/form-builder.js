
/**
 * from type name -> to { type, name }
 * @param {*} input 
 */
function prepareInput(input) {
  return input.replace(/\,|\;/g, "")
  .split("\n")
  .filter(l => l !== '')
  .map(l => l.split(" ").filter(p => p !== ''))
  .map(l => ({ type: l[0], name: l[1] }))
}

/**
 * Returns html representation of single { type, name } field
 * @param {Object} param
 */
function formField ({ type, name }) {

  const isSelect= name => name.indexOf('_id') !== -1
  const isDate = name => name.indexOf('_at') !== -1 || name.indexOf('_date') !== -1 || name.indexOf('date_') !== -1
  const isTime = name => name.indexOf('_time') !== -1 || name.indexOf('time_') !== -1

  if (isSelect(name)) {
    return `
    <div class="form-group">
      <label for="${name}">${name}</label>
      <select class="form-control" name="${name}" id="${name}" required>
        <option value="">Vyberte možnosť</option>
      </select>
    </div>
    `.trim()
  } else if (isDate(name)){
    return `
    <div class="form-group">
      <label for="${name}">${name}</label>
      <input name="${name}" id="${name}" type="date" class="form-control" required>
    </div>
    `.trim()
  } else if (isTime(name)) {
    return `
    <div class="form-group">
      <label for="${name}">${name}</label>
      <input name="${name}" id="${name}" type="time" class="form-control" required>
    </div>
    `.trim()
  } else if (type === 'string') {
    return `
    <div class="form-group">
      <label for="${name}">${name}</label>
      <input name="${name}" id="${name}" type="text" class="form-control" required>
    </div>
    `.trim()
  } else if (type === 'double' || type === 'int'){
    return `
    <div class="form-group">
      <label for="${name}">${name}</label>
      <input name="${name}" id="${name}" type="number" class="form-control" required>
    </div>
    `.trim()
  }
  else {
    return ''
  }
}

/**
 * Returns complete form assembled by stringified formFields
 * @see formField
 * @param {Array} formFields 
 */
function form (formFields) {
  return `
  <div class="container">
    <div class="col-md-6 offset-md-3">
      <form class="border p-3 bg-light" method="POST" action="">
        ${formFields.reduce((a,b) => a + b, '')}
      </form>
    </div>
  </div>
  `.trim()
}

/**
 * Handle cmd input for <type, field> input
 */
console.log("Input your type name fields here:")
process.stdin.resume();
process.stdin.setEncoding('utf8');

let buffer = ""

process.stdin.on('data', function(chunk) {
  buffer += chunk
});

process.stdin.on('end', function() {
  process.stdout.write('end');
  // return to user's console
  console.log(form( prepareInput(buffer).map(formField) ))
  return
});
