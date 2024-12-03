export function handleResponse(error: string, statusCode: number | undefined, message: string, data: any) {
    return { error: error, statusCode: statusCode, message: message, data: data }
}