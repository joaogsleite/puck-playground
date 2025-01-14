import { defaultLocale } from "./locale"

export interface IRoutingCtx {
  locale: string
  [key: string]: string
}
export const initialCtx: IRoutingCtx = {
  locale: defaultLocale
}
