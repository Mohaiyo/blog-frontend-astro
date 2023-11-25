import type { imageMetadata } from "astro/assets/utils";

declare module '*.svg'
declare module '*.png' {
  imageMetadata
}
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'