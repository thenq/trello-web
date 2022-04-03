// onKeyDown
export const handleColumnTitleEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

// Select all input values when clicked
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
  // document.execCommand('selectAll', false, null) // use as select()
}
