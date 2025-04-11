import 'react';

declare module 'react' {
  interface IntrinsicElements {
    'a-scene': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      embedded?: boolean;
      'vr-mode-ui'?: string;
    };
    'a-assets': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      timeout?: string | number;
    };
    'a-videosphere': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      rotation?: string;
    };
    'a-camera': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      position?: string;
      'look-controls'?: string;
      'wasd-controls'?: string;
    };
    'a-entity': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}