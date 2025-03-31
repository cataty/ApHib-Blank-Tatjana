# Git

## Iniciamos un Repositorio Nuevo
- Configurar el usuario
``` bash
    git config --globla user.name "Jonathan"
    git config --global user.email "jonathan.cruz@davinci.edu.ar"
``` 



- Inicio el repositorio
``` bash
    git init
```

- Agrego lo archivos
``` bash
    git add .
``` 

- Realizo el commit
``` bash
    git commit -m "Semana 02 - Módulos"
``` 

## Vínculamos GitHub con el repositorio local
``` bash
    git remote add origin https://github.com/jonathancruzdev/dw-hibirdas-0125.git
``` 

- Subimos los commits
``` bash
    git push origin master
``` 

## Luego
``` bash
git add .
git commit -m "Descripción de los cambios"
git push origin master
``` 
