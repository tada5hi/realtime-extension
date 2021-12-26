/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { RedisEntityID, RedisKeyContext, RedisKeyOptions } from '../type';

export function buildRedisKey<
    I extends RedisEntityID = never,
    C extends RedisKeyContext = never,
>(params?: {context?: C, id?: I}, options?: RedisKeyOptions) {
    params ??= {};
    options ??= {};

    const parts : string[] = [];

    if (options.prefix) {
        parts.push(options.prefix);
    }

    if (typeof params.context !== 'undefined') {
        const out : string[] = [];

        const keys = Object.keys(params.context);
        for (let i = 0; i < keys.length; i++) {
            out.push(`${keys[i]}:${params.context[keys[i]]}`);
        }

        parts.push(`{${out.join(',')}}`);
    }

    let key = parts.join('.');
    if (typeof params.id !== 'undefined') {
        key += `#${params.id}`;
    }

    if (options.suffix) {
        key += (key.length > 0 ? '.' : '') + options.suffix;
    }

    return key;
}