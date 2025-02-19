import { Injectable, Module, type DynamicModule } from '@nestjs/common'
import { config } from 'dotenv-safe'

export type ValidateFunction = (
  payload: Record<string, unknown>
) => Record<string, unknown>

export interface ConfigServiceOptions {
  validate?: ValidateFunction | undefined
}

@Injectable()
export class ConfigService<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  private readonly values: Map<string, unknown>

  constructor(options?: ConfigServiceOptions | undefined) {
    const { error, parsed } = config({})

    if (error) {
      throw new Error('Error reading env file.', {
        cause: error,
      })
    }

    if (!parsed) {
      throw new Error('Empty or broken env file.')
    }

    this.values = new Map(
      Object.entries(
        (
          options?.validate ??
          (payload => {
            return payload
          })
        )({
          ...process.env,
          ...parsed,
        })
      )
    )
  }

  public get<K extends keyof T>(key: K): T[K] {
    // @ts-expect-error
    return this.values.get(key)
  }
}

export interface ConfigModuleOptions {
  isGlobal?: boolean | undefined
  validate?: ValidateFunction | undefined
}

@Module({})
export class ConfigModule {
  public static forRoot(
    options?: ConfigModuleOptions | undefined
  ): DynamicModule {
    return {
      module: ConfigModule,
      global: options?.isGlobal ?? false,
      providers: [
        {
          provide: ConfigService,
          useFactory: () => {
            return new ConfigService({
              validate: options?.validate,
            })
          },
        },
      ],
      exports: [ConfigService],
    }
  }
}
