import {Actor, Engine, Random, Timer, Vector, Label, Color, Font, FontUnit, Scene, Class, } from "excalibur";
import {Fish} from "./fish.js";
import {Sail} from "./sail.js";
import {Boei} from "./boei.js"
import {Background} from "./mapLoader.js";
import {MolenBoven} from "./molenboven.js";
import {MolenOnder} from "./molenonder.js";
import {Toren} from "./toren.js";
import {Chinees} from "./chinees.js";

export class gameScene extends Scene {
    constructor() {
        super();
    }
    i
    game
    engine
    score
    lives
    mylabel
    mylabel2
    mylabel3
    mylabel4
    counter
    gametimer

    onInitialize(Engine) {
        this.game = Engine
            this.timer2 = new Timer({
            fcn: () => this.spawn2(Engine),
            interval: 1000,
            repeats: true

        })
        Engine.currentScene.add(this.timer2)

            this.timer = new Timer({
                fcn: () => this.spawn(Engine),
                interval: 30,
                repeats: true
            })
            Engine.currentScene.add(this.timer)
            this.timer.start()
    }


    onActivate(ctx) {
        const backgroundLoop = new Background();
        this.add(backgroundLoop);
        const sail = new Sail();
        const fish = new Fish(sail);
        this.add(fish);
        fish.addChild(sail);
        const molenBoven = new MolenBoven();
        const molenOnder = new MolenOnder(molenBoven);
        this.add(molenOnder)
        molenOnder.addChild(molenBoven)
        this.score = 0
        this.gametimer = 90
        this.counter = 0
        this.i = 0
        this.mylabel = new Label({
            text: `Score: ${this.score}`,
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            }),
        })
        this.add(this.mylabel)


        this.mylabel2 = new Label({
            text: `Wind`,
            font: new Font({
                family: 'impact',
                size: 35,
                unit: FontUnit.Px,
                color:Color.Black
            }),
        })
        this.add(this.mylabel2)

        this.mylabel3 = new Label({
            text: `↑`,
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            }),
        })
        this.add(this.mylabel3)

        this.mylabel4 = new Label({
            text: `${this.gametimer}s`,
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color:Color.Black
            }),
        })
        this.add(this.mylabel4)

        this.camera.strategy.elasticToActor(
            fish, 0.9, 0.9
        )

        const toren = new Toren();
        this.add(toren);

        const chinees = new Chinees();
        this.add(chinees);
    }

    updateScore(){
        this.score++
        this.mylabel.text = `Score: ${this.score}`
        if (this.score == 15){
            this.engine.goToScene("gameover", { score: this.score, gametimer: this.gametimer })
        }
        this.timer2.start()
    }
    delScore(){
        this.score--
        this.mylabel.text = `Score: ${this.score}`

    }



    onPostUpdate(_engine, _delta) {
        super.onPostUpdate(_engine, _delta);
        this.mylabel.pos = this.game.screenToWorldCoordinates(new Vector(1230, 50))
        this.mylabel2.pos = this.game.screenToWorldCoordinates(new Vector(15, 100))
        this.mylabel3.pos = this.game.screenToWorldCoordinates(new Vector(40, 50))
        this.mylabel4.pos = this.game.screenToWorldCoordinates(new Vector(1270, 100))


    }

    spawn(engine) {

        const boei = new Boei(
        )
        this.add(boei)
        this.counter++
        this.on('collisionstart', (event) => this.hitSomething(event))
        if (this.counter == 17){
            this.timer.stop()
        }
    }
    hitSomething(event){
        if (event.other instanceof Fish) {
            this.pos = new Vector(getRandomNum(149, 2398), getRandomNum(-942, 1045))
            this.delScore()
        }
    }
    spawn2(engine) {

        this.gametimer--
        if (this.gametimer >9) {
            this.mylabel4.text = `${this.gametimer}s`
        }
        else {this.mylabel4.text = `${this.gametimer}s`}

        if (this.gametimer == 0){
            this.timer2.stop()
            this.engine.goToScene("gameover", { score: this.score, gametimer: this.gametimer })
        }
    }

}





