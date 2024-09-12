const invoke = require("../lib/http/invoke");
const globalMsg = require('../configuration/messages/message');

let errorupdate =async(params)=>{
    try {
        let url;
        let database;
        // if(params && params.tenantResponse && params.tenantResponse.success){
        //     url = params.tenantResponse.message.connectionString+'/'+params.tenantResponse.message.databaseName;
        //     database = params.tenantResponse.message.databaseName;
        // } else {
            url = process.env.MONGO_URI+'/'+process.env.DATABASENAME;
            database = process.env.DATABASENAME;
        // }
        let errorCounter = params.error
        errorCounter++;
        data = {
            url: url,
			database: database,
            model: "rooms",
            docType: 0,
            query: {
                filter: { "_id": params.id },
                update: { 
                    $push: { "errorlog" :  params.body },
                    $set: { error : errorCounter,ipaddress:params.body.ipaddress,color:params.body.color}
                }
            }
        };
        let result = await invoke.makeHttpCall("post", "update", data)
        if (result && result.data && result.data.statusMessage) {
            return { success: true, message: result.data.statusMessage }
        } else {
            return { success: true, message: 'Data Not Found'  }
        }
    } catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
};
let updateApproveStatus =async(params)=>{
    try {
        let url;
        let database;
        // if(params && params.tenantResponse && params.tenantResponse.success){
        //     url = params.tenantResponse.message.connectionString+'/'+params.tenantResponse.message.databaseName;
        //     database = params.tenantResponse.message.databaseName;
        // } else {
            url = process.env.MONGO_URI+'/'+process.env.DATABASENAME;
            database = process.env.DATABASENAME;
        // }
        data = {
            url: url,
			database: database,
            model: "rooms",
            docType: 0,
            query: {
                filter: { "_id": params.id },
                update: { 
                    $set: { color : params.color}
                }
            }
        };
        let result = await invoke.makeHttpCall("post", "update", data)
        if (result && result.data && result.data.statusMessage) {
            return { success: true, message: result.data.statusMessage }
        } else {
            return { success: true, message: 'Data Not Found'  }
        }
    } catch (error) {
        if (error && error.code == 'ECONNREFUSED') {
            return { success: false, message: globalMsg[0].MSG000, status: globalMsg[0].status }
        } else {
            return { success: false, message: error }
        }
    }
};
let updateIpAddress =async(params)=>{
    try {
        let url;
        let database;
        // if(params && params.tenantResponse && params.tenantResponse.success){
        //     url = params.tenantResponse.message.connectionString+'/'+params.tenantResponse.message.databaseName;
        //     database = params.tenantResponse.message.databaseName;
        // } else {
            url = process.env.MONGO_URI+'/'+process.env.DATABASENAME;
            database = process.env.DATABASENAME;
        // }
        data = {
            url: url,
			database: database,
            model: "rooms",
            docType: 0,
            query: {
                filter: { "_id": params.id },
                update: { 
                    $set: { ipaddress : params.ipaddress}
                }
            }
        };
        let result = await invoke.makeHttpCall("post", "update", data)
        if (result && result.data && result.data.statusMessage) {
            return { success: true, message: result.data.statusMessage }
        } else {
            return { success: true, message: 'Data Not Found'  }
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
    errorupdate,
    updateIpAddress,
    updateApproveStatus
}