import axiosClientUser from "./axiosClientUser";
const userApi = {
    register(data) {
        const url = "/auth/local/register";
        return axiosClientUser.post(url, data)
    },
};
export default userApi;