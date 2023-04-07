/** 子弹 */
export default class BulletPrefab extends Laya.Script {
    /** 子弹速度 */
    private bSpeed: number = 20;
    /** 子弹伤害 */
    private bHarm: number = 1;

    constructor() { 
        super(); 
    }

    onEnable(): void {
        //设置初始速度
        var rig: Laya.RigidBody = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({ x: 0, y: -this.bSpeed });
    }

    onTriggerEnter(other: any, self: any, contact: any): void {
        // console.log("子弹", other, self, contact);
        if (other.label == "role") return;
        this.owner.removeSelf();
    }

    onUpdate(): void {
        //如果子弹超出屏幕，则移除子弹
        if ((this.owner as Laya.Sprite).y < -10) {
            this.owner.removeSelf();
        }
    }

    onDisable(): void {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Laya.Pool.recover("bullet", this.owner);
    }
}