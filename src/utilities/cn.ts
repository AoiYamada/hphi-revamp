import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
  tailwind-merge 不認得 globals.css 裡自訂的陰影名稱，會把 `shadow-focus` 當成陰影「顏色」，
  導致 `shadow-focus` 和 `shadow-focus-inverse` 不會互相取代。這裡把自訂的陰影名稱加進陰影群組，
  後面的 class 才能穩定地蓋掉前面的。名稱要和 globals.css 的 `--shadow-*` token 保持一致。
*/
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ['float', 'focus', 'focus-inverse'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
