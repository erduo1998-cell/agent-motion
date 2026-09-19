![Agent Motion — Three.js talking-head films](docs/images/agent-motion-cover.png)

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [Español](README.es.md) · [Français](README.fr.md)

[Demos](#demos) · [Proceso](#workflow) · [Empezar](#start)

**Tu voz. Ideas que se pueden ver.**

Entrega tu grabación, el SRT completo y tus indicaciones a un agente. Agent Motion guía el análisis, el diseño en movimiento y la revisión hasta entregar **MP4 + proyecto Three.js editable**.

<sub>Uso no comercial. El uso comercial exige autorización escrita previa. <a href="LICENSE">Licencia ↗</a></sub>

<a id="demos"></a>

## Mira la diferencia

### 01 / Zonas verdes, al detalle

**60 segundos · Original a la izquierda / resultado a la derecha.** Tiempos de origen correspondientes; rostros con desenfoque de bordes suaves y seguimiento en ambos lados. Vistas previas sin sonido.

<p align="center">
  <img src="docs/media/greening.gif" alt="Zonas verdes: original a la izquierda y resultado a la derecha" width="620">
</p>

<p align="center"><strong><a href="docs/media/greening.mp4">Ver / descargar MP4 ↗</a></strong></p>

#### Dos formas más de contar

<details>

<summary><strong>02 / Entrenamiento híbrido</strong> — Abrir la comparación de 60 segundos</summary>

<p align="center">
  <img src="docs/media/hybrid-opening.gif" alt="02 / Entrenamiento híbrido" width="620">
</p>

<p align="center"><strong><a href="docs/media/hybrid-opening.mp4">Ver / descargar MP4 ↗</a></strong></p>

</details>

<details>

<summary><strong>03 / Comunicación escolar</strong> — Abrir la comparación de 60 segundos</summary>

<p align="center">
  <img src="docs/media/communication.gif" alt="03 / Comunicación escolar" width="620">
</p>

<p align="center"><strong><a href="docs/media/communication.mp4">Ver / descargar MP4 ↗</a></strong></p>

</details>

Tres películas aprobadas por el autor. Zonas verdes y entrenamiento son selecciones cronológicas con tiempos de origen; comunicación escolar es un tramo continuo. No verifican todas las revisiones posteriores de los Skills. [Versiones y alcance de revisión →](docs/demo-evidence.md)

<a id="workflow"></a>

## De la grabación a la película

![Vídeo, subtítulos e indicaciones; análisis; recursos y persona; tipografía y espacio; movimiento; sonido; revisión; MP4 y proyecto editable](docs/images/production-flow.png)

**Analizar → Preparar recursos y persona → Componer texto y espacio → Animar → Mezclar sonido → Revisar y corregir.**

El agente lee cada etapa, resuelve primero la apertura y el pasaje más difícil y desarrolla el resto con una autoría continua. Conserva los tiempos del habla y revisa la salida real. La instalación y el lector de etapas apoyan el proceso; no generan una película por sí solos.

### Cuatro principios de diseño

![Cuatro principios: significado, persona, tipografía y movimiento continuo](docs/images/design-system.png)

- **Primero, el significado** — Las acciones visuales explican la idea hablada; se conservan las pruebas y los tiempos.
- **La persona en el espacio** — Capa sincronizada, profundidad y encuadre cuidado. Contorno solo al sustituir el fondo original.
- **Tipografía con función** — Comparar fuentes en composiciones reales; definir jerarquía, momentos legibles y tiempo de lectura.
- **Movimiento continuo** — Conectar objetos y atención entre ideas. Validar un tramo continuo antes de ampliar la película.

<a id="start"></a>

## Empezar en local

Instala **Node.js 22+**, **Python 3.10+** y **FFmpeg/ffprobe** en PATH. setup descarga Chromium; no llama a servicios de generación de pago. Los comandos funcionan en PowerShell y shells POSIX.

```sh
git clone https://github.com/erduo1998-cell/agent-motion.git
cd agent-motion
npm ci
npm run setup
npm run doctor
npm test
npm run smoke
```

Coloca la grabación y el SRT completo en `inputs/`, abre el repositorio en tu agente y pide:

> Lee AGENTS.md y los dos Skills locales. Crea una película con inputs/source.mp4 e inputs/source.srt, conservando el orden y los tiempos de la voz. Trabaja en work/my-first-film/. Completa análisis, recursos, capa de la persona, tipografía y espacio, movimiento continuo, sonido y revisión real. Entrega MP4 y proyecto editable. Responde en español.

Ejecuta `npm run serve` y abre la página creada por el agente en `http://127.0.0.1:8793/work/my-first-film/`. La raíz del servidor no contiene una película terminada.

### Tu agente y tu sistema

Codex, Claude Code, Gemini CLI, Cursor y GitHub Copilot tienen entradas a los mismos Skills locales. Otros agentes pueden leer `AGENTS.md`. **No requiere una API exclusiva de Codex.** El entorno necesita archivos, terminal, navegador e inspección audiovisual.

**Windows · macOS · Ubuntu: herramientas verificadas.** Los seis trabajos CI de 3 sistemas × Node 22/24 superaron instalación, pruebas, empaquetado, diagnóstico del navegador y renderizado real Three.js → H.264. [CI ↗](https://github.com/erduo1998-cell/agent-motion/actions/runs/35433570433)

Esto verifica las herramientas. Hay películas completas producidas con Codex; todavía no se ha completado una película independiente en cada uno de los otros clientes. [Compatibilidad y pruebas →](docs/compatibility.md)

## Idiomas, referencias y permisos

Cinco README; Skills canónicos mantenidos en chino. Los agentes multilingües pueden trabajar en tu idioma. Cada salida requiere revisar fuentes, glifos, saltos y tiempo de lectura. No incluye doblaje automático.

La biblioteca pública contiene **43 análisis, 109 intervalos de mecanismos y cinco grupos de métodos tutoriales**, solo en texto/JSON. No distribuye vídeos originales, audio, fotogramas, miniaturas ni transcripciones completas. La generación y el recorte opcionales dependen de tus herramientas y licencias. [Explorar los análisis →](reference-library/analysis/README.md)

El código, los Skills, los documentos y los análisis propios usan **Motion Craft Community License 1.0**, una licencia personalizada basada en cláusulas Apache-2.0 con restricciones no comerciales. No es Apache-2.0 estándar. **El uso comercial exige autorización escrita previa.** Fuentes y dependencias conservan sus licencias; los medios de demostración quedan fuera de esta concesión.

[Licencia](LICENSE) · [Permiso comercial](COMMERCIAL-LICENSE.md) · [Avisos de terceros](THIRD_PARTY_NOTICES.md)

---

[Arquitectura](docs/architecture.md) · [Contribuir](CONTRIBUTING.md) · [Preparación](docs/release-readiness.md)
