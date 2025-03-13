Tarea 0.4

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: El usuario ingresa un texto en el input del formulario y da click en el boton save 

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: El servidor solicita una redireccion a una direccion definida (/notes)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Documento HTML
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: El archivo de estilos CSS
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: El archivo JavaScript
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON... [{"content": "test","date": "2025-03-12T23:38:41.244Z"}]

```

Tarea 0.5
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: Documento HTML
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Archivo CSS
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: Archivo JavaScript
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Hola mundo", date: "2025/03/12..." }]
    deactivate server
```

Tarea 0.6
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: El usuario ingresa un texto en el input del formulario y le da al boton save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa  
    activate server
    server-->>browser: Envia los datos como una cadena JSON
```