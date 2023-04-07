import MonsterPrefab from "./prefab/MonsterPrefab";
import RolePrefab from "./prefab/RolePrefab";
import { ui } from "./ui/layaMaxUI";

export default class GameView extends Laya.Script {
    /** @prop {name:monsterPrefab, type:Prefab} 怪物预制 */
    private monsterPrefab: Laya.Prefab;
    /** @prop {name:rolePrefab, type:Prefab} 角色预制 */
    private rolePrefab: Laya.Prefab;
    /** @prop {name:bulletPrefab, type:Prefab} 子弹预制 */
    private bulletPrefab: Laya.Prefab;
    /** @prop {name:propPrefab, type:Prefab} 道具预制 */
    private propPrefab: Laya.Prefab;

    /** @prop {name:sprBg, type:Node} 移动底板 */
    private sprBg: Laya.Sprite;
    /** @prop {name:leftBtn, type:Node} 左按钮 */
    private leftBtn: Laya.Button;
    /** @prop {name:rightBtn, type:Node} 右按钮 */
    private rightBtn: Laya.Button;
    /** @prop {name:roleSpr, type:Node} 主角容器 */
    private roleSpr: Laya.Sprite;
    /** @prop {name:msterSpr, type:Node} 怪物容器 */
    private msterSpr: Laya.Sprite;

    /** 主角实例 */
    private roleNode: Laya.Sprite;
    /** 类型1怪物2道具，位置 */
    private posArr: { mid: number, type: number, pos: Laya.Point, data: any }[];

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
        this.buildRole();

        this.posArr = [
            { mid: 1, type: 1, pos: new Laya.Point(96, 3993), data: 10 },
            { mid: 2, type: 1, pos: new Laya.Point(520, 3524), data: 20 },
            { mid: 3, type: 1, pos: new Laya.Point(68, 3028), data: 30 },
            { mid: 4, type: 1, pos: new Laya.Point(553, 2531), data: 40 },
            { mid: 5, type: 1, pos: new Laya.Point(68, 1980), data: 50 },
            { mid: 6, type: 1, pos: new Laya.Point(533, 1429), data: 60 },
            { mid: 7, type: 1, pos: new Laya.Point(83, 1005), data: 70 },
            { mid: 8, type: 1, pos: new Laya.Point(520, 496), data: 80 },
            { mid: 9, type: 1, pos: new Laya.Point(37, 16), data: 90 },
        ];
        this.msterSpr.removeChildren();
        this.posArr.forEach(element => {
            if (element.type == 1) this.buildMonster(element.mid, element.pos);
            else this.buildProp(element.mid, element.pos);
        });
        this.moveBg()
    }

    /** 生成主角 */
    private buildRole(): void {
        let bgH = this.sprBg.height;
        let stageW = Laya.stage.width;
        let stageH = Laya.stage.height;
        this.sprBg.y = -(bgH - stageH);
        this.roleNode = this.rolePrefab.create();
        this.roleSpr.addChild(this.roleNode);
        this.roleNode.pos((stageW / 2) - (this.roleNode.width / 2), stageH - this.roleNode.height - 200);
    }

    /** 生成怪物 */
    private buildMonster(mid: number, pos: Laya.Point): void {
        let monster: Laya.Sprite = Laya.Pool.getItemByCreateFun("monster", this.monsterPrefab.create, this.monsterPrefab);
        let monsterComt: MonsterPrefab = monster.getComponent(MonsterPrefab);
        monster.pos(pos.x, pos.y);
        monsterComt.setMonsterDefense(mid);
        this.msterSpr.addChild(monster);
    }

    /** 生成道具 */
    private buildProp(mid: number, pos: Laya.Point): void {
        let prop: Laya.Sprite = Laya.Pool.getItemByCreateFun("prop", this.propPrefab.create, this.propPrefab);
        let propComt: MonsterPrefab = prop.getComponent(MonsterPrefab);
        prop.pos(pos.x, pos.y);
        this.msterSpr.addChild(prop);
    }

    /** 子弹生成 */
    private buildBullet(): void {
        let flyer: Laya.Sprite = Laya.Pool.getItemByCreateFun("bullet", this.bulletPrefab.create, this.bulletPrefab);
        let crex = (this.roleNode.x) + (this.roleNode.width / 2) - (flyer.width / 2);
        let crey = this.roleNode.y;
        flyer.pos(crex, crey);
        this.roleSpr.addChild(flyer);
    }

    /** 左按钮点击开始 */
    private touchLeftStart(): void {
        let com: RolePrefab = this.roleNode.getComponent(RolePrefab);
        com.steSpeedDir(1);
    }

    /** 右按钮点击开始 */
    private touchRightStart(): void {
        let com: RolePrefab = this.roleNode.getComponent(RolePrefab);
        com.steSpeedDir(2);
    }

    /** 点击结束 */
    private touchEnd() {
        let com: RolePrefab = this.roleNode.getComponent(RolePrefab);
        com.steSpeedDir(0);
    }

    /** 背景移动 */
    private moveBg() {
        this.sprBg.y += 2;
    }

    onUpdate(): void {
        // 子弹
        this.creBulletTime2 += 1;
        if (this.creBulletTime2 > this.creBulletTime1) {
            this.creBulletTime2 = 0;
            this.buildBullet();
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