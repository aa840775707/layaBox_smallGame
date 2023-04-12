import Common from "./script/Common";

export default class Index extends Laya.Script {
    /** @prop {name:btnList, type:Node} */
    private btnList: Laya.List;

    constructor() { super(); }

    onEnable(): void {
        this.btnList.renderHandler = new Laya.Handler(this, this.listHandle);
        let arr = [];
        let maps = Common.getConfigByName("Map");
        for (const key in maps) {
            if (Object.prototype.hasOwnProperty.call(maps, key)) {
                const element = maps[key];
                arr.push(element); 
            }
        }
        this.btnList.array = arr;
    }

    private listHandle(cell: Laya.Box, index: number) {
        let itemData = cell.dataSource;
        let btnStart = cell.getChildByName("btnStart") as Laya.Button;
        btnStart.label = `第${index + 1}关`;
        btnStart.offAll(Laya.Event.CLICK);
        btnStart.on(Laya.Event.CLICK, this, ()=>{
            Laya.Scene.open("GameView.scene");
        });
    }


    onDisable(): void {

    }
}