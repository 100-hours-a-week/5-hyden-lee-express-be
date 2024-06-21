export default class responseMessages {
    static success(status, message, data) {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        };
    };
    static failure(status, message, data) {
        return {
            status: status,
            success: false,
            message: message,
            data: data
        }
    }
}