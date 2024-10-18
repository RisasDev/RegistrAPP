@echo off
echo Estableciendo la política de ejecución de PowerShell...

:: Ejecutar PowerShell para establecer la política de ejecución
powershell -Command "Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force"

if %ERRORLEVEL% NEQ 0 (
    echo No se pudo establecer la política de ejecución.
    pause
    exit /b
)

echo Política de ejecución establecida a Unrestricted.



:: Forzar el cierre de cualquier proceso de Node.js
taskkill /F /IM node.exe >nul 2>&1

echo Desinstalando Node.js...

:: Desinstalar Node.js usando msiexec
wmic product where "name='Node.js'" call uninstall /nointeractive

:: Esperar unos segundos para que la desinstalación se complete
timeout /t 5
echo Instalando Node.js...

:: Definir la ruta de instalación de Node.js
set NODEJS_PATH=C:\Program Files\nodejs

:: Borrar el contenido de la carpeta de Node.js si existe
if exist "%NODEJS_PATH%" (
    echo Borrando contenido de %NODEJS_PATH%...  
    
    del /Q "%NODEJS_PATH%\*" >nul 2>&1
    rmdir /S /Q "%NODEJS_PATH%\node_modules" >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo No se pudo borrar la carpeta de Node.js. Verifica si hay procesos en uso o permisos.
        pause
        exit /b
    )
)
:: Definir la URL de la versión de Node.js que deseas instalar
set NODEJS_URL=https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi

:: Descargar el instalador de Node.js
echo Descargando Node.js...
powershell -Command "Invoke-WebRequest -Uri %NODEJS_URL% -OutFile nodejs.msi"

:: Instalar Node.js
echo Instalando Node.js...
msiexec /i nodejs.msi /quiet /norestart
if %ERRORLEVEL% NEQ 0 (
    echo Hubo un error al instalar nodejs. 
    pause
    exit /b
)
:: Esperar unos segundos antes de continuar
timeout /t 5

echo Instalando Angular CLI...
:: Ejecutar PowerShell para instalar Angular CLI
powershell -Command "npm install -g @angular/cli"
if %ERRORLEVEL% NEQ 0 (
    echo Hubo un error al instalar Angular CLI. 
    pause
    exit /b
)

echo Instalación de Angular CLI completada.

echo Instalando Ionic CLI...
:: Ejecutar PowerShell para instalar Ionic CLI
powershell -Command "npm install -g @ionic/cli"
if %ERRORLEVEL% NEQ 0 (
    echo Hubo un error al instalar Ionic CLI. 
    pause
    exit /b
)

echo Instalación de Ionic CLI completada.

pause