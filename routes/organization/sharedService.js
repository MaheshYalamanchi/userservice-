const invoke = require("../../lib/http/invoke")
const schedule = require("./schedule")
let orgEntery = async (params) => {
    console.log("params======",params)
  try{
    var jsonData={
        orgname:params.Org_name,
        description:params.description,
        thumbnail:params.Thumbnail
    }
    console.log(jsonData)
      var getdata = {
          url: process.env.MONGO_URI,
          client: "org",
          docType: 0,
          query: jsonData
      };
      let responseData = await invoke.makeHttpCall("post", "write", getdata);
      console.log(responseData);
      if(responseData && responseData.data&&responseData.data.iid){
        var newData = {
            params:params,
            OrgId:responseData.data.iid
          }
          let getData = await schedule.newUserSave(newData);
          if(getData && getData.data && getData.data.statusMessage){
              return { success: true, message: 'data inserted in org and user collection' }
          } else {
              return { success: false, message: 'Data Not Found' }
          }
      } else {
          return { success: false, message: 'Data Not Found' }
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
  orgEntery,
}