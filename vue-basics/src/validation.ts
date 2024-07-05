export interface Status {
    valid: boolean
    message?: string
    name?: string
}

type Rule = (value: string) => Status

export function length({ min, max }: { min: number, max: number }): Rule {
    return function (value: string): Status {
        const result = Boolean(value.length >= min && value.length <= max)

        return {
            valid: result,
            message: result ? undefined : `This field must be between ${min} and ${max}`,
            name: undefined,
        }
    }
}

export const required: Rule = (value: string): Status => {
    const result = Boolean(value)

    return {
        valid: result,
        message: result ? undefined : 'This filed is required',
        name: undefined,
    }
}

export function validate(value: string, rules: Rule[]): Status {
    // console.log('rules', rules);
    for (const rule of rules) {
        const result = rule(value)
        if (!result.valid) {
            return result;
        }
    }
    return {
        valid: true
    }
}