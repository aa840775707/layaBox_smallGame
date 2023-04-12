import Const from "../script/Const";
import MonsterPrefab from "./MonsterPrefab";

export default class RolePrefab extends Laya.Script {
    /** 刚体对象引用 */
    private _rig: Laya.RigidBody
    /** 角色移动速度 */
    private rSpeed: number = 10;
    /** 角色移动方向 0 停止， 1左， 2右*/
    private moveDir: number = 0;

    constructor() {
        super();
    }

    onEnable(): void {
        this._rig = this.owner.getComponent(Laya.RigidBody);
    }

    onTriggerEnter(other: any, self: any, contact: any): void {
        if (other.label == "monster") {
            let otherCom = other.owner.getComponent(MonsterPrefab) as MonsterPrefab;
            this.roleDie();
        }
    }

    /** 角色死亡 */
    private roleDie(): void {
        Laya.stage.event(Const.EVEN_GAMEOVER);
    }

    /** 设置速度方向 */
    public steSpeedDir(dir: number = 0): void {
        this.moveDir = dir;
        if (dir == 1) this._rig.setVelocity({ x: -this.rSpeed, y: 0 });
        else if (dir == 2) this._rig.setVelocity({ x: this.rSpeed, y: 0 });
        else if (dir == 0) this._rig.setVelocity({ x: 0, y: 0 });
    }

    onUpdate(): void {
        let stageW = Laya.stage.width;
        let stageH = Laya.stage.height;
        let thatNode = this.owner as Laya.Sprite;
        if (this.moveDir == 1 && thatNode.x <= 0) return this._rig.setVelocity({ x: 0, y: 0 });
        if (this.moveDir == 2 && thatNode.x >= stageW - thatNode.width) return this._rig.setVelocity({ x: 0, y: 0 });
    }

    onDisable(): void {

    }
}