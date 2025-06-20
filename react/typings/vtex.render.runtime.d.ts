// /* Typings for `render-runtime` */
// declare module 'vtex.render-runtime' {
//   import type { ComponentType, ReactElement, ReactType } from 'react'

//   export interface NavigationOptions {
//     page: string
//     params?: any
//   }

//   export interface RenderContextProps {
//     runtime: {
//       navigate: (options: NavigationOptions) => void
//     }
//   }

//   interface ExtensionPointProps {
//     id: string
//     [key: string]: any
//   }

//   export const ExtensionPoint: ComponentType<ExtensionPointProps>

//   interface ChildBlockProps {
//     id: string
//   }

//   export const ChildBlock: ComponentType<ChildBlockProps>
//   export const useChildBlock = function (data: ChildBlockProps): ChildBlock {}

//   type UseTreePath = () => Record<string, unknown>

//   export const useTreePath: UseTreePath
//   export const Helmet: ReactElement
//   export const Link: ReactType
//   export const NoSSR: ReactElement
//   export const RenderContextConsumer: ReactElement
//   export const canUseDOM: boolean
//   export const withRuntimeContext: <TOriginalProps>(
//     Component: ComponentType<TOriginalProps & RenderContextProps>
//   ) => ComponentType<TOriginalProps>
// }
