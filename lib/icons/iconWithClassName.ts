import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

export function iconWithClassName(icon: LucideIcon) {
<<<<<<< HEAD
cssInterop(icon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
      opacity: true,
    },
  },
});
}
=======
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
>>>>>>> 593890f17d083bdfa339c0c91163757a0212a69c
