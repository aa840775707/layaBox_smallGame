export default class Common {
    /** 根据表名获得配置 */
    public static getConfigByName(cfgName: string): any {
        let jsonData = Laya.loader.getRes(`json/${cfgName}.json`);
        return jsonData;
    }

    

}