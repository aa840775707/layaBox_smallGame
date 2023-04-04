export default class GameView extends Laya.Script {
    //通过IDE组件属性的方式，将按钮节点绑定到组件的类成员属性上，方便直接使用对应的节点对象
    /** @prop {name:btnStart, type:Node} */
    private btnStart: Laya.Button;

    constructor() {
        super();
    }

    onEnable(): void {

    }

    onDisable(): void {

    }
}