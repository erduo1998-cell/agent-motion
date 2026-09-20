# Agent Motion

**Convierte una grabación de alguien hablando a cámara en una película diseñada con un agente de programación.** Grabación + SRT completo + indicaciones → MP4 + proyecto Three.js editable.

[Demos](#demos) · [Empezar](#start) · [Cómo funciona](#workflow) · [Compatibilidad](#compatibility)

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · **Español** · [Français](README.fr.md)

<p align="center">
  <img src="docs/images/agent-motion-cover.png" alt="Agent Motion — Palabras en movimiento" width="620">
</p>

<a id="demos"></a>

## Demos

**Zonas verdes, al detalle** · 60 segundos · Original a la izquierda / resultado a la derecha

<p align="center">
  <img src="docs/media/greening.gif" alt="Zonas verdes: original a la izquierda y película diseñada a la derecha" width="620">
</p>

<p align="center"><a href="docs/media/greening.mp4">Ver el MP4 con mayor calidad</a></p>

<details>
<summary><strong>Entrenamiento híbrido</strong> · Abrir la comparación de 60 segundos</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="Entrenamiento híbrido: original a la izquierda y película diseñada a la derecha" width="620">
</p>

<p align="center"><a href="docs/media/hybrid-opening.mp4">Ver el MP4 con mayor calidad</a></p>

</details>

<details>
<summary><strong>Comunicación entre docentes y familias</strong> · Abrir la comparación de 60 segundos</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="Comunicación escolar: original a la izquierda y película diseñada a la derecha" width="620">
</p>

<p align="center"><a href="docs/media/communication.mp4">Ver el MP4 con mayor calidad</a></p>

</details>

Tres películas aprobadas por el autor, con códigos de tiempo de origen coincidentes, seguimiento facial con desenfoque de bordes suaves y vistas previas sin sonido. [Versiones, fragmentos y alcance de la revisión](docs/demo-evidence.md)

<a id="start"></a>

## Empezar

**1. Descargar e instalar**

Solo necesitas **Node.js 22+ y un agente de programación**. En el repositorio, elige **Code → Download ZIP** y descomprime el archivo; no necesitas Git. Abre la carpeta extraída y haz doble clic en **`start.command` en macOS** o **`start.bat` en Windows**. En Linux o en la terminal del agente, ejecuta:

```sh
node scripts/bootstrap.mjs
```

`npm run onboard` abre el mismo instalador. Prepara las dependencias, un entorno Python dentro del proyecto, Chromium, FFmpeg / ffprobe y el modelo para separar a la persona del fondo; después comprueba el entorno y realiza una prueba breve del recorte. La primera ejecución necesita internet: espera a que termine. No tienes que instalar Python por separado ni ajustar modelos. [Guía detallada y ayuda (inglés y chino)](docs/getting-started.md#english)

**2. Entregar el material al agente**

Coloca la grabación y el SRT completo en `inputs/`, abre toda la carpeta extraída en tu agente y envía:

> Lee AGENTS.md, completa la guía de instalación si hace falta y lee los dos Skills locales del proyecto. Crea una película completa con inputs/source.mp4 e inputs/source.srt. Antes de componer, prepara y revisa una capa de la persona separada del fondo y sincronizada con el original. Conserva el orden y los tiempos de la voz. Trabaja en work/my-first-film/, completa todas las etapas y revisa la imagen y el sonido reales. Entrega el MP4 y el proyecto editable. Responde en español.

**Separar a la persona del fondo es obligatorio para los vídeos de una persona hablando a cámara.** El instalador proporciona un método local que funciona con CPU; puedes sustituirlo por una capa adecuada ya preparada u otra herramienta compatible. No necesitas una GPU dedicada. La generación de imágenes sigue siendo opcional.

**3. Ver el resultado**

Pide al agente que abra el MP4 terminado y la vista previa editable. Puede ejecutar `npm run serve` y abrir la página que haya creado en [work/my-first-film/](http://127.0.0.1:8793/work/my-first-film/). La raíz del servidor no contiene una película predefinida.

<details>
<summary>Comprobaciones que puede ejecutar el agente</summary>

```sh
npm run doctor -- --matting
npm test
npm run smoke
```

Doctor comprueba el entorno de recorte; Smoke realiza un renderizado real Three.js → H.264. Estas pruebas no sustituyen la revisión de los bordes de la persona y de la película terminada. La instalación y estas comprobaciones locales no llaman a servicios de generación de pago.

</details>

<a id="workflow"></a>

## Cómo funciona

Analiza los subtítulos completos, prepara los recursos y la capa de la persona, compone la tipografía y el espacio, crea una animación continua, mezcla el sonido y revisa el resultado.

<p align="center">
  <img src="docs/images/production-flow.png" alt="La grabación, el SRT completo y las indicaciones pasan por el análisis y cinco etapas de producción hasta un MP4 y un proyecto editable" width="940">
</p>

Un mismo responsable creativo desarrolla la apertura y el pasaje más difícil antes de ampliar la película. El agente lee cada etapa, conserva los tiempos de la voz e inspecciona la imagen y el sonido reales.

<details>
<summary>Principios de diseño: significado, personas, tipografía y movimiento continuo</summary>

<p align="center">
  <img src="docs/images/design-system.png" alt="Primero el significado, personas en el encuadre, tipografía con espacio y movimiento que conecta" width="940">
</p>

- **Primero, el significado**: elige acciones que expliquen la idea hablada; conserva las pruebas y los tiempos.
- **La persona en el espacio**: mantén una capa de la persona sincronizada, profundidad visible y un encuadre intencional. Añade contorno solo al sustituir el fondo original.
- **Tipografía con función**: compara fuentes en composiciones reales; establece jerarquías, puntos de lectura claros y tiempo para leer.
- **Movimiento continuo**: conecta los objetos y la atención entre ideas. Valida un fragmento continuo antes de ampliar la película.

</details>

<a id="compatibility"></a>

## Compatibilidad

**Agentes**: Codex, Claude Code, Gemini CLI, Cursor y GitHub Copilot tienen instrucciones de entrada para los mismos Skills locales. Otros agentes pueden leer `AGENTS.md` directamente. No se requiere ninguna API exclusiva de Codex. El entorno necesita acceso a archivos, terminal, navegador e inspección audiovisual.

**Plataformas**: los seis trabajos de CI de Windows, macOS y Ubuntu × Node 22/24 superaron las pruebas del entorno de renderizado el 19 de septiembre de 2026. Ese registro es anterior al nuevo instalador y a la integración del recorte; consulta el registro para conocer su alcance probado. Hay evidencia de producción de películas completas en Codex; aún no se ha completado una prueba independiente de una película entera en cada uno de los otros clientes. [Compatibilidad y pruebas](docs/compatibility.md)

## Más información

- [Arquitectura](docs/architecture.md) — los dos Skills, las herramientas y la estructura del repositorio.
- [Biblioteca de análisis de referencias](reference-library/analysis/README.md) — 43 casos, 109 intervalos que ilustran mecanismos y cinco métodos de tutoriales; solo texto / JSON, sin vídeos de referencia, audio, fotogramas ni transcripciones completas.
- [Contribuir](CONTRIBUTING.md) — cómo realizar y verificar cambios.

Los README están disponibles en cinco idiomas; los Skills canónicos se mantienen en chino. Los agentes pueden trabajar en tu idioma. Revisa las fuentes, los glifos, los saltos de línea y el tiempo de lectura de cada película; no se incluye doblaje automático.

## Licencia

**Uso no comercial. El uso comercial requiere autorización previa por escrito.**

El código, los Skills, los documentos y los análisis propios del proyecto usan **Motion Craft Community License 1.0**, una licencia personalizada basada en los términos de Apache-2.0 con restricciones no comerciales. Las fuentes y las dependencias conservan sus licencias; los vídeos de demostración quedan excluidos de la autorización del proyecto.

[Licencia completa](LICENSE) · [Autorización comercial](COMMERCIAL-LICENSE.md) · [Avisos de terceros](THIRD_PARTY_NOTICES.md)
