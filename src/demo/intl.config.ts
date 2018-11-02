// Entirely optional to include this file
// Simply enables @intl/cli features like JSON linting  
/// @ts-ignore
import { Config } from '@intl/config';

export const config: Config = {
    srcDir: '/i18n'
}

export interface Schema {
    greeting: string,
    title: {
        profile: string
    },
    name: string
}
