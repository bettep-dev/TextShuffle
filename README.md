# TextShuffle

[![npm version](https://img.shields.io/npm/v/text-shuffle.svg)](https://www.npmjs.com/package/text-shuffle)
[![license](https://img.shields.io/npm/l/text-shuffle.svg)](https://github.com/Hongdaesik/TextShuffle/blob/master/LICENSE)
[![Angular](https://img.shields.io/badge/Angular-21+-dd0031.svg)](https://angular.dev)

A lightweight Angular library that renders canvas-based text shuffle animations. Characters are randomly mixed with vibrant colors and progressively revealed in order.

[Live Demo](https://bettep.org/text-shuffle)

![Demo](https://raw.githubusercontent.com/Hongdaesik/TextShuffle/master/DEMO.gif)

---

## Installation

```bash
npm install text-shuffle
```

---

## Quick Start

```typescript
import { Component } from '@angular/core'
import { TextShuffleComponent } from 'text-shuffle'

@Component({
  selector: 'app-example',
  imports: [TextShuffleComponent],
  template: `
    <text-shuffle
      [text]="text"
      [option.auto]="true"
      [option.duration]="500"
    />
  `
})
export class ExampleComponent {
  text = 'Hover me to see the magic!'
}
```

---

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `[text]` | `string` | **required** | The text string to display and animate. |
| `[option.auto]` | `boolean` | `false` | When `true`, the shuffle animation plays automatically on load. |
| `[option.color]` | `string[]` | 13 preset colors | Array of hex color codes used for the shuffle effect. |
| `[option.duration]` | `number` | `500` | Total duration of the reveal animation in milliseconds. |
| `[option.multiply]` | `number` | `2.0` | Canvas resolution multiplier for high-DPI displays. |

### Default Colors

```
#ff3100  #ff8000  #ffc600  #88ff00  #00ff71
#00e8ff  #0084ff  #3100ff  #ff00e1  #ff003e
#e6e6e6  #808080  #333333
```

---

## Advanced Usage

```typescript
@Component({
  selector: 'app-custom',
  imports: [TextShuffleComponent],
  template: `
    <text-shuffle
      [text]="title"
      [option.auto]="false"
      [option.color]="colors"
      [option.duration]="800"
      [option.multiply]="3.0"
    />
  `,
  styles: [`
    text-shuffle {
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
    }
  `]
})
export class CustomComponent {
  title = 'Custom Shuffle Effect'
  colors = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899']
}
```

> The component inherits `font-size`, `font-weight`, `color`, and `letter-spacing` from its parent element.

---

## Changelog

| Version | Description |
|---------|-------------|
| `2.0.2` | Angular 21 upgrade. Signal inputs, `inject()`, `effect()` migration. |
| `2.0.1` | Standalone / SSR compatible. |
| `2.0.0` | Remove package dependency. |
| `1.0.4` | Change demo address. |
| `1.0.0` | Initial release. |

---

## License

[MIT](https://opensource.org/licenses/MIT) &copy; [HONG DAESIK](https://bettep.org)