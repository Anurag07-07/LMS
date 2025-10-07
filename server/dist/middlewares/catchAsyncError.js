export const CatchAsyncError = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
};
//# sourceMappingURL=catchAsyncError.js.map