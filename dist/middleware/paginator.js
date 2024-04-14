"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateResults = void 0;
function paginateResults(model) {
    return (req, res, next) => {
        const query = req.query;
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 2;
        const last_page = req.query.last_page;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = {};
        const totalCount = model.count();
    };
}
exports.paginateResults = paginateResults;
//# sourceMappingURL=paginator.js.map