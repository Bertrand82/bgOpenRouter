@echo off
setlocal enabledelayedexpansion

echo.
echo  ng build github base bgOpenRouter===
CALL ng build --output-path docsTemp --base-href /bgOpenRouter/
CALL ng build
echo  ng build 
CALL ng build 
echo  xcopy done 
echo  xcopy github
CALL xcopy "" 
CALL xcopy "docsTemp\browser" "docs" /E /I /H /Y

echo ===  git add . ===
git add .

echo.
echo  git commit ===
git commit -m "save"

echo.
echo  git push ===
git push

CALL firebase deploy --only hosting
if %ERRORLEVEL% neq 0 (
    echo [ERREUR] deploy a échoué.
    goto fin
)
echo.
echo === YES It is deployed   ===
goto end
:fin
echo WARNING !!!! deply n'est pas arrivé à la fin
endlocal
:end
echo https://bgopenrouter.web.app/
echo https://bertrand82.github.io/bgOpenRouter/home.html
pause
