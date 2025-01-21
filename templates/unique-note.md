<%*
const id = await tp.user.ulid()
const created = tp.file.creation_date('YYYY-MM-DD')
const modified = tp.file.last_modified_date('YYYY-MM-DD')
const title = tp.file.title
const file = tp.config.target_file
const new_path = file.path.replace(/[^/]+\.md$/, `${id}.md`)
await tp.app.fileManager.renameFile(file, new_path)
-%>
---
id: <% id %>
created_at: <% created %>
modified_at: <% modified %>
title: <% title %>
tags: []
---
