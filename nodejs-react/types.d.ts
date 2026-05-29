declare let suspended: any;

declare global {
  interface HTMLElementTagNameMap {
    "stream-content": any;
  }
}

namespace JSX {
  type ElementType = any;
  interface IntrinsicElements {
    "stream-content": any;
  }
}
