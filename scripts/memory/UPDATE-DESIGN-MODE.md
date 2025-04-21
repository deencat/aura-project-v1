# Design Mode Document Update

Please update the Design Mode document with the following change:

Replace:
```
- Always summaries the conseervation observation and update memory MCP using existing memory-add-conversation script, do not pass in blank conversation as it required that as input parameter
```

With:
```
- Always summarize the conversation observations and update memory MCP using the new memory-add script:
  `npm run memory-add -- "Observation 1" "Observation 2" "Observation 3"`
  Do not pass in blank conversation as it requires observations as input parameters
```

This update reflects the new consolidated memory system script that resolves path issues and provides a cleaner interface for adding memory observations. 