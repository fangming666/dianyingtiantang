/**
 * Created by DELL on 2018/3/5.
 */
import axios from "axios";
export const _getAjax = async (url) => {
  let dataS = await axios({
    method: "get",
    url: url,
    timeout: 3000,
    responseType: "json"
  });
  try {
    return dataS
  } catch (e) {
    return Promise.reject(new Error)
  }

};
