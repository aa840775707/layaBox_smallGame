(function () {
    'use strict';

    class Const {
    }
    Const.num = 1;
    Const.pps = "";
    Const.EVEN_GAMEOVER = "EVEN_GAMEOVER";

    class BulletPrefab extends Laya.Script {
        constructor() {
            super();
            this.bSpeed = 20;
            this.bHarm = 1;
        }
        onEnable() {
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: -this.bSpeed });
        }
        onTriggerEnter(other, self, contact) {
            if (other.label == "role")
                return;
            this.owner.removeSelf();
        }
        onUpdate() {
            if (this.owner.y < -10) {
                this.owner.removeSelf();
            }
        }
        onDisable() {
            Laya.Pool.recover("bullet", this.owner);
        }
    }

    class MonsterPrefab extends Laya.Script {
        constructor() {
            super();
            this.mid = 1;
            this.mSpeed = 1;
            this.mBlood = 1;
        }
        onEnable() {
            Laya.stage.on(Const.EVEN_GAMEOVER, this, this.gameOver);
            let rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: 2 });
        }
        setMonsterID(i = 0) {
            this.mid = i;
        }
        setMonsterBlood(d = 0) {
            this.mBlood = d;
            this.labNum.text = this.mBlood.toString();
        }
        steMonsterSpeed(s = 1) {
            this.mSpeed = s;
            this.owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: this.mSpeed });
        }
        monsterDie() {
            this.owner.removeSelf();
        }
        gameOver() {
            this.owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: 0 });
        }
        ;
        onTriggerEnter(other, self, contact) {
            if (other.label == "buttle") {
                let otherCom = other.owner.getComponent(BulletPrefab);
                let bHarm = otherCom.bHarm;
                this.mBlood -= bHarm;
                this.labNum.text = this.mBlood.toString();
                if (this.mBlood <= 0)
                    this.monsterDie();
            }
        }
        onUpdate() {
            if (this.mid == 9) {
                let node = this.owner;
                if (node.y >= 4800) {
                    Laya.stage.event(Const.EVEN_GAMEOVER);
                }
            }
        }
        onDisable() {
            Laya.Pool.recover("monster", this.owner);
        }
    }

    class RolePrefab extends Laya.Script {
        constructor() {
            super();
            this.rSpeed = 10;
            this.moveDir = 0;
        }
        onEnable() {
            this._rig = this.owner.getComponent(Laya.RigidBody);
        }
        onTriggerEnter(other, self, contact) {
            if (other.label == "monster") {
                let otherCom = other.owner.getComponent(MonsterPrefab);
                this.roleDie();
            }
        }
        roleDie() {
            Laya.stage.event(Const.EVEN_GAMEOVER);
        }
        steSpeedDir(dir = 0) {
            this.moveDir = dir;
            if (dir == 1)
                this._rig.setVelocity({ x: -this.rSpeed, y: 0 });
            else if (dir == 2)
                this._rig.setVelocity({ x: this.rSpeed, y: 0 });
            else if (dir == 0)
                this._rig.setVelocity({ x: 0, y: 0 });
        }
        onUpdate() {
            let stageW = Laya.stage.width;
            let stageH = Laya.stage.height;
            let thatNode = this.owner;
            if (this.moveDir == 1 && thatNode.x <= 0)
                return this._rig.setVelocity({ x: 0, y: 0 });
            if (this.moveDir == 2 && thatNode.x >= stageW - thatNode.width)
                return this._rig.setVelocity({ x: 0, y: 0 });
        }
        onDisable() {
        }
    }

    class GameView extends Laya.Script {
        constructor() {
            super();
        }
        ;
        onEnable() {
            Laya.MouseManager.multiTouchEnabled = false;
            Laya.stage.on(Const.EVEN_GAMEOVER, this, this.gameOver);
            this.leftBtn.on(Laya.Event.MOUSE_DOWN, this, this.touchLeftStart);
            this.leftBtn.on(Laya.Event.MOUSE_UP, this, this.touchEnd);
            this.rightBtn.on(Laya.Event.MOUSE_DOWN, this, this.touchRightStart);
            this.rightBtn.on(Laya.Event.MOUSE_UP, this, this.touchEnd);
            this.posArr = [
                { mid: 1, type: 1, pos: new Laya.Point(96, 3993), data: 10 },
                { mid: 2, type: 1, pos: new Laya.Point(520, 3524), data: 20 },
                { mid: 3, type: 1, pos: new Laya.Point(68, 3028), data: 30 },
                { mid: 4, type: 1, pos: new Laya.Point(553, 2531), data: 40 },
                { mid: 5, type: 1, pos: new Laya.Point(68, 1980), data: 50 },
                { mid: 6, type: 1, pos: new Laya.Point(533, 1429), data: 60 },
                { mid: 7, type: 1, pos: new Laya.Point(83, 1005), data: 70 },
                { mid: 8, type: 1, pos: new Laya.Point(520, 496), data: 80 },
                { mid: 9, type: 1, pos: new Laya.Point(280, 16), data: 90 },
            ];
            this.msterSpr.removeChildren();
            this.posArr.forEach(element => {
                if (element.type == 1)
                    this.buildMonster(element);
                else
                    this.buildProp(element.mid, element.pos);
            });
            let stageH = Laya.stage.height;
            this.sprBg1.y = stageH - this.sprBg1.height;
            this.sprBg2.y = this.sprBg1.y - this.sprBg2.height;
            Laya.timer.frameLoop(1, this, this.moveBg);
            Laya.timer.frameLoop(10, this, this.buildBullet);
            this.buildRole();
        }
        ;
        buildRole() {
            let stageW = Laya.stage.width;
            let stageH = Laya.stage.height;
            this.roleNode = this.rolePrefab.create();
            this.roleSpr.addChild(this.roleNode);
            this.roleNode.pos((stageW / 2) - (this.roleNode.width / 2), stageH - this.roleNode.height - 200);
        }
        ;
        buildMonster(data) {
            let monster = Laya.Pool.getItemByCreateFun("monster", this.monsterPrefab.create, this.monsterPrefab);
            let monsterComt = monster.getComponent(MonsterPrefab);
            monster.pos(data.pos.x, data.pos.y);
            monsterComt.setMonsterID(data.mid);
            monsterComt.setMonsterBlood(data.data);
            this.msterSpr.addChild(monster);
        }
        ;
        buildProp(mid, pos) {
            let prop = Laya.Pool.getItemByCreateFun("prop", this.propPrefab.create, this.propPrefab);
            let propComt = prop.getComponent(MonsterPrefab);
            prop.pos(pos.x, pos.y);
            this.msterSpr.addChild(prop);
        }
        ;
        buildBullet() {
            let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bulletPrefab.create, this.bulletPrefab);
            let crex = (this.roleNode.x) + (this.roleNode.width / 2) - (flyer.width / 2);
            let crey = this.roleNode.y;
            flyer.pos(crex, crey);
            this.roleSpr.addChild(flyer);
        }
        ;
        touchLeftStart() {
            let com = this.roleNode.getComponent(RolePrefab);
            com.steSpeedDir(1);
        }
        ;
        touchRightStart() {
            let com = this.roleNode.getComponent(RolePrefab);
            com.steSpeedDir(2);
        }
        ;
        touchEnd() {
            let com = this.roleNode.getComponent(RolePrefab);
            com.steSpeedDir(0);
        }
        ;
        moveBg() {
            let stageW = Laya.stage.width;
            let stageH = Laya.stage.height;
            if (this.sprBg1.y >= stageH)
                this.sprBg1.y = this.sprBg2.y - this.sprBg1.height;
            if (this.sprBg2.y >= stageH)
                this.sprBg2.y = this.sprBg1.y - this.sprBg2.height;
            this.sprBg1.y += 10;
            this.sprBg2.y += 10;
        }
        ;
        gameOver() {
            Laya.timer.clearAll(this);
            Laya.Scene.open("views/LoseView.scene");
        }
        ;
        onUpdate() {
        }
        onDisable() {
        }
    }

    class Common {
        static getConfigByName(cfgName) {
            let jsonData = Laya.loader.getRes(`json/${cfgName}.json`);
            return jsonData;
        }
    }

    class Index extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.btnList.renderHandler = new Laya.Handler(this, this.listHandle);
            let arr = [];
            let maps = Common.getConfigByName("Map");
            for (const key in maps) {
                if (Object.prototype.hasOwnProperty.call(maps, key)) {
                    const element = maps[key];
                    arr.push(element);
                }
            }
            this.btnList.array = arr;
        }
        listHandle(cell, index) {
            let itemData = cell.dataSource;
            let btnStart = cell.getChildByName("btnStart");
            btnStart.label = `第${index + 1}关`;
            btnStart.offAll(Laya.Event.CLICK);
            btnStart.on(Laya.Event.CLICK, this, () => {
                Laya.Scene.open("GameView.scene");
            });
        }
        onDisable() {
        }
    }

    var View = Laya.View;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class GameViewUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("GameView");
            }
        }
        ui.GameViewUI = GameViewUI;
        REG("ui.GameViewUI", GameViewUI);
        class LoadingUI extends View {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("Loading");
            }
        }
        ui.LoadingUI = LoadingUI;
        REG("ui.LoadingUI", LoadingUI);
    })(ui || (ui = {}));

    class LoadingRT extends ui.LoadingUI {
        onAwake() {
            let resArr = [
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
                "bigPicture/bg_daohang_paodao.png",
                "bigPicture/bg_daohang_xiaoyouxi.jpg",
            ];
            Laya.loader.load(resArr, Laya.Handler.create(this, this.load3D));
            Laya.loader.on(Laya.Event.ERROR, this, this.onError);
        }
        load3D() {
            let resArr3d = [
                "d3/dude/dude.lh",
                "d3/LayaMonkey2/LayaMonKey.lh",
                "d3/BoneLinkScene/PangZi.lh",
                "d3/trail/Cube.lh"
            ];
            Laya.loader.create(resArr3d, Laya.Handler.create(this, this.loadConfig));
        }
        loadConfig() {
            let resArrJson = [
                "json/Bullet.json",
                "json/Event.json",
                "json/Map.json",
                "json/Monster.json"
            ];
            Laya.loader.create(resArrJson, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading));
        }
        onError(err) {
            console.log("加载失败: " + err);
        }
        onLoading(progress) {
            if (progress > 0.92)
                this.progress.value = 0.95;
            else
                this.progress.value = progress;
        }
        onLoaded() {
            this.progress.value = 0.98;
            Laya.timer.once(1000, this, () => {
                Laya.Scene.open("Index.scene");
            });
        }
    }

    class LoseView extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            this.btnAgain.on(Laya.Event.CLICK, this, () => {
                Laya.Scene.open("GameView.scene");
            });
        }
        onDisable() {
        }
    }

    class VictoryView extends Laya.Script {
        constructor() {
            super();
        }
        onEnable() {
            this.btnAgain.on(Laya.Event.CLICK, this, () => {
                Laya.Scene.open("GameView.scene");
            });
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("GameView.ts", GameView);
            reg("Index.ts", Index);
            reg("LoadingRT.ts", LoadingRT);
            reg("views/LoseView.ts", LoseView);
            reg("views/VictoryView.ts", VictoryView);
            reg("prefab/BulletPrefab.ts", BulletPrefab);
            reg("prefab/MonsterPrefab.ts", MonsterPrefab);
            reg("prefab/RolePrefab.ts", RolePrefab);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Loading.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = true;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            Config.useRetinalCanvas = true;
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.stage.bgColor = "#efeed7";
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
//# sourceMappingURL=bundle.js.map
