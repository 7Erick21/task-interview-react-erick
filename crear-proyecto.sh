#!/bin/bash

# Verificar si se proporcionó un nombre de proyecto
if [ -z "$1" ]; then
  echo "Por favor, proporciona un nombre para el nuevo proyecto."
  exit 1
fi

# Clonar el repositorio base
git clone https://github.com/7Erick21/task-interview-react-erick.git $1

# Navegar al nuevo directorio del proyecto
cd $1

# Instalar dependencias
npm install

# Renombrar el proyecto en package.json
sed -i "s/\"name\": \"tu-proyecto-nextjs\"/\"name\": \"$1\"/" package.json

# Instrucciones adicionales para despliegue en Cloudflare
echo "Para desplegar en Cloudflare, sigue estos pasos:"
echo "1. Configura tu cuenta de Cloudflare y crea un nuevo sitio."
echo "2. Ejecuta 'npm run build' para construir el proyecto."
echo "3. Sube los archivos de la carpeta 'out' a Cloudflare."

echo "¡Proyecto $1 creado y listo para desplegar!"
