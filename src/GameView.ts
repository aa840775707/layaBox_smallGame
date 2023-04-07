import RolePrefab from "./prefab/RolePrefab";
import { ui } from "./ui/layaMaxUI";

export default class GameView extends Laya.Script {
    /** @prop {name:monsterPrefab, type:Prefab} 怪物预制 */
    private monsterPrefab: Laya.Prefab;
    /** @prop {name:rolePrefab, type:Prefab} 角色预制 */
    private rolePrefab: Laya.Prefab;
    /** @prop {name:bulletPrefab, type:Prefab} 子弹预制 */
    private bulletPrefab: Laya.Prefab;

    /** @prop {name:imgbg, type:Node} 移动底板 */
    private imgbg: Laya.Image;
    /** @prop {name:leftBtn, type:Node} 左按钮 */
    private leftBtn: Laya.Button;
    /** @prop {name:rightBtn, type:Node} 右按钮 */
    private rightBtn: Laya.Button;
    /** @prop {name:roleSpr, type:Node} 容器 */
    private roleSpr: Laya.Sprite;
    private roleNode: Laya.Sprite;

    /**生成子弹速度 */
    private creBulletTime1 = 8;
    private creBulletTime2 = 0;
    /**背景移动速度 */
    private moveBgTime1 = 2;
    private moveBgTime2 = 0;

    constructor() {
        super();
    }

    onEnable(): void {
        Laya.MouseManager.multiTouchEnabled = false; //多点触控关闭
        this.leftBtn.on(Laya.Event.MOUSE_DOWN, this, this.touchLeftStart);
        this.leftBtn.on(Laya.Event.MOUSE_UP, this, this.touchEnd);
        this.rightBtn.on(Laya.Event.MOUSE_DOWN, this, this.touchRightStart);
        this.rightBtn.on(Laya.Event.MOUSE_UP, this, this.touchEnd);
        
        this.initView();
    }

    initView(): void {
        let bgH = this.imgbg.height;
        let stageW = Laya.stage.width;
        let stageH = Laya.stage.height;
        this.imgbg.y = -(bgH - stageH);
        this.roleNode = this.rolePrefab.create();
        this.roleSpr.addChild(this.roleNode);
        this.roleNode.pos((stageW / 2) - (this.roleNode.width / 2), stageH - this.roleNode.height - 200);
    }

    /** 子弹生成 */
    buldBullet(): void {
        let flyer: Laya.Sprite = Laya.Pool.getItemByCreateFun("bullet", this.bulletPrefab.create, this.bulletPrefab);
        let crex = (this.roleNode.x) + (this.roleNode.width / 2) - (flyer.width / 2);
        let crey = this.roleNode.y;
        flyer.pos(crex, crey);
        this.roleSpr.addChild(flyer);
    }

    /** 左按钮点击开始 */
    touchLeftStart(): void {
        let com: RolePrefab = this.roleNode.getComponent(RolePrefab);
        com.steSpeedDir(1);
    }

    /** 右按钮点击开始 */
    touchRightStart(): void {
        let com: RolePrefab = this.roleNode.getComponent(RolePrefab);
        com.steSpeedDir(2);
    }

    /** 点击结束 */
    touchEnd() {
        let com: RolePrefab = this.roleNode.getComponent(RolePrefab);
        com.steSpeedDir(0);
    }

    /** 背景移动 */
    moveBg() {
        this.imgbg.y += 2;
    }

    onUpdate(): void {
        // 子弹
        this.creBulletTime2 += 1;
        if (this.creBulletTime2 > this.creBulletTime1) {
            this.creBulletTime2 = 0;
            this.buldBullet();
        }
        // 背景
        this.moveBgTime2 += 1;
        if (this.moveBgTime2 > this.moveBgTime1) {
            this.moveBgTime2 = 0;
            this.moveBg();
        }
    }

    onDisable(): void {

    }
}