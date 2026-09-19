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

**1. Preparar el entorno**

Instala Node.js 22+, Python 3.10+ y FFmpeg / ffprobe, y asegúrate de que estén en PATH. Estos comandos funcionan en PowerShell y shells POSIX; setup descarga Chromium.

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
```

**2. Dar las indicaciones al agente**

Coloca la grabación y el SRT completo en `inputs/`, abre el repositorio en tu agente de programación y envía:

> Lee AGENTS.md y los dos Skills locales del proyecto. Crea una película completa de una persona hablando a cámara con inputs/source.mp4 e inputs/source.srt. Conserva el orden y los tiempos de la voz original. Trabaja en work/my-first-film/. Completa todas las etapas de producción y revisa el resultado real. Entrega el MP4 y el proyecto editable. Responde en español.

**3. Ver el resultado**

Ejecuta `npm run serve` y abre la página de la película creada por el agente en [work/my-first-film/](http://127.0.0.1:8793/work/my-first-film/). La raíz del servidor no contiene una película predefinida.

<details>
<summary>Verificar la instalación y el renderizado</summary>

```sh
npm test
npm run smoke
```

La prueba de funcionamiento realiza un renderizado real Three.js → H.264. La instalación y la verificación no llaman a servicios de generación de pago. La generación de imágenes y el recorte de personas opcionales dependen de las herramientas y licencias disponibles.

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

**Plataformas**: los seis trabajos de CI de Windows, macOS y Ubuntu × Node 22/24 superaron la instalación, las pruebas y el renderizado real. Hay evidencia de producción de películas completas en Codex; aún no se ha completado una prueba independiente de una película entera en cada uno de los otros clientes. [Compatibilidad y pruebas](docs/compatibility.md)

## Más información

- [Arquitectura](docs/architecture.md) — los dos Skills, las herramientas y la estructura del repositorio.
- [Biblioteca de análisis de referencias](reference-library/analysis/README.md) — 43 casos, 109 intervalos que ilustran mecanismos y cinco métodos de tutoriales; solo texto / JSON, sin vídeos de referencia, audio, fotogramas ni transcripciones completas.
- [Contribuir](CONTRIBUTING.md) — cómo realizar y verificar cambios.

Los README están disponibles en cinco idiomas; los Skills canónicos se mantienen en chino. Los agentes pueden trabajar en tu idioma. Revisa las fuentes, los glifos, los saltos de línea y el tiempo de lectura de cada película; no se incluye doblaje automático.

## Licencia

**Uso no comercial. El uso comercial requiere autorización previa por escrito.**

El código, los Skills, los documentos y los análisis propios del proyecto usan **Motion Craft Community License 1.0**, una licencia personalizada basada en los términos de Apache-2.0 con restricciones no comerciales. Las fuentes y las dependencias conservan sus licencias; los vídeos de demostración quedan excluidos de la autorización del proyecto.

[Licencia completa](LICENSE) · [Autorización comercial](COMMERCIAL-LICENSE.md) · [Avisos de terceros](THIRD_PARTY_NOTICES.md)
