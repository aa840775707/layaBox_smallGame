export default class VictoryView extends Laya.Script {
    /** @prop {name:btnAgain, type:Node} */
    private btnAgain: Laya.Button;

    constructor() {
        super();
    }

    onEnable(): void {
        this.btnAgain.on(Laya.Event.CLICK, this, () => {
            Laya.Scene.open("GameView.scene");
        });
    }

    onDisable(): void {

    }
}