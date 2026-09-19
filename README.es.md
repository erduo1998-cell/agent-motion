# Agent Motion · Vídeos de presentación con Three.js

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

> **Uso comercial solo con autorización previa por escrito.** [Licencia](LICENSE) · [Solo análisis de referencias; sin vídeos originales](reference-library/analysis/README.md)

**Convierte una grabación hablando a cámara y sus subtítulos en una película con diseño en movimiento, mediante un agente de programación.** Los Skills locales guían el análisis, los recursos y la capa de la persona, la tipografía, la composición espacial, la animación continua, el sonido y la revisión. El resultado incluye un MP4 y el proyecto Three.js editable.

## Antes y después

Cada GIF dura 60 segundos: original a la izquierda y resultado a la derecha, con los rostros cubiertos por mosaicos opacos en ambos lados. Entrenamiento y zonas verdes son selecciones cronológicas con tiempos de origen; comunicación escolar es un tramo continuo. No tienen sonido.

![Entrenamiento: antes y después](docs/media/hybrid-opening.gif)

![Zonas verdes: comparación de 60 segundos con rostros ocultos](docs/media/greening.gif)

![Comunicación escolar](docs/media/communication.gif)

Extractos de tres películas aprobadas por el autor. No constituyen una prueba completa de las reglas actuales. [Versiones y alcance](docs/demo-evidence.md).

## Primeros pasos

Necesitas Node.js 22+, Python 3.10+, FFmpeg/ffprobe en PATH y Chromium. Desde la carpeta del proyecto ejecuta lo siguiente; setup descarga el navegador.

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

Coloca tus archivos en `inputs/` y pide al agente:

> Lee AGENTS.md y los dos Skills locales. Crea una película con inputs/source.mp4 e inputs/source.srt, conservando el orden y los tiempos de la voz. Trabaja en work/my-first-film/. Completa análisis, recursos, capa de la persona, composición, movimiento, sonido y revisión real. Entrega MP4 y proyecto editable. Responde en español.

Con `npm run serve`, abre la página creada por el agente en `http://127.0.0.1:8793/work/my-first-film/`.

## Agentes y plataformas

No requiere una API exclusiva de Codex. Incluye entradas para Codex, Claude Code, Gemini CLI, Cursor y GitHub Copilot que remiten a los mismos Skills. El agente necesita archivos, terminal, navegador e inspección audiovisual. Las herramientas portátiles y la configuración de CI cubren Windows/macOS/Linux; disponer de una entrada no demuestra una película completa en cada combinación. Consulta las [pruebas realizadas](docs/compatibility.md).

El agente ejecuta el proceso; no es un compilador universal de vídeo con un solo comando. Una autoría continua mantiene la coherencia del film. La generación opcional de recursos y el recorte de personas dependen de tus herramientas y licencias.

Hay cinco README traducidos. Los Skills canónicos están en chino y pueden seguirlos agentes multilingües. Cada idioma requiere fuentes, glifos, saltos de línea y tiempos de lectura adecuados. No incluye doblaje automático.

[Arquitectura](docs/architecture.md) · [Contribuir](CONTRIBUTING.md) · [Preparación](docs/release-readiness.md)

El código, los Skills, la documentación y los análisis propios usan [Motion Craft Community License 1.0](LICENSE), una licencia personalizada basada en cláusulas Apache-2.0 con restricciones no comerciales. **El uso comercial requiere autorización previa por escrito**. [Permiso comercial](COMMERCIAL-LICENSE.md). No es la licencia Apache-2.0 estándar. Fuentes y dependencias conservan sus licencias; los vídeos de demostración quedan excluidos. [Avisos](THIRD_PARTY_NOTICES.md).
