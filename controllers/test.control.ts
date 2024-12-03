import { handleResponse } from '../handler/handler.response'
import { HTTP_OK } from '../util/httpStatusCode'

export function test() {
    return handleResponse('0', HTTP_OK, 'SUCCESS', [])
}