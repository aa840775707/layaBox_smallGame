/** 怪物 */
export default class MonsterPrefab extends Laya.Script {
    /** @prop {name:labNum, type:Node} 道具预制 */
    private labNum: Laya.Label;

    /**刚体对象引用 */
    private _rig: Laya.RigidBody
    private mid: number = 1;
    private mDefense: number = 1;

    constructor() {
        super();
    }

    onEnable(): void {
        let rig = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({ x: 0, y: 2 });
    }

    /** 设置怪物防御 */
    public setMonsterDefense(mid: number = 0, num: number = 0): void {
        this.mid = mid;
        this.mDefense = mid;
        this.labNum.text = this.mid.toString();
    }

    onTriggerEnter(other: any, self: any, contact: any): void {
        console.log("怪物", other, self, contact);

    }

    onUpdate(): void {

    }

    onDisable(): void {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Laya.Pool.recover("monster", this.owner);
    }
}