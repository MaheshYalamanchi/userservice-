const invoke = require("../../lib/http/invoke")
let newUserSave = async (params) => {
    try {
        var formData={
            fullname:params.params.fullname,
            role:params.params.role,
            email:params.params.email,
            OrgId:params.OrgId
        }
        var getdata = {
            url: process.env.MONGO_URI,
            client: "users",
            docType: 0,
            query: formData
        };
        let getData = await invoke.makeHttpCall("post", "write", getdata);
        if (getData) {
            return getData;
        } else {
            return "Data Not Found";
        }
    } catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }

};
module.exports = {
    newUserSave,
}