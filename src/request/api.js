import { get , getFile, post } from './http'
// export const api1 = p1 => get('https://xxx/v5/weather?city=qingdao&key=1b47b16e4aa545eaa55a66f859ac0089', p1)
// export const api2 = p2 => get('https://xxx/v5/weather?city=taian&key=1b47b16e4aa545eaa55a66f859ac0089', p2)

// 用户
export const login = p => get('/user/login', p)
export const getUser = p => get('/user/getUser', p)
export const pageUser = p => get('/user/pageUser', p)
export const getUserAndSkill = p => get('/user/getUserAndSkill', p)
export const getUsername = p => get('/user/getUsername', p)
export const getRealName = p => get('/user/getRealName', p)
export const getRealNamePuTong = p => get('/user/getRealNamePuTong', p)
export const getUserRoleType = p => get('/user/getUserRoleType', p)
export const getEducation = p => get('/user/getEducation', p)
export const selectByName = p => get('/user/selectByName', p)
export const selectRoleTypeByName = p => get('/user/selectRoleTypeByName', p)
export const addUser = p => post('/user/addUser', p)
export const deleteUser = p => get('/user/deleteUser', p)
export const updateUser = p => post('/user/updateUser', p)
export const exportDefaultTemplate = p => getFile('/user/exportDefaultTemplate', p)
export const exportUser = p => getFile('/user/exportUser', p)
export const importUser = p => post('/user/importUser', p)


//职位
export const getJob = p => get('/job/getJob', p)
export const pageJob = p => get('/job/pageJob', p)
export const getJobType = p => get('/job/getJobType', p)
export const jobAndCompanyDetailByjobName = p => get('/job/jobAndCompanyDetailByjobName', p)
export const getWorkPosition = p => get('/job/getWorkPosition', p)
export const getEducationRequirement = p => get('/job/getEducationRequirement', p)
export const addJob = p => post('/job/addJob', p)
export const deleteJob = p => get('/job/deleteJob', p)
export const updateJob = p => post('/job/updateJob', p)
export const exportDefaultTemplateJob = p => getFile('/job/exportDefaultTemplate', p)
export const exportJob = p => getFile('/job/exportJob', p)
export const importJob = p => post('/job/importJob', p)

//企业
export const getCompany = p => get('/company/getCompany', p)
export const pageCompany = p => get('/company/pageCompany', p)
export const getCompanyName = p => get('/company/getCompanyName', p)
export const getCompanyType = p => get('/company/getCompanyType', p)
export const getLocation = p => get('/company/getLocation', p)
export const addCompany = p => post('/company/addCompany', p)
export const deleteCompany = p => get('/company/deleteCompany', p)
export const updateCompany = p => post('/company/updateCompany', p)
export const exportDefaultTemplateCompany = p => getFile('/company/exportDefaultTemplate', p)
export const exportCompany = p => getFile('/company/exportCompany', p)
export const importCompany = p => post('/company/importCompany', p)


//角色权限
export const getRole = p => get('/role/getRole', p)
export const pageRole = p => get('/role/pageRole', p)
export const getRoleType = p => get('/role/getRoleType', p)
export const addRole = p => post('/role/addRole', p)
export const deleteRole = p => get('/role/deleteRole', p)
export const updateRole = p => post('/role/updateRole', p)

//技能
export const pageSkill = p => get('/skill/pageSkill', p)
export const getEnglishSkill = p => get('/skill/getEnglishSkill', p)
export const getComputerSkill = p => get('/skill/getComputerSkill', p)
export const getAppliedPosition = p => get('/skill/getAppliedPosition', p)
export const addSkill = p => post('/skill/addSkill', p)
export const deleteSkill = p => get('/skill/deleteSkill', p)
export const updateSkill = p => post('/skill/updateSkill', p)

//文件上传
export const uploadFile = p => post('/file/upload', p)
export const downloadFile = p => getFile('/file/download', p)

//简历
export const pageJianLi = p => get('/jianli/pageJianLi', p)
export const getUserName = p => get('/jianli/getUserName', p)
export const getApplicationPosition = p => get('/jianli/getApplicationPosition', p)
export const deleteJianLi = p => get('/jianli/deleteJianLi', p)
export const updateUsernameById = p => get('/jianli/updateUsernameById', p)
export const getNewFileNameByUsername = p => get('/jianli/getNewFileNameByUsername', p)


//申请职位
export const apply = p => get('/application/apply', p)
export const tongYi = p => get('/application/tongYi', p)
export const buTongYi = p => get('/application/buTongYi', p)
export const tongGuo = p => get('/application/tongGuo', p)
export const buTongGuo = p => get('/application/buTongGuo', p)
export const pageApplication = p => get('/application/pageApplication', p)
export const deleteApplication = p => get('/application/deleteApplication', p)
export const getStatus = p => get('/application/getStatus', p)
export const getApplicationPositionForA = p => get('/application/getApplicationPositionForA', p)
export const getUsernameAndApplicationPosition = p => get('/application/getUsernameAndApplicationPosition', p)