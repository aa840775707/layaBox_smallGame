/** 道具*/
export default class PropPrefab extends Laya.Script {
    constructor() {
        super();
    }

    onEnable(): void {

    }

    onTriggerEnter(other: any, self: any, contact: any): void {
        console.log("道具", other, self, contact);
    }

    onUpdate(): void {
        
    }

    onDisable(): void {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Laya.Pool.recover("monster", this.owner);
    }
}