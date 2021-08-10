import * as API from './'

export default{
    BrowseInstructorList: (RequestJson) => {
        return API.POST('Admin/BrowseInstructorList', RequestJson)
    },
    GetInstructorSearchOption: (RequestJson) => {
        return API.POST('Admin/GetInstructorSearchOption', RequestJson)
    },
    InstructorDetail: (RequestJson) => {
        return API.POST('Admin/InstructorDetail', RequestJson)
    },
}