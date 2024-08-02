export interface ResponseObject {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}

export const createResponse = (success: boolean, message: string, data?: any, error?: any): ResponseObject => {
    return {
        success,
        message,
        data,
        error
    };
};
