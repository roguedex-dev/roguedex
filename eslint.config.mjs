import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
import eslintConfigPrettier from 'eslint-config-prettier'

const compat = new FlatCompat()

export default [
    ...fixupConfigRules(
        compat.config({
            extends: ['standard'],
        })
    ),
	eslintConfigPrettier,
    {
        rules: {
            'no-undef': 'warn',
            'no-tabs': 'warn',
            'no-unused-vars': 'warn',
            'no-mixed-spaces-and-tabs': 'warn',
            eqeqeq: 'warn',
        },
    },
]
