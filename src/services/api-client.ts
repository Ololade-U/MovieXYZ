import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmMxMWVlMGM0Mjc4NjJmNDlkNmI2N2NmMGJiMTUyYSIsIm5iZiI6MTc1NDEzNjQyOC40MDYwMDAxLCJzdWIiOiI2ODhkZmY2Yzc3OTVjOTFhMTJiMjI4ODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xQZ9mlGK7HWfwr5kBlXFz-_X2VX2FLBOqYhS01C0sKI'

export default axios.create({
    baseURL : 'https://api.themoviedb.org/3',
    params : {
        key : 'a2c11ee0c427862f49d6b67cf0bb152a',
    },
    headers : {
        Authorization :   `Bearer ${token}`,
        "Content-Type" : 'application/json'
    }
})