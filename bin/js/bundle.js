(function () {
    'use strict';

    class Index extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this.btnStart.on(Laya.Event.CLICK, this, () => {
                Laya.Scene.open("Game.scene");
            });
        }
        onDisable() {
        }
    }

    var View = Laya.View;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var ani;
        (function (ani) {
            class saceToNormalUI extends Laya.EffectAnimation {
                constructor() { super(); this.effectData = saceToNormalUI.uiView; }
            }
            saceToNormalUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "texture": "comp/x.png" }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "scaleY": [{ "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 5 }], "scaleX": [{ "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 5 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["comp/x.png"], "loadList3D": [] };
            ani.saceToNormalUI = saceToNormalUI;
            REG("ui.ani.saceToNormalUI", saceToNormalUI);
            class scaleUI extends Laya.EffectAnimation {
                constructor() { super(); this.effectData = scaleUI.uiView; }
            }
            scaleUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "skin": "comp/button.png", "label": "label", "labelSize": 28, "labelFont": "SimHei", "labelColors": "#fff,#fff,#e7ce4e", "sizeGrid": "14,16,15,19", "width": 160, "labelPadding": "0,0,1,0" }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 12 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 24 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 12 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 24 }] } }], "name": "ani1", "id": 1, "frameRate": 60, "action": 0 }], "loadList": ["comp/button.png"], "loadList3D": [] };
            ani.scaleUI = scaleUI;
            REG("ui.ani.scaleUI", scaleUI);
            class scaleToBigUI extends Laya.EffectAnimation {
                constructor() { super(); this.effectData = scaleToBigUI.uiView; }
            }
            scaleToBigUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "comp/img_blank.png" }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 6 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1.2, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 6 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["comp/img_blank.png"], "loadList3D": [] };
            ani.scaleToBigUI = scaleToBigUI;
            REG("ui.ani.scaleToBigUI", scaleToBigUI);
            class scaleToSmallUI extends Laya.EffectAnimation {
                constructor() { super(); this.effectData = scaleToSmallUI.uiView; }
            }
            scaleToSmallUI.uiView = { "type": "View", "props": {}, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "comp/img_hd.png" }, "compId": 4 }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 6 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 6 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["comp/img_hd.png"], "loadList3D": [] };
            ani.scaleToSmallUI = scaleToSmallUI;
            REG("ui.ani.scaleToSmallUI", scaleToSmallUI);
        })(ani = ui.ani || (ui.ani = {}));
    })(ui || (ui = {}));
    (function (ui) {
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
    (function (ui) {
        var physicsDemo;
        (function (physicsDemo) {
            class PhysicsGameMainUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("physicsDemo/PhysicsGameMain");
                }
            }
            physicsDemo.PhysicsGameMainUI = PhysicsGameMainUI;
            REG("ui.physicsDemo.PhysicsGameMainUI", PhysicsGameMainUI);
        })(physicsDemo = ui.physicsDemo || (ui.physicsDemo = {}));
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
                "bigPicture/bg_daohang_paodao.jpg",
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
            Laya.loader.create(resArr3d, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading));
        }
        onError(err) {
            console.log("加载失败: " + err);
        }
        onLoading(progress) {
            if (progress > 0.92)
                this.progress.value = 0.95;
            else
                this.progress.value = progress;
            console.log("加载进度: " + progress, this.progress.value);
        }
        onLoaded() {
            this.progress.value = 0.98;
            Laya.timer.once(1000, this, () => {
                Laya.Scene.open("Index.scene");
            });
        }
    }

    class PhysicsGameMain extends Laya.Script {
        constructor() {
            super();
            this.createBoxInterval = 1000;
            this._time = 0;
            this._started = false;
            this.updateStop = false;
        }
        onEnable() {
            this._time = Date.now();
            this._gameBox = this.owner.getChildByName("gameBox");
            Laya.stage.on(Laya.Event.BLUR, this, () => { this.updateStop = true; });
            Laya.stage.on(Laya.Event.FOCUS, this, () => { this.updateStop = false; });
        }
        onStart() {
            let _ground = this.owner.getChildByName("ground").getComponent(Laya.BoxCollider);
            _ground.width = Laya.stage.width;
        }
        onUpdate() {
            if (this.updateStop)
                return;
            let now = Date.now();
            if (now - this._time > this.createBoxInterval && this._started) {
                this._time = now;
                this.createBox();
            }
        }
        createBox() {
            let box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
            box.pos(Math.random() * (Laya.stage.width - 100), -100);
            this._gameBox.addChild(box);
        }
        onStageClick(e) {
            e.stopPropagation();
            let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
            flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            this._gameBox.addChild(flyer);
        }
        startGame() {
            if (!this._started) {
                this._started = true;
                this.enabled = true;
            }
        }
        stopGame() {
            this._started = false;
            this.enabled = false;
            this.createBoxInterval = 1000;
            this._gameBox.removeChildren();
        }
    }

    class PhysicsGameMainRT extends ui.physicsDemo.PhysicsGameMainUI {
        constructor() {
            super();
            PhysicsGameMainRT.instance = this;
            Laya.MouseManager.multiTouchEnabled = false;
        }
        onEnable() {
            this._control = this.getComponent(PhysicsGameMain);
            this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
        }
        onTipClick(e) {
            this.tipLbll.visible = false;
            this._score = 0;
            this.scoreLbl.text = "";
            this._control.startGame();
        }
        addScore(value = 1) {
            this._score += value;
            this.scoreLbl.changeText("分数：" + this._score);
            if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
                this._control.createBoxInterval -= 20;
        }
        stopGame() {
            this.tipLbll.visible = true;
            this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
            this._control.stopGame();
        }
    }

    class CloseBtn extends Laya.Script {
        constructor() { super(); }
        onEnable() {
        }
        onClick(e) {
            Laya.Scene.open("Index.scene");
        }
        onDisable() {
        }
    }

    class Bullet extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: -10 });
        }
        onTriggerEnter(other, self, contact) {
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

    class DropBox extends Laya.Script {
        constructor() {
            super();
            this.level = 1;
        }
        onEnable() {
            this._rig = this.owner.getComponent(Laya.RigidBody);
            this.level = Math.round(Math.random() * 5) + 1;
            this._text = this.owner.getChildByName("levelTxt");
            this._text.text = this.level + "";
        }
        onUpdate() {
            this.owner.rotation++;
        }
        onTriggerEnter(other, self, contact) {
            var owner = this.owner;
            if (other.label === "buttle") {
                if (this.level > 1) {
                    this.level--;
                    this._text.changeText(this.level + "");
                    owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                    Laya.SoundManager.playSound("sound/hit.wav");
                }
                else {
                    if (owner.parent) {
                        let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                        effect.pos(owner.x, owner.y);
                        owner.parent.addChild(effect);
                        effect.play(0, true);
                        owner.removeSelf();
                        Laya.SoundManager.playSound("sound/destroy.wav");
                    }
                }
                PhysicsGameMainRT.instance.addScore(1);
            }
            else if (other.label === "ground") {
                owner.removeSelf();
                PhysicsGameMainRT.instance.stopGame();
            }
        }
        createEffect() {
            let ani = new Laya.Animation();
            ani.loadAnimation("ani/TestAni.ani");
            ani.on(Laya.Event.COMPLETE, null, recover);
            function recover() {
                ani.removeSelf();
                Laya.Pool.recover("effect", ani);
            }
            return ani;
        }
        onDisable() {
            Laya.Pool.recover("dropBox", this.owner);
        }
    }

    class LoopImg extends Laya.Script {
        constructor() { super(); }
        onEnable() {
        }
        onUpdate() {
        }
        onDisable() {
        }
    }

    var Keyboard = Laya.Keyboard;
    var KeyBoardManager = Laya.KeyBoardManager;
    class Role extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            this._owner = this.owner;
            this.roleStand = this._owner.getChildByName("roleStand");
            this.roleRun = this._owner.getChildByName("roleRun");
            this.bg = this.owner.parent;
        }
        playRoleAni(name, type = "stand") {
            if (type == "run") {
                this.roleStand.visible = false;
                this.roleStand.isPlaying && this.roleStand.stop();
                this.roleRun.visible = true;
                this.roleRun.play(0, true, name);
            }
            else {
                this.roleRun.visible = false;
                this.roleRun.isPlaying && this.roleRun.stop();
                this.roleStand.play(0, true, name);
                this.roleStand.visible = true;
            }
        }
        onUpdate() {
            this.lastRoleDirection = this.roleDirection;
            if (KeyBoardManager.hasKeyDown(Keyboard.UP) || KeyBoardManager.hasKeyDown(Keyboard.W)) {
                this.roleDirection = "Up";
                this._owner.y -= 2;
                this._owner.y < 80 && (this._owner.y = 80);
            }
            else if (KeyBoardManager.hasKeyDown(Keyboard.DOWN) || KeyBoardManager.hasKeyDown(Keyboard.S)) {
                this.roleDirection = "Down";
                this._owner.y += 2;
                this._owner.y > (this.bg.height - 130) && (this._owner.y = this.bg.height - 130);
            }
            else if (KeyBoardManager.hasKeyDown(Keyboard.LEFT) || KeyBoardManager.hasKeyDown(Keyboard.A)) {
                this.roleDirection = "Left";
                this._owner.x -= 2;
                this._owner.x < 30 && (this._owner.x = 30);
            }
            else if (KeyBoardManager.hasKeyDown(Keyboard.RIGHT) || KeyBoardManager.hasKeyDown(Keyboard.D)) {
                this.roleDirection = "Right";
                this._owner.x += 2;
                this._owner.x > (this.bg.width - 130) && (this._owner.x = (this.bg.width - 130));
            }
            this.lastRoleDirection !== this.roleDirection && this.playRoleAni(this.roleDirection, "run");
        }
        onKeyUp(e) {
            this.playRoleAni(this.roleDirection);
            this.roleDirection = "";
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Index.ts", Index);
            reg("LoadingRT.ts", LoadingRT);
            reg("scence/physicsDemo/PhysicsGameMainRT.ts", PhysicsGameMainRT);
            reg("prefab/CloseBtn.ts", CloseBtn);
            reg("scence/physicsDemo/PhysicsGameMain.ts", PhysicsGameMain);
            reg("prefab/Bullet.ts", Bullet);
            reg("prefab/DropBox.ts", DropBox);
            reg("prefab/LoopImg.ts", LoopImg);
            reg("prefab/Role.ts", Role);
        }
    }
    GameConfig.width = 1334;
    GameConfig.height = 750;
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
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
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
