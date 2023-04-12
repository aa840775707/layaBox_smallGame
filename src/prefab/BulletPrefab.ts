/** 子弹 */
export default class BulletPrefab extends Laya.Script {
    /** 子弹速度 */
    public bSpeed: number = 20;
    /** 子弹伤害 */
    public bHarm: number = 1;

    constructor() { 
        super(); 
    }

    onEnable(): void {
        var rig: Laya.RigidBody = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({ x: 0, y: -this.bSpeed });
    }

    onTriggerEnter(other: any, self: any, contact: any): void {
        // console.log("子弹", other, self, contact);
        if (other.label == "role") return;
        this.owner.removeSelf();
    }

    onUpdate(): void {
        if ((this.owner as Laya.Sprite).y < -10) {
            this.owner.removeSelf();
        }
    }

    onDisable(): void {
        Laya.Pool.recover("bullet", this.owner);
    }
}