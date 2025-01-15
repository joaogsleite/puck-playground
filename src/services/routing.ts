import { defaultLocale } from "./locale"

export interface IRoutingCtx {
  [key: string]: unknown
}
export const initialCtx: IRoutingCtx = {
  locale: defaultLocale
}
