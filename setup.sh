#!/bin/bash

# Colores para los mensajes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Iniciando configuración del proyecto Santander Totem...${NC}"

# Crear estructura de directorios
echo -e "${GREEN}Creando estructura de directorios...${NC}"
mkdir -p src/components
mkdir -p src/server
mkdir -p uploads/identity-photos
mkdir -p server/uploads/fotos
mkdir -p models

# Crear archivo .gitignore
echo -e "${GREEN}Creando .gitignore...${NC}"
cat > .gitignore << EOL
node_modules/
dist/
.DS_Store
uploads/identity-photos/*
!uploads/identity-photos/.gitkeep
# Permitir las fotos de referencia
!server/uploads/fotos/
!server/uploads/fotos/*
EOL

# Crear archivos .gitkeep
touch uploads/identity-photos/.gitkeep
touch server/uploads/fotos/.gitkeep

# Copiar fotos de ejemplo (si existen)
echo -e "${GREEN}Copiando fotos de referencia...${NC}"
if [ -d "fotos_ejemplo" ]; then
  cp fotos_ejemplo/* server/uploads/fotos/
  echo "Fotos de ejemplo copiadas a server/uploads/fotos/"
else
  echo "No se encontró la carpeta fotos_ejemplo"
fi

# Descargar modelos de face-api
echo -e "${GREEN}Descargando modelos de face-api...${NC}"
cd models
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_recognition_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_recognition_model-shard1
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_recognition_model-shard2
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_landmark_68_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/face_landmark_68_model-shard1
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/ssd_mobilenetv1_model-weights_manifest.json
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/ssd_mobilenetv1_model-shard1
curl -O https://raw.githubusercontent.com/vladmandic/face-api/master/model/ssd_mobilenetv1_model-shard2
cd ..

# Instalar dependencias
echo -e "${GREEN}Instalando dependencias...${NC}"
npm install

# Configurar permisos
echo -e "${GREEN}Configurando permisos...${NC}"
chmod -R 755 uploads
chmod -R 755 server/uploads
chmod -R 755 models

# Crear archivo README.md
echo -e "${GREEN}Creando README.md...${NC}"
cat > README.md << EOL
# Santander Totem

Sistema de totem interactivo con reconocimiento facial.

## Requisitos
- Node.js v18 o superior
- npm v9 o superior

## Instalación
1. Clonar el repositorio
2. Ejecutar \`npm install\`
3. Iniciar el servidor: \`npm run dev\`

## Estructura
- \`/src\`: Código fuente del frontend
- \`/src/server\`: Código del servidor
- \`/uploads\`: Directorio para fotos temporales
- \`/server/uploads/fotos\`: Directorio para fotos de referencia
- \`/models\`: Modelos de reconocimiento facial
EOL

echo -e "${BLUE}Configuración completada. Para iniciar el proyecto:${NC}"
echo -e "${GREEN}npm run dev${NC}"

# Inicializar git si no existe
if [ ! -d .git ]; then
  echo -e "${GREEN}Inicializando repositorio git...${NC}"
  git init
  git add .
  git commit -m "Initial commit: Proyecto Santander Totem con fotos de referencia"
fi 
