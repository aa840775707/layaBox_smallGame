export default class GameView extends Laya.Script {
    /** @prop {name:moveBg, type:Node} 背景 */
    private moveBg: Laya.Image;
    /** @prop {name:monsterPrefab, type:Prefab} 怪物 */
    private monsterPrefab: Laya.Prefab;
    /** @prop {name:rolePrefab, type:Prefab} 角色 */
    private rolePrefab: Laya.Prefab;
    /** @prop {name:bulletPrefab, type:Prefab} 子弹 */
    private bulletPrefab: Laya.Prefab;
    /** @prop {name:leftBtn, type:Node} 左按钮 */
    private leftBtn: Laya.Button;
    /** @prop {name:rightBtn, type:Node} 右按钮 */
    private rightBtn: Laya.Button;

    constructor() {
        super();
    }

    onEnable(): void {

        this.initView();
    }

    onStart(): void {

    }

    private initView(): void {
        let bgH = this.moveBg.height;
        let stageH = Laya.stage.height;
        this.moveBg.y = -(bgH - stageH);

        
    }

    onDisable(): void {

    }
}