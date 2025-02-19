import { z } from 'zod'

namespace types {
  export function nodeEnv() {
    return z.enum(['development', 'production'])
  }

  export function url() {
    return z.string().url()
  }

  export function commaSeparatedList() {
    return z.string().transform(v => {
      return v.split(',').filter(Boolean)
    })
  }

  export function int() {
    return z.number().finite().int()
  }

  export function uuid() {
    return z.string().uuid()
  }

  export function safeNumber() {
    return z.number().finite()
  }
}

namespace customZod {
  export namespace coerce {
    export function int() {
      return z.coerce.number().pipe(types.int())
    }
  }

  export const { object, string, enum: enumeration, boolean, ZodError } = z

  export const { nodeEnv, url, commaSeparatedList, int, uuid, safeNumber } =
    types

  export type Infer<T extends z.ZodType<any, any, any>> = T['_output']

  export type Output<T extends z.ZodType<any, any, any>> = T['_output']

  export type Input<T extends z.ZodType<any, any, any>> = T['_input']

  export type ZodTypeAny = z.ZodTypeAny

  export type ZodSchema = z.ZodSchema

  export type ZodErrorAny = z.ZodError
}

export { customZod as z }
