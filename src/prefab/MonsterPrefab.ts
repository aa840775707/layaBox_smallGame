import Const from "../script/Const";
import BulletPrefab from "./BulletPrefab";

/** 怪物 */
export default class MonsterPrefab extends Laya.Script {
    /** @prop {name:labNum, type:Node} 道具预制 */
    private labNum: Laya.Label;

    /**怪物id */
    private mid: number = 1;
    /**怪物速度  */
    private mSpeed: number = 1;
    /**怪物防御  */
    private mBlood: number = 1;

    constructor() {
        super();
    }

    onEnable(): void {
        Laya.stage.on(Const.EVEN_GAMEOVER, this, this.gameOver);
        let rig = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({ x: 0, y: 2 });
    }

    /** 设置怪物id */
    public setMonsterID(i: number = 0): void {
        this.mid = i;
    }

    /** 设置怪物血量 */
    public setMonsterBlood(d: number = 0): void {
        this.mBlood = d;
        this.labNum.text = this.mBlood.toString();
    }

    /** 设置怪物移动速度 */
    public steMonsterSpeed(s: number = 1): void {
        this.mSpeed = s;
        this.owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: this.mSpeed });
    }

    /** 怪物死亡 */
    private monsterDie(): void {
        this.owner.removeSelf();
    }

    /** 游戏结束 */
    private gameOver(): void {
        this.owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: 0 });
    };

    onTriggerEnter(other: any, self: any, contact: any): void {
        if (other.label == "buttle") {
            let otherCom = other.owner.getComponent(BulletPrefab) as BulletPrefab;
            let bHarm = otherCom.bHarm;
            this.mBlood -= bHarm;
            this.labNum.text = this.mBlood.toString();
            if (this.mBlood <= 0) this.monsterDie();
        }
    }

    onUpdate(): void {
        if (this.mid == 9) {
            let node = this.owner as Laya.Sprite;
            if (node.y >= 4800) {
                Laya.stage.event(Const.EVEN_GAMEOVER);
            }
        }
    }

    onDisable(): void {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Laya.Pool.recover("monster", this.owner);
    }
}