/**
 * Created by DELL on 2018/3/2.
 */
import * as ajax from "./ajax";
export const getDatas = async ({commit}, url) => {
  let resultData = await ajax._getAjax(url);
  try {
    commit("REQUIRE_INFO", resultData)
  } catch (e) {
    alert("获取数据失败")
  }
  return resultData;
};
