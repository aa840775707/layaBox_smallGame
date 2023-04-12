import { ui } from "./ui/layaMaxUI";

export default class LoadingRT extends ui.LoadingUI {
    onAwake(): void {
        let resArr: Array<string> = [
            "bg/background.jpg",
            "bg/bg14.png",
            "bg/img_bg4.png",
            "bg/bg.png",
            "demo/fcs.jpg",
            "demo/whs.jpg",
            "res/atlas/bag.atlas",
            "res/atlas/bg.atlas",
            "res/atlas/cd.atlas",
            "res/atlas/comp.atlas",
            "role/atlasAni/139x.atlas",
            "role/spineAni/dragon.sk",
            "role/spineAni/goblins.sk",
            "res/atlas/role/frameAni.atlas",
            "res/atlas/role.atlas",
            "res/atlas/test.atlas",
            "files/layaAir.mp4",
            "res/atlas/mainUi.atlas",

            //单独加载大图
            "bigPicture/bg_daohang_paodao.png",
            "bigPicture/bg_daohang_xiaoyouxi.jpg",
        ];

        //加载2D
        Laya.loader.load(resArr, Laya.Handler.create(this, this.load3D));
        // 侦听加载失败
        Laya.loader.on(Laya.Event.ERROR, this, this.onError);
    }

    /** 加载3D */
    load3D(): void {
        let resArr3d: Array<string> = [
            "d3/dude/dude.lh",
            "d3/LayaMonkey2/LayaMonKey.lh",
            "d3/BoneLinkScene/PangZi.lh",
            "d3/trail/Cube.lh"
        ];

        Laya.loader.create(resArr3d, Laya.Handler.create(this, this.loadConfig));
    }

    /**加载配置表文件 */
    loadConfig():void{
        let resArrJson: Array<string> = [
            "json/Bullet.json",
            "json/Event.json",
            "json/Map.json",
            "json/Monster.json"
        ];
        Laya.loader.create(resArrJson, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading));
    }

    /**
   * 当报错时打印错误
   * @param err 报错信息
   */
    onError(err: string): void {
        console.log("加载失败: " + err);
    }

    /**
     * 加载时侦听
     */
    onLoading(progress: number): void {
        //接近完成加载时，让显示进度比实际进度慢一点，这是为打开场景时的自动加载预留，尤其是要打开的场景资源多，并没有完全放到预加载中，还需要再自动加载一部分时。
        if (progress > 0.92) this.progress.value = 0.95;
        else this.progress.value = progress;
    }

    /**
     * 加载完成后，处理逻辑
     */
    onLoaded(): void {
        this.progress.value = 0.98;
        //预加载的东西太少，为了本地看效果延迟一秒，真实项目不需要延迟
        Laya.timer.once(1000, this, () => {
            //跳转到入口场景
            Laya.Scene.open("Index.scene");
        });
    }



}