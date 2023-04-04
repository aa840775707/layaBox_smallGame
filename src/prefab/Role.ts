import Event = Laya.Event;
import Keyboard = Laya.Keyboard;
import KeyBoardManager = Laya.KeyBoardManager;
export default class Role extends Laya.Script {
    /** 角色的站立方向 */
    private roleDirection: string;
    private lastRoleDirection: string;
    private roleStand: Laya.Animation;
    private roleRun: Laya.Animation;
    private _owner: Laya.Sprite;
    private bg: Laya.Image;
    constructor() { super(); }

    onEnable(): void {
        this._owner = this.owner as Laya.Sprite;
        this.roleStand = this._owner.getChildByName("roleStand") as Laya.Animation;
        this.roleRun = this._owner.getChildByName("roleRun") as Laya.Animation;
        this.bg = this.owner.parent as Laya.Image;
    }

    /** 播放动画
     * @param name 动画名称
     * @param type 动画类型，跑:run，停:stand
     */
    playRoleAni(name: string, type: string = "stand"): void {
        if (type == "run") {
            //停掉站立动画

            this.roleStand.visible = false;
            this.roleStand.isPlaying && this.roleStand.stop();

            this.roleRun.visible = true;
            //播放跑动动画
            this.roleRun.play(0, true, name);
        } else {
            this.roleRun.visible = false;
            this.roleRun.isPlaying && this.roleRun.stop();

            this.roleStand.play(0, true, name);
            this.roleStand.visible = true;
        }
    }


    onUpdate(): void {
        this.lastRoleDirection = this.roleDirection;
        //侦听键盘事件，让用户来控制主角移动
        if (KeyBoardManager.hasKeyDown(Keyboard.UP) || KeyBoardManager.hasKeyDown(Keyboard.W)) {
            this.roleDirection = "Up";
            this._owner.y -= 2;
            this._owner.y < 80 && (this._owner.y = 80);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.DOWN) || KeyBoardManager.hasKeyDown(Keyboard.S)) {
            this.roleDirection = "Down";
            this._owner.y += 2;
            this._owner.y > (this.bg.height - 130) && (this._owner.y = this.bg.height - 130);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.LEFT) || KeyBoardManager.hasKeyDown(Keyboard.A)) {
            this.roleDirection = "Left";
            this._owner.x -= 2;
            this._owner.x < 30 && (this._owner.x = 30);
        } else if (KeyBoardManager.hasKeyDown(Keyboard.RIGHT) || KeyBoardManager.hasKeyDown(Keyboard.D)) {
            this.roleDirection = "Right";
            this._owner.x += 2;
            this._owner.x > (this.bg.width - 130) && (this._owner.x = (this.bg.width - 130));
        }

        //方向改变之后，才调整播放的动画
        this.lastRoleDirection !== this.roleDirection && this.playRoleAni(this.roleDirection, "run");
    }

    //键盘控键抬起时
    onKeyUp(e: Event): void {
        this.playRoleAni(this.roleDirection);
        //清空方向，用于下次按键的同方向播放判断；
        this.roleDirection = "";
    }

    onDisable(): void {
    }
}