import { defaultLocale } from "./locale"

export interface IRoutingCtx {
  [key: string]: string
}
export const initialCtx: IRoutingCtx = {
  locale: defaultLocale
}
