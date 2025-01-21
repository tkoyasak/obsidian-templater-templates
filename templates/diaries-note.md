<%*
const m = moment()
const id = m.format('YYYYMM')
const file = tp.config.target_file
const new_path = file.path.replace(/[^/]+\.md$/, `${id}.md`)
if (this.app.vault.getFileByPath(new_path)) {
  await tp.app.vault.delete(file)
  new Notice(`ERROR: \`${new_path}\` already exists and \`${file.path}\` was deleted.`, 0)
  return
}
const created = tp.file.creation_date('YYYY-MM-DD')
const modified = tp.file.last_modified_date('YYYY-MM-DD')
await tp.app.fileManager.renameFile(file, new_path)

const dow = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const n = m.daysInMonth()
const w = m.startOf('month').weekday()
tR += `---
id: ${id}
created_at: ${created}
modified_at: ${modified}
---
`
for (let i = 1; i <= n; i++) {
  const dd = i.toString().padStart(2, '0')
  const ddd = dow[(w + i - 1) % 7]
  tR += `
###### ${id}${dd}${ddd}


`
}
-%>
